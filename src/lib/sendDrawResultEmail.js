import { sendEmail } from "./sendEmail";

export async function sendDrawResultEmail({
  email,
  winningNumbers,
}) {
  await sendEmail({
    to: email,

    subject:
      "Monthly Draw Result",

    html: `
      <h2>Draw Results</h2>

      <p>
      Winning Numbers:
      </p>

      <h3>
      ${winningNumbers.join(
        ", "
      )}
      </h3>
    `,
  });
}