import jsPDF from 'jspdf';

export const downloadJSON = (email) => {
  const json = JSON.stringify(email, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${email.subject}.json`;
  link.click();
};

export const downloadHTML = (email) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 80vw;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 2px solid #651fff;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #651fff;
          }
          .content p {
            line-height: 1.6;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>${email.subject}</h1>
          </div>
          <div class="content">
            <p><strong>Email:</strong> ${email.email}</p>
            <p><strong>Process:</strong> ${email.process}</p>
            <p><strong>Date:</strong> ${new Date(email.date).toLocaleString()}</p>
            <p><strong>Body:</strong> ${email.body}</p>
            <p><strong>File Types:</strong> ${email.fileTypes.join(', ')}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} HexaHunks. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${email.subject}.html`;
  link.click();
};

export const downloadPDF = (email) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  const maxLineWidth = pageWidth - 2 * margin;
  let cursorY = 20;

  doc.setFontSize(18);
  const subjectText = doc.splitTextToSize(email.subject, maxLineWidth);
  doc.text(subjectText, margin, cursorY);
  cursorY += doc.getTextDimensions(subjectText).h + 10;

  doc.setFontSize(12);

  const emailText = doc.splitTextToSize(`Email: ${email.email}`, maxLineWidth);
  doc.text(emailText, margin, cursorY);
  cursorY += doc.getTextDimensions(emailText).h + 10;

  const processText = doc.splitTextToSize(
    `Process: ${email.process}`,
    maxLineWidth
  );
  doc.text(processText, margin, cursorY);
  cursorY += doc.getTextDimensions(processText).h + 10;

  const dateText = doc.splitTextToSize(
    `Date: ${new Date(email.date).toLocaleString()}`,
    maxLineWidth
  );
  doc.text(dateText, margin, cursorY);
  cursorY += doc.getTextDimensions(dateText).h + 10;

  const bodyText = doc.splitTextToSize(`Body: ${email.body}`, maxLineWidth);
  doc.text(bodyText, margin, cursorY);
  cursorY += doc.getTextDimensions(bodyText).h + 10;

  const fileTypesText = doc.splitTextToSize(
    `File Types: ${email.fileTypes.join(', ')}`,
    maxLineWidth
  );
  doc.text(fileTypesText, margin, cursorY);
  cursorY += doc.getTextDimensions(fileTypesText).h + 10;

  doc.save(`${email.subject}.pdf`);
};
