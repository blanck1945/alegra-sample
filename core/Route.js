const chalk = require("chalk");
class Route {
  static async execute(req, res, cb) {
    try {
      await cb(req, res);
    } catch (err) {
      if (err.response) {
        console.warn(chalk.red(err.response.data.message));
        return res
          .status(err.response.data.code)
          .send({ status: "error", message: err.response.data.message });
      }

      console.warn(chalk.red(err));
      return res.status(500).send({ status: "error" });
    }
  }
}

module.exports = Route;
