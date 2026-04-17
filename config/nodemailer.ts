import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export const sendOTP = async (toEmail: string, otp: number) => {
  try {
    const info = await transporter.sendMail({
      from: `"Trimly Security" <${process.env.USER_EMAIL}>`,
      to: toEmail,
      subject: "Your OTP Code - Secure Verification",
      text: `Your One-Time Password (OTP) is ${otp}. This code will expire in 5 minutes. Do not share this code with anyone for security reasons.`,
      html: `
      <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
          <tr>
            <td align="center">
              <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background:#111827;padding:20px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:1px;">
                      Trimly
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px;text-align:center;color:#333;">
                    <h2 style="margin:0 0 10px;font-size:20px;">Verify Your Identity</h2>
                    <p style="margin:0 0 20px;font-size:14px;color:#555;">
                      Use the One-Time Password (OTP) below to complete your verification process.
                    </p>

                    <!-- OTP Box -->
                    <div style="display:inline-block;padding:15px 25px;font-size:28px;font-weight:bold;letter-spacing:5px;background:#f3f4f6;border-radius:8px;color:#111827;">
                      ${otp}
                    </div>

                    <p style="margin:20px 0 10px;font-size:13px;color:#777;">
                      This code will expire in <strong>5 minutes</strong>.
                    </p>

                    <p style="margin:0;font-size:12px;color:#999;">
                      If you did not request this, please ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#aaa;">
                    © ${new Date().getFullYear()} Trimly. All rights reserved.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    console.log("Message sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Error while sending mail:", err);
    return false;
  }
};

export const sendVerificationEmail = async (toEmail: string, name: string, otp: number) => {
  try {
    const info = await transporter.sendMail({
      from: `"Trimly Security" <${process.env.USER_EMAIL}>`,
      to: toEmail,
      subject: "Verify Your Email - Trimly",
      text: `Your One-Time Password (OTP) is ${otp}. This code will expire in 5 minutes. Do not share this code with anyone for security reasons.`,
      html: `
      <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:20px 0;">
          <tr>
            <td align="center">
              <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background:#111827;padding:20px;text-align:center;">
                    <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:1px;">
                      Trimly
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:30px;text-align:center;color:#333;">
                    <h2 style="margin:0 0 10px;font-size:20px;">Verify Your Email Address</h2>
                    <p style="margin:0 0 20px;font-size:14px;color:#555;">
                      Thank you for joining Trimly! Please use the One-Time Password (OTP) below to verify your email address.
                    </p>

                    <!-- OTP Box -->
                    <div style="display:inline-block;padding:15px 25px;font-size:28px;font-weight:bold;letter-spacing:5px;background:#f3f4f6;border-radius:8px;color:#111827;">
                      ${otp}
                    </div>

                    <p style="margin:20px 0 10px;font-size:13px;color:#777;">
                      This code will expire in <strong>5 minutes</strong>.
                    </p>

                    <p style="margin:0;font-size:12px;color:#999;">
                      If you did not create this account, please ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#aaa;">
                    © ${new Date().getFullYear()} Trimly. All rights reserved.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </div>
      `,
    });

    console.log("Message sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("Error while sending mail:", err);
    return false;
  }
};
