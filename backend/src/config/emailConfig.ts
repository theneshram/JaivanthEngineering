import nodemailer from 'nodemailer';

const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export const transporter = nodemailer.createTransport(emailConfig);

export const verifyConnection = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('✓ SMTP connection verified');
    return true;
  } catch (error) {
    console.error('✗ SMTP connection failed:', error);
    return false;
  }
};
