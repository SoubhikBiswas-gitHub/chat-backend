const express = require("express");
const faker = require("faker");
const app = express();
const port = 5100;

let requestCounter = 0;

const generateFakeGPTResponse = () => {
  requestCounter++;

  if (requestCounter % 3 === 0) {
    throw new Error("Simulated failure");
  }

  return faker.lorem.sentence();
};

app.get("/chat", (req, res) => {
  try {
    const fakeGPTResponse = generateFakeGPTResponse();
    res.json(fakeGPTResponse);
  } catch (error) {
    res.status(500).json({ error: "Simulated failure occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
