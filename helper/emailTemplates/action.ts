import fs from 'fs';
import path from 'path';

function injectTemplate(html: string, data: Record<string, string>) {
  return html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
}
export function getDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getWelcomeTemplate(name:string) {
  const filePath = path.join(process.cwd(), 'email-templates', 'welcome.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return html.replace('{{name}}', name);
}

export function getOrderTemplate(data: {
  orderId: string;
  customerName: string;
  amount: string;
  email: string;
  baseUrl: string;
  paymentMethod: string;
}) {
  const filePath = path.join(process.cwd(), 'email-templates', 'order.html');
  const html = fs.readFileSync(filePath, 'utf-8');

  return injectTemplate(html, {
    ...data,
    deliveryDate: getDeliveryDate(), 
  });
}