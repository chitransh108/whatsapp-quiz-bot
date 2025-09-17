const cron = require('node-cron');
const { getUnsentQuiz, markQuizAsSent } = require('./sheets');
const { sendToChannel } = require('./channel');
const { getGoogleAuth } = require('./auth'); // OAuth2 setup

cron.schedule('*/15 * * * *', async () => {
  const auth = await getGoogleAuth();
  const result = await getUnsentQuiz(auth);
  if (!result) return;

  const { quiz, rowIndex } = result;
  const message = `❓ ${quiz[0]}\n\n1️⃣ ${quiz[1]}\n2️⃣ ${quiz[2]}\n3️⃣ ${quiz[3]}\n4️⃣ ${quiz[4]}`;
  await sendToChannel(message);
  await markQuizAsSent(auth, rowIndex);
});
