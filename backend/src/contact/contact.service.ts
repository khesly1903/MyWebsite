import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly transporter: nodemailer.Transporter;
  private readonly toEmail: string;

  constructor() {
    this.toEmail = process.env.CONTACT_TO_EMAIL || process.env.ZOHO_EMAIL || '';

    this.transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
      port: Number(process.env.ZOHO_SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });
  }

  async send(dto: CreateContactDto): Promise<{ success: boolean }> {
    // Honeypot: bots fill hidden fields, real users never see or fill "website".
    if (dto.website) {
      this.logger.warn(`Dropped contact submission from ${dto.email} — honeypot triggered`);
      return { success: true };
    }

    try {
      await this.transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.ZOHO_EMAIL}>`,
        to: this.toEmail,
        replyTo: dto.email,
        subject: `New contact form message from ${dto.name}`,
        text: `From: ${dto.name} <${dto.email}>\n\n${dto.message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(dto.name)} &lt;${escapeHtml(dto.email)}&gt;</p><p>${escapeHtml(dto.message).replace(/\n/g, '<br>')}</p>`,
      });
      return { success: true };
    } catch (error) {
      this.logger.error('Failed to send contact email', error);
      throw new InternalServerErrorException('Failed to send message. Please try again later.');
    }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
