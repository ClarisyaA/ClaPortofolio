import nodemailer from "nodemailer";

const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sanitize = (value = "", maxLength = 1000) =>
  String(value)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value = "") =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string") return forwardedFor.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO, ALLOWED_ORIGIN } =
    process.env;

  const allowedOrigins = ALLOWED_ORIGIN
    ? ALLOWED_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
    : [];

  if (
    allowedOrigins.length > 0 &&
    req.headers.origin &&
    !allowedOrigins.includes(req.headers.origin)
  ) {
    return res.status(403).json({ message: "Origin not allowed." });
  }

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_TO) {
    return res.status(500).json({ message: "Contact service is not configured." });
  }

  const { name, email, message, company } = req.body || {};

  if (company) {
    return res.status(200).json({ message: "Message sent." });
  }

  const cleanName = sanitize(name, 80);
  const cleanEmail = sanitize(email, 120).toLowerCase();
  const cleanMessage = sanitize(message, 3000);
  const escapedName = escapeHtml(cleanName);
  const escapedEmail = escapeHtml(cleanEmail);
  const escapedMessage = escapeHtml(cleanMessage);

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ message: "Please complete all fields." });
  }

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (cleanMessage.length < 10) {
    return res.status(400).json({ message: "Please write a longer message." });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SMTP_TO,
      replyTo: cleanEmail,
      subject: `Portfolio Contact - ${cleanName}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `IP: ${getClientIp(req)}`,
        `Sent: ${new Date().toISOString()}`,
        "",
        cleanMessage,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2>New Portfolio Message</h2>
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> ${escapedEmail}</p>
          <p><strong>IP:</strong> ${getClientIp(req)}</p>
          <p><strong>Sent:</strong> ${new Date().toISOString()}</p>
          <hr />
          <p>${escapedMessage.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Message sent." });
  } catch (error) {
    console.error("SMTP send failed:", error);
    return res.status(502).json({ message: "Email service failed to send the message." });
  }
}
