import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const contactFunction: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Contact form submission received");

  // Set CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: corsHeaders,
    };
    return;
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      context.res = {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
        body: {
          success: false,
          message: "Name is required and must be at least 2 characters",
        },
      };
      return;
    }

    if (!email || !isValidEmail(email)) {
      context.res = {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
        body: {
          success: false,
          message: "Valid email is required",
        },
      };
      return;
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      context.res = {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
        body: {
          success: false,
          message: "Message is required and must be at least 10 characters",
        },
      };
      return;
    }

    const contactData: ContactFormData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      message: message.trim(),
    };

    // Send email
    const result = await sendContactEmail(contactData);

    context.res = {
      status: result.success ? 200 : 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
      body: result,
    };
  } catch (error) {
    context.log("Contact function error:", error);
    context.res = {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
      body: {
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
    };
  }
};

async function sendContactEmail(
  contactData: ContactFormData
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    // Validate environment variables
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      throw new Error("SMTP configuration is missing");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(contactData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contactData.email)}</p>
        ${contactData.phone ? `<p><strong>Phone:</strong> ${escapeHtml(contactData.phone)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(contactData.message).replace(/\n/g, "<br>")}</p>
      </div>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: htmlContent,
    });

    // Send confirmation email to customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>We received your message</h2>
        <p>Hi ${escapeHtml(contactData.name)},</p>
        <p>Thank you for reaching out to Jaivant Engineering. We have received your message and will get back to you shortly.</p>
        <p>Best regards,<br>Jaivant Engineering Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: contactData.email,
      subject: "We received your message - Jaivant Engineering",
      html: confirmationHtml,
    });

    return {
      success: true,
      message: "Your message has been sent successfully. We will be in touch soon!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email",
      error: (error as Error).message,
    };
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export default contactFunction;
