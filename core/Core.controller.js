const chalk = require("chalk");

class CoreController {
  static async execute(req, res, cb) {
    try {
      return await cb(req, res);
    } catch (err) {
      if (err.response) {
        console.warn(chalk.red(err?.response?.data?.message));

        if (err.response.status === 400) {
          return res.status(400).send({
            status: "error",
            message: err.response.data.message,
            alegraMessage:
              "El request está mal formado. La información para crear el recurso no existe o es inválida.",
          });
        }

        if (err.response.status === 401) {
          return res.status(401).send({
            status: "error",
            message: err.response.data.message,
            alegraMessage:
              "	Error en autenticación. La autenticación fallo o no se encontró la información para autenticar el request.",
          });
        }

        if (err.response.status === 402) {
          return res.status(402).send({
            status: "error",
            message: err.response.data.message,
            apiAditionalComment:
              "Si su cuenta tiene plan emprededor es posible que no pueda usar esta funcionalidad.",
            alegraMessage:
              "Pago requerido. La acción no se pudo realizar exitosamente ya que la cuenta se encuentra suspendida o el plan actual de la compañía no permite realizar la acción.",
          });
        }

        if (err.response.status === 403) {
          return res.status(403).send({
            status: "error",
            message: err.response.data.message,
            alegraMessage:
              "El usuario no tiene permisos para realizar la acción.",
          });
        }

        if (err.response.status === 404) {
          return res.status(404).send({
            status: "error",
            message: err.response.data.message,
            alegraMessage:
              "No se encontró en la aplicación el recurso que se está buscando. También se retorna cuando la cuenta se encuentra suspendida",
          });
        }

        return res
          .status(err.response.data.code)
          .send({ status: "error", message: err.response.data.message });
      }

      console.warn(chalk.red(err));
      return res.status(500).send({ status: "error" });
    }
  }
}

module.exports = CoreController;
