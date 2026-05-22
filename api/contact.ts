import { Resend } from 'resend';

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (payload: JsonValue) => void;
  end: () => void;
};

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  message: string;
};

function getHeader(headers: ApiRequest['headers'], name: string) {
  const key = Object.keys(headers ?? {}).find((h) => h.toLowerCase() === name.toLowerCase());
  const value = key ? headers?.[key] : undefined;
  return Array.isArray(value) ? value[0] : value;
}

function parseJsonBody(body: unknown): unknown {
  if (body == null) return null;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as unknown;
    } catch {
      return null;
    }
  }
  return body;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    return;
  }

  const contentType = getHeader(req.headers, 'content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    res.status(415).json({ ok: false, error: 'Unsupported Media Type' });
    return;
  }

  const parsed = parseJsonBody(req.body);
  if (!parsed || typeof parsed !== 'object') {
    res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    return;
  }

  const body = parsed as Partial<ContactPayload>;
  const name = (body.name ?? '').trim();
  const company = (body.company ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !company || !email || !message) {
    res.status(400).json({ ok: false, error: 'Missing required fields' });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({ ok: false, error: 'Invalid email' });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !to || !from) {
    res.status(500).json({ ok: false, error: 'Server email configuration missing' });
    return;
  }

  const resend = new Resend(resendApiKey);

  const subject = `Nuevo contacto: ${name} (${company})`;
  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject,
      text: `Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\n\nMensaje:\n${message}\n`,
      html: `<div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;">
  <h2 style="margin:0 0 12px;">Nuevo mensaje desde el formulario</h2>
  <p style="margin:0 0 6px;"><strong>Nombre:</strong> ${safeName}</p>
  <p style="margin:0 0 6px;"><strong>Empresa:</strong> ${safeCompany}</p>
  <p style="margin:0 0 12px;"><strong>Email:</strong> ${safeEmail}</p>
  <pre style="margin:0; white-space:pre-wrap; padding:12px; background:#0b1220; color:#e5e7eb; border-radius:10px;">${safeMessage}</pre>
</div>`,
      replyTo: email
    });

    res.status(200).json({ ok: true, id: (result as { id?: string }).id ?? null });
  } catch {
    res.status(502).json({ ok: false, error: 'Failed to send email' });
  }
}

