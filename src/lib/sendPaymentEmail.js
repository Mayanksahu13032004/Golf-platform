import nodemailer from "nodemailer";

import { generateInvoice } from "./generateInvoice";

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export async function sendPaymentEmail({
  name,
  email,
  plan,
  amount,
  charityContribution,
  prizePoolContribution,
  paymentIntent,
  startDate,
  endDate,
}) {
  const pdf =
    await generateInvoice({
      name,
      email,
      plan,
      amount,
      charityContribution,
      prizePoolContribution,
      paymentIntent,
      startDate,
      endDate,
    });

  await transporter.sendMail({
    from: `"Golf Charity Platform" <${process.env.EMAIL_USER}>`,

    to: email,

    subject:
      "✅ Payment Successful - Golf Charity Membership",

    attachments: [
      {
        filename: "Golf-Charity-Invoice.pdf",
        content: pdf,
        contentType: "application/pdf",
      },
    ],

    html: `
<!DOCTYPE html>

<html>

<body style="
margin:0;
padding:0;
background:#f4f6f8;
font-family:Arial,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="padding:40px 0;"
>

<tr>

<td align="center">

<table
width="620"
style="
background:#ffffff;
border-radius:12px;
overflow:hidden;
box-shadow:0 6px 20px rgba(0,0,0,.08);
">

<!-- Header -->

<tr>

<td
align="center"
style="
background:#166534;
padding:35px;
">

<h1
style="
color:white;
margin:0;
font-size:30px;
">

🏌️ Golf Charity Platform

</h1>

<p
style="
color:#dcfce7;
margin-top:10px;
">

Payment Confirmation

</p>

</td>

</tr>

<!-- Body -->

<tr>

<td style="padding:40px;">

<h2
style="
margin-top:0;
color:#15803d;
">

Payment Successful 🎉

</h2>

<p
style="
font-size:16px;
line-height:28px;
color:#444;
">

Hello
<b>${name}</b>,

<br><br>

Thank you for purchasing a membership.

Your payment has been received successfully.

</p>

<table
width="100%"
style="
margin-top:30px;
border-collapse:collapse;
">

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Membership

</td>

<td>

${plan}

</td>

</tr>

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Amount

</td>

<td>

₹${amount}

</td>

</tr>

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Charity Contribution

</td>

<td>

₹${charityContribution}

</td>

</tr>

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Prize Pool Contribution

</td>

<td>

₹${prizePoolContribution}

</td>

</tr>

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Payment ID

</td>

<td>

${paymentIntent}

</td>

</tr>

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Membership Starts

</td>

<td>

${new Date(startDate).toLocaleDateString()}

</td>

</tr>

<tr>

<td
style="
padding:12px;
font-weight:bold;
">

Membership Ends

</td>

<td>

${new Date(endDate).toLocaleDateString()}

</td>

</tr>

</table>

<div
style="
margin-top:35px;
padding:20px;
background:#ecfdf5;
border-radius:8px;
">

📄
<b>
Invoice Attached
</b>

<br><br>

Your payment invoice is attached with this email for future reference.

</div>

<div
style="
text-align:center;
margin-top:35px;
">

<a
href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
style="
background:#16a34a;
color:white;
padding:14px 35px;
text-decoration:none;
border-radius:8px;
display:inline-block;
font-weight:bold;
">

Go To Dashboard

</a>

</div>

</td>

</tr>

<!-- Footer -->

<tr>

<td
align="center"
style="
background:#0f172a;
padding:25px;
color:#94a3b8;
font-size:13px;
">

© ${new Date().getFullYear()}

Golf Charity Platform

<br><br>

Thank you for supporting charity through golf.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`,
  });
}