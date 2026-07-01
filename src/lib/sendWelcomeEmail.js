import { sendEmail } from "./sendEmail";

export async function sendWelcomeEmail({
  name,
  email,
}) {
  await sendEmail({
    to: email,

    subject:
      "🎉 Welcome to Golf Charity Platform",

    html: `
<!DOCTYPE html>
<html>

<body style="
margin:0;
padding:0;
background:#f5f5f5;
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
width="600"
style="
background:#ffffff;
border-radius:12px;
overflow:hidden;
box-shadow:0 5px 15px rgba(0,0,0,.08);
"
>

<!-- Header -->

<tr>

<td
align="center"
style="
background:#0f172a;
padding:35px;
"
>

<h1
style="
color:#22c55e;
margin:0;
font-size:30px;
"
>

🏌️ Golf Charity Platform

</h1>

</td>

</tr>

<!-- Body -->

<tr>

<td style="padding:40px;">

<h2 style="margin-top:0;">

Hello ${name},

</h2>

<p
style="
font-size:16px;
color:#444;
line-height:28px;
"
>

Welcome to
<b>Golf Charity Platform</b>.

Your account has been created successfully.

</p>

<table
width="100%"
style="margin-top:25px;"
>

<tr>

<td
style="
padding:15px;
background:#f8fafc;
border-radius:10px;
"
>

✅ Participate in Monthly Draws

</td>

</tr>

<tr>

<td height="12"></td>

</tr>

<tr>

<td
style="
padding:15px;
background:#f8fafc;
border-radius:10px;
"
>

🏆 Win Exciting Cash Rewards

</td>

</tr>

<tr>

<td height="12"></td>

</tr>

<tr>

<td
style="
padding:15px;
background:#f8fafc;
border-radius:10px;
"
>

❤️ Support Charity

</td>

</tr>

<tr>

<td height="12"></td>

</tr>

<tr>

<td
style="
padding:15px;
background:#f8fafc;
border-radius:10px;
"
>

📊 Track Scores & Membership

</td>

</tr>

</table>

<div
style="
text-align:center;
margin-top:35px;
"
>

<a
href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
style="
background:#16a34a;
color:white;
padding:14px 35px;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
"
>

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
padding:25px;
background:#0f172a;
color:#94a3b8;
font-size:13px;
"
>

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