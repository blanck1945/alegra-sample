const express = require("express");
const router = express.Router();
const Route = require("../../core/Route");
const AlegraService = require("../../servicios/Alegra");
const Formatter = require("../../servicios/Format");
const LambdasService = require("../../servicios/Lambdas");

router.get("/", async (req, res) => {
  const { username, password, companyId, companyDoc } = req.query;

  Route.execute(req, res, async (_, res) => {
    console.warn("1/6- Getting Alegra session");
    const parseToken = await AlegraService.getAlegraToken(username, password);

    console.warn("2/6- Getting Alegra bills");
    const alegraBills = await AlegraService.getBills(parseToken);

    console.warn("3/6- Getting Alegra providers");
    const { alegraProviders, metadata } = await AlegraService.getProviders(
      parseToken
    );

    console.warn("4/6- Formatting data");
    const bubbleObj = Formatter.formatAlegraData(
      alegraBills.data,
      alegraProviders,
      companyDoc,
      companyId
    );

    console.warn("5/6- Uploading to Bubble");
    await LambdasService.uploadInvoicesAlegra(bubbleObj);

    console.warn("6/6- Sending success response");
    res.send({
      status: "ok",
      message: "Facturas y proveedores creados con exito",
      service: "Alegra",
    });
  });
});

module.exports = router;
