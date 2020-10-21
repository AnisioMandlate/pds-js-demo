const express = require("express");
const cors = require("cors");
const path = require("path");
const { Client } = require("@paymentsds/mpesa");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

const client = new Client({
  apiKey: process.env.API_KEY, // API Key
  publicKey: process.env.PUBLIC_KEY, // Public Key
  serviceProviderCode: process.env.SERVICE_PROVIDER_CODE, // input_ServiceProviderCode
});

app.post("/data", (req, res) => {
  const celular = req.body.celular;
  const amount = req.body.valor;
  const reference = req.body.reference;

  const paymentData = {
    from: celular, // input_CustomerMSISDN
    reference: `2AM${reference}`, // input_ThirdPartyReference
    transaction: "T12344CC", // input_TransactionReference
    amount: amount, // input_Amount
  };

  client
    .receive(paymentData)
    .then((r) => {
      console.log("Success: ", r);
    })
    .catch((e) => {
      console.error(e.message);
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
