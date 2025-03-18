const express = require("express");
const { SessionsClient } = require("@google-cloud/dialogflow");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const sessionClient = new SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

app.post("/api/message", async (req, res) => {
  const { message, sessionId } = req.body;
  try {
    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.PROJECT_ID,
      sessionId
    );
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "vi",
        },
      },
    };
    const [response] = await sessionClient.detectIntent(request);
    res.json({ reply: response.queryResult.fulfillmentText });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server!" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server chạy trên port ${process.env.PORT}`);
});