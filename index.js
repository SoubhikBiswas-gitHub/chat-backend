const express = require("express");
const faker = require("faker");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5100;

let requestCounter = 0;

app.use(cors());
app.use(bodyParser.json());

const generateFakeGPTResponse = (userMessage) => {
  requestCounter++;

  if (requestCounter % 3 === 0) {
    throw new Error("Simulated failure");
  }

  const fakeGPTResponse = `${userMessage} ${faker.lorem.sentence()}`;
  return fakeGPTResponse;
};

app.post("/chat", (req, res) => {
  try {
    const userMessage = req.body.message;
    const fakeGPTResponse = generateFakeGPTResponse(userMessage);
    res.json({ response: fakeGPTResponse });
  } catch (error) {
    res.status(500).json({ error: "Simulated failure occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
