/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import nodemailer from 'nodemailer';


let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'email-smtp.ap-south-1.amazonaws.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SES_USER!,
        pass: process.env.SES_PASS!,
      },
    });
  }
  return transporter;
}

type SendEmailProps = {
  to: string | string[];
  subject: string ;
  html: any;      
  bcc?: string[];
  replyTo?: string;
  attachments?: any[];
};

export async function sendEmail({
  to,
  subject,
  html,
  bcc,
  replyTo,
  attachments,
}: SendEmailProps) {
  try {
    const transporter = getTransporter();

    const result = await transporter.sendMail({
      from: `"Yunanved" <info@avtechnosys.com>`,
      to,
      subject,
      html,
      bcc,
      replyTo,
      attachments,
    });

    return { success: true, result };
  } catch (error) {
    console.error('Email Error:', error);
    return { success: false, error };
  }
}