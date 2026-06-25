
import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },
  });

export async function sendWinnerEmail({
  email,
  amount,
  matchCount,
}) {
  await transporter.sendMail({
    from:
      process.env.EMAIL_USER,

    to: email,

    subject:
      "Golf Charity Draw Winner",

    html: `
      <div style="font-family: Arial">

        <h2>
          Congratulations!
        </h2>

        <p>
          You are a
          <strong>
          ${matchCount}
          Match Winner
          </strong>
        </p>

        <p>
          Prize Amount:
          ₹${amount}
        </p>

        <p>
          Please login to your
          dashboard and upload
          proof to claim your prize.
        </p>

      </div>
    `,
  });
}

