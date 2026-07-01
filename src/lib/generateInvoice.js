import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function generateInvoice({
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
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  const bold = await pdfDoc.embedFont(
    StandardFonts.HelveticaBold
  );

  // Header
  page.drawRectangle({
    x: 0,
    y: 740,
    width: 600,
    height: 60,
    color: rgb(0.09, 0.45, 0.27),
  });

  page.drawText("Golf Charity Platform", {
    x: 40,
    y: 762,
    size: 24,
    font: bold,
    color: rgb(1, 1, 1),
  });

  page.drawText("PAYMENT INVOICE", {
    x: 40,
    y: 710,
    size: 20,
    font: bold,
  });

  let y = 670;

  const money = (value) => `INR ${Number(value).toFixed(2)}`;

  function row(label, value) {
    page.drawText(label, {
      x: 40,
      y,
      size: 12,
      font: bold,
    });

    page.drawText(String(value), {
      x: 220,
      y,
      size: 12,
      font,
    });

    y -= 28;
  }

  row("Invoice No", `INV-${Date.now()}`);
  row("Customer", name);
  row("Email", email);
  row("Membership Plan", plan);

  row("Amount", money(amount));
  row("Charity Contribution", money(charityContribution));
  row("Prize Pool Contribution", money(prizePoolContribution));

  row("Payment ID", paymentIntent);

  row(
    "Start Date",
    new Date(startDate).toLocaleDateString()
  );

  row(
    "Expiry Date",
    new Date(endDate).toLocaleDateString()
  );

  row("Payment Status", "PAID");

  page.drawLine({
    start: { x: 40, y: y - 20 },
    end: { x: 560, y: y - 20 },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
  });

  page.drawText(
    "Thank you for supporting Golf Charity Platform.",
    {
      x: 40,
      y: y - 60,
      size: 12,
      font,
    }
  );

  const pdfBytes = await pdfDoc.save();

  return Buffer.from(pdfBytes);
} 