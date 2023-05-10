const chalk = require("chalk");
const CoreController = require("../core/Core.controller");
const AlegraService = require("../servicios/Alegra");
const Formatter = require("../servicios/Format");
const LambdasService = require("../servicios/Lambdas");

class AlegraController extends CoreController {
  static async executeAlegraFlow(req, res) {
    const { username, password, companyId, companyDoc } = req.query;
    console.log(
      `Starting the request with \nUsername: ${username}  \nPassword: ${password} \nCompanyId: ${companyId} \nCompanyDoc: ${companyDoc}`
    );

    return await this.execute(req, res, async (_, res) => {
      console.warn(chalk.blue("1/6- Getting Alegra session"));
      const parseToken = await AlegraService.getAlegraToken(username, password);

      console.warn(chalk.blue("2/6- Getting Alegra bills"));
      const alegraBills = await AlegraService.getBills(parseToken);

      console.warn(chalk.blue("3/6- Getting Alegra providers"));
      const { alegraProviders } = await AlegraService.getProviders(parseToken);

      console.warn(chalk.blue("4/6- Formatting data"));
      const bubbleObj = Formatter.formatAlegraData(
        alegraBills.data,
        alegraProviders,
        companyDoc,
        companyId
      );

      console.warn(
        chalk.blue(
          "5/6- Uploading to Bubble - invoices total: " +
            bubbleObj.invoices.length
        )
      );
      await LambdasService.uploadInvoicesAlegra(bubbleObj);

      console.warn(chalk.green("6/6- Sending success response"));
      res.status(200).send({
        status: "ok",
        message: "Facturas y proveedores creados con exito",
        service: "Alegra",
      });
    });
  }
}

module.exports = AlegraController;
