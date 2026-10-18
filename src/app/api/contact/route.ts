import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";

import { connectDB } from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";

const MAX_BODY_SIZE = 16 * 1024;

const services = [
  "Web Development",
  "Custom Software",
  "AI Solutions",
  "Business Automation",
  "Cloud & Server Solutions",
  "System Integration",
  "Not Sure Yet",
] as const;

const budgets = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not Decided",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(services),
  budget: z.enum(budgets).optional().default("Not Decided"),
  message: z.string().trim().min(20).max(5000),
  website: z.string().max(500).optional().default(""),
});

type ContactData = z.infer<typeof contactSchema>;

let rateLimiter: Ratelimit | null = null;

function getRateLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Upstash Redis environment variables are missing.");
    }

    return null;
  }

  if (!rateLimiter) {
    rateLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "quarry:contact",
    });
  }

  return rateLimiter;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");

  if (!origin) return true;

  const allowedOrigins = new Set<string>();
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    try {
      allowedOrigins.add(new URL(configuredUrl).origin);
    } catch {
      return false;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildInquiryEmailHtml(inquiry: ContactData): string {
  const name = escapeHtml(inquiry.name);
  const email = escapeHtml(inquiry.email);
  const company = escapeHtml(inquiry.company?.trim() || "Not provided");
  const service = escapeHtml(inquiry.service);
  const budget = escapeHtml(inquiry.budget || "Not Decided");
  const message = escapeHtml(inquiry.message);

  const detailRow = (label: string, value: string) => `
    <tr>
      <td width="36%" valign="top"
        style="padding:15px 0;border-bottom:1px solid #e8edf3;
        color:#738096;font-size:12px;line-height:1.6;">
        ${label}
      </td>
      <td valign="top"
        style="padding:15px 0;border-bottom:1px solid #e8edf3;
        color:#202c40;font-size:14px;font-weight:600;
        line-height:1.7;overflow-wrap:anywhere;">
        ${value}
      </td>
    </tr>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New Project Inquiry — Quarry Software</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f3f6;
  font-family:Arial,Helvetica,sans-serif;color:#202c40;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;
    color:transparent;font-size:1px;line-height:1px;">
    New project inquiry from ${name} for ${service}.
  </div>

  <table role="presentation" width="100%" cellspacing="0"
    cellpadding="0" border="0" style="width:100%;background:#f1f3f6;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellspacing="0"
          cellpadding="0" border="0"
          style="width:100%;max-width:600px;background:#ffffff;
          border:1px solid #e3e8ef;">

          <tr>
            <td style="padding:28px 30px 30px;background:#101d35;">

              <table role="presentation" width="100%" cellspacing="0"
                cellpadding="0" border="0">
                <tr>
                  <td style="font-size:25px;font-weight:800;
                    letter-spacing:3px;color:#ffffff;">
                    QUARRY
                  </td>
                  <td align="right" style="font-size:10px;
                    font-weight:700;letter-spacing:1.4px;color:#c5d0e0;">
                    NEW INQUIRY
                  </td>
                </tr>
              </table>

              <div style="margin-top:34px;font-size:10px;
                font-weight:700;letter-spacing:2px;color:#aebed5;">
                YOUR NEXT PROJECT
              </div>

              <h1 style="margin:12px 0 0;font-size:30px;
                line-height:1.25;font-weight:700;letter-spacing:-0.7px;
                color:#ffffff;">
                A new project<br>starts here.
              </h1>

              <p style="margin:14px 0 0;font-size:14px;
                line-height:1.8;color:#cbd5e3;">
                A new inquiry has arrived through the Quarry website.
              </p>

              <div style="margin-top:24px;width:42px;height:3px;
                background:#ffffff;font-size:0;line-height:0;">
                &nbsp;
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:30px;">

              <div style="font-size:10px;font-weight:700;
                letter-spacing:1.8px;color:#738096;">
                CLIENT INFORMATION
              </div>

              <h2 style="margin:12px 0 6px;font-size:24px;
                line-height:1.4;font-weight:700;letter-spacing:-0.4px;
                color:#15233a;overflow-wrap:anywhere;">
                ${name}
              </h2>

              <p style="margin:0 0 28px;font-size:14px;line-height:1.7;
                overflow-wrap:anywhere;">
                <a href="mailto:${email}"
                  style="color:#52647d;text-decoration:underline;">
                  ${email}
                </a>
              </p>

              <div style="font-size:10px;font-weight:700;
                letter-spacing:1.8px;color:#738096;">
                PROJECT OVERVIEW
              </div>

              <table role="presentation" width="100%" cellspacing="0"
                cellpadding="0" border="0"
                style="margin-top:10px;border-top:1px solid #e8edf3;">
                ${detailRow("Company", company)}
                ${detailRow("Service", service)}
                ${detailRow("Stated budget", budget)}
              </table>

              <div style="margin-top:30px;font-size:10px;font-weight:700;
                letter-spacing:1.8px;color:#738096;">
                PROJECT BRIEF
              </div>

              <div style="margin-top:13px;padding:20px 18px;
                background:#f4f6f9;border-left:3px solid #263b5a;
                color:#2b374a;font-size:14px;line-height:1.9;
                white-space:pre-wrap;overflow-wrap:anywhere;">${message}</div>

              <table role="presentation" cellspacing="0" cellpadding="0"
                border="0" style="margin-top:28px;">
                <tr>
                  <td bgcolor="#15233a" style="background:#15233a;">
                    <a href="mailto:${email}"
                      style="display:inline-block;padding:15px 23px;
                      color:#ffffff;text-decoration:none;font-size:13px;
                      font-weight:700;line-height:1.2;">
                      Reply to client
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0;font-size:12px;line-height:1.8;
                color:#738096;">
                This is an automated notification from your website.
                You can reply directly to the client using the button above.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 30px;background:#f8f9fb;
              border-top:1px solid #e8edf3;">

              <div style="font-size:14px;font-weight:800;
                letter-spacing:2px;color:#15233a;">
                QUARRY SOFTWARE
              </div>

              <p style="margin:10px 0 0;font-size:11px;
                line-height:1.9;color:#66748a;">
                Software Engineering · Web · AI · Automation
              </p>

              <p style="margin:14px 0 0;font-size:10px;
                line-height:1.7;color:#98a1af;">
                Thoughtfully engineered digital solutions.
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:18px 0 0;font-size:10px;line-height:1.6;
          text-align:center;color:#929baa;">
          QUARRY SOFTWARE · PROJECT NOTIFICATION
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function sendInquiryEmail(inquiry: ContactData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[CONTACT] Missing Resend environment variables:", {
      hasApiKey: Boolean(apiKey),
      hasRecipient: Boolean(to),
      hasSender: Boolean(from),
    });

    return false;
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: inquiry.email,
      subject: `New Project Inquiry — ${inquiry.service}`,
      html: buildInquiryEmailHtml(inquiry),
      text: [
        "NEW PROJECT INQUIRY — QUARRY SOFTWARE",
        "",
        `Name: ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        `Company: ${inquiry.company || "Not provided"}`,
        `Service: ${inquiry.service}`,
        `Budget: ${inquiry.budget || "Not Decided"}`,
        "",
        "PROJECT BRIEF",
        inquiry.message,
      ].join("\n"),
    });

    if (error) {
      console.error("[CONTACT] Resend rejected the email:", error);
      return false;
    }

    console.log("[CONTACT] Resend accepted email:", data?.id);
    return Boolean(data?.id);
  } catch (error) {
    console.error("[CONTACT] Email request failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return jsonError("Request origin is not allowed.", 403);
    }

    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonError("Content-Type must be application/json.", 415);
    }

    const contentLength = Number(request.headers.get("content-length") || "0");

    if (contentLength > MAX_BODY_SIZE) {
      return jsonError("Request body is too large.", 413);
    }

    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_SIZE) {
      return jsonError("Request body is too large.", 413);
    }

    let body: unknown;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return jsonError("Request body must contain valid JSON.", 400);
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errors: Record<string, string[]> = {};

      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? "form");
        errors[field] ??= [];
        errors[field].push(issue.message);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Please check the form and correct the highlighted fields.",
          errors,
        },
        { status: 400 },
      );
    }

    const inquiry = parsed.data;

    // Treat a populated honeypot as a bot submission.
    // Return a generic success without saving or sending an email.
    if (inquiry.website.trim()) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you for contacting Quarry. Your inquiry has been received successfully.",
      });
    }

    let limiter: Ratelimit | null;

    try {
      limiter = getRateLimiter();
    } catch (error) {
      console.error("[CONTACT] Rate limiter configuration error:", error);
      return jsonError("The contact service is temporarily unavailable.", 503);
    }

    if (limiter) {
      try {
        const forwardedFor = request.headers.get("x-forwarded-for");
        const ip = forwardedFor?.split(",")[0].trim() || "unknown";
        const { success, reset } = await limiter.limit(ip);

        if (!success) {
          return NextResponse.json(
            {
              success: false,
              message: "Too many submissions. Please try again later.",
            },
            {
              status: 429,
              headers: {
                "Retry-After": String(
                  Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
                ),
              },
            },
          );
        }
      } catch (error) {
        console.error("[CONTACT] Rate limit request failed:", error);

        if (process.env.NODE_ENV === "production") {
          return jsonError(
            "The contact service is temporarily unavailable.",
            503,
          );
        }
      }
    }

    await connectDB();

    const savedInquiry = await ContactInquiry.create({
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company || undefined,
      service: inquiry.service,
      budget: inquiry.budget || "Not Decided",
      message: inquiry.message,
      emailSent: false,
    });

    console.log("[CONTACT] Inquiry saved. Sending email...");

    const emailSent = await sendInquiryEmail(inquiry);

    if (emailSent) {
      try {
        await ContactInquiry.findByIdAndUpdate(savedInquiry._id, {
          $set: { emailSent: true },
        });
      } catch (error) {
        console.error("[CONTACT] Failed to update email status:", error);
      }
    }

    return NextResponse.json({
      success: true,
      saved: true,
      emailSent,
      message: emailSent
        ? "Thank you for contacting Quarry. Your inquiry has been received successfully."
        : "Your inquiry was saved, but the email notification could not be sent. Please try again later or email quarrysoftware@gmail.com.",
    });
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);

    return jsonError(
      "We couldn't process your inquiry right now. Please try again later.",
      500,
    );
  }
}
