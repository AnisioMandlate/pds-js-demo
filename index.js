const express = require("express");
const cors = require("cors");
const { Client } = require("@paymentsds/mpesa");
const { config } = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  apiKey: process.env.API_KEY, // API Key
  publicKey: process.env.PUBLIC_KEY, // Public Key
  serviceProviderCode: process.env.SERVICE_PROVIDER_CODE, // input_ServiceProviderCode
});

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.post("/data", (req, res) => {
  const paymentData = {
    from: "845276993", // input_CustomerMSISDN
    reference: `11114${Math.floor(Math.random() * 100)}`, // input_ThirdPartyReference
    transaction: "T12344CC", // input_TransactionReference
    amount: "10", // input_Amount
  };

  client
    .receive(paymentData)
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.error(e.message);
    });
});

const PORT = 8000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
