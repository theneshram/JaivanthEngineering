import { ContactFormData } from '../types';

export const adminEmailTemplate = (data: ContactFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border-left: 3px solid #2563eb; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${escapeHtml(data.phone)}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
          </div>
          <div class="footer">
            <p>This is an automated message from your website contact form. Please reply to the sender's email address to respond.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const customerEmailTemplate = (data: ContactFormData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Contacting Jaivant Engineering</h2>
        </div>
        <div class="content">
          <p>Dear <strong>${escapeHtml(data.name)}</strong>,</p>
          <p>We have received your message and appreciate you reaching out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
          <p><strong>Message Reference:</strong> ${generateReference()}</p>
          <div class="footer">
            <p>Best regards,<br><strong>Jaivant Engineering Team</strong></p>
            <p style="font-size: 12px; color: #6b7280;">
              This is an automated response. Please do not reply to this email. If you have any urgent matters, please contact us directly.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function generateReference(): string {
  return `JE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}
