const { google } = require('googleapis');

async function getUnsentQuiz(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1x-kjKSEDrRafuibUNNVTcN6JjxqirIjfzJgK4BPaF8A',
    range: 'Quiz!A2:F',
  });

  const rows = res.data.values;
  const unsent = rows.find(row => row[5] !== 'TRUE');
  return unsent;
}

async function markQuizAsSent(auth, rowIndex) {
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.update({
    spreadsheetId: '1x-kjKSEDrRafuibUNNVTcN6JjxqirIjfzJgK4BPaF8A',
    range: `Quiz!F${rowIndex + 2}`,
    valueInputOption: 'RAW',
    requestBody: { values: [['TRUE']] },
  });
}
