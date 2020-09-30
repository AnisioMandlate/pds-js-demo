const express = require("express");
const cors = require("cors");
const { Client } = require("@paymentsds/mpesa");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const client = new Client({
  apiKey: "6kibezug5o5ei19z9fwpomtdk2bt0zu2", // API Key
  publicKey:
    "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==", // Public Key
  serviceProviderCode: "171717", // input_ServiceProviderCode
});

app.post("/data", (req, res) => {
  const paymentData = {
    from: "845276993", // input_CustomerMSISDN
    reference: `114${Math.floor(Math.random() * 100)}`, // input_ThirdPartyReference
    transaction: "T12344CC", // input_TransactionReference
    amount: "10", // input_Amount
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

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
