const express = require("express");
const AlegraService = require("./servicios/Alegra");
const LambdasServices = require("./servicios/Lambdas");
const Formatter = require("./servicios/Format");
const mockData = require("./mock/mockdata");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// exclusiverattan@gmail.com
// Alejo1037667871

app.get("/alegra", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const companyId = req.query.companyId;
  const companyDoc = req.query.companyDoc;

  try {
    const response = await axios({
      method: "post",
      url: "https://app.alegra.com/api/v1/login?fields=user,company,company_dictionary",
      data: {
        activeSession: true,
        email: username,
        password,
      },
    });

    const thunderToken = response.headers["set-cookie"].filter((cookie) => {
      return cookie.startsWith("al-days-of-thunder=");
    });

    const parseToken = thunderToken[0]
      .split("al-days-of-thunder=")[1]
      .split("==")[0];

    const alegraBills = await AlegraService.getBills(parseToken);

    const alegraProviders = await AlegraService.getProviders(parseToken);

    const formattedData = Formatter.formatAlegraData(
      alegraBills.data,
      alegraProviders
    );

    const bubbleObj = {
      invoices: formattedData,
      companyDoc,
      companyId,
      accountingService: "Alegra",
    };

    await LambdasServices.uploadInvoicesAlegra(bubbleObj);

    res.send({
      status: "ok",
      message: "Facturas y proveedores creados con exito",
      service: "Alegra",
    });
  } catch (err) {
    console.warn(err);
    res.send({ status: "error", message: err });
  }
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
