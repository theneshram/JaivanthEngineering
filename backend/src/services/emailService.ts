import { transporter } from '../config/emailConfig';
import { ContactFormData, EmailResponse } from '../types';
import { adminEmailTemplate, customerEmailTemplate } from '../templates/contactEmailTemplate';

export class EmailService {
  static async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const smtpFrom = process.env.SMTP_FROM || 'noreply@jaivantengineering.com';

      if (!adminEmail) {
        throw new Error('Admin email not configured');
      }

      // Send email to admin
      const adminMailOptions = {
        from: smtpFrom,
        to: adminEmail,
        subject: `New Contact Form Submission from ${data.name}`,
        html: adminEmailTemplate(data),
        replyTo: data.email,
      };

      const adminResult = await transporter.sendMail(adminMailOptions);

      // Send confirmation email to customer
      const customerMailOptions = {
        from: smtpFrom,
        to: data.email,
        subject: 'We received your message - Jaivant Engineering',
        html: customerEmailTemplate(data),
      };

      await transporter.sendMail(customerMailOptions);

      return {
        success: true,
        message: 'Email sent successfully. We will get back to you soon.',
        messageId: adminResult.messageId,
      };
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
