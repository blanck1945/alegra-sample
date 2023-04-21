const axios = require("axios");

class LambdasServices {
  //   static lambdas = {
  //     uploadInvoicesAlegra: this.uploadInvoicesAlegra(),
  //   };

  static async invokeLambda(formattedBills) {
    //console.warn(this.lambdas[lambda]());
    try {
      return await this.uploadInvoicesAlegra(formattedBills);
    } catch (err) {
      console.warn(err);
    }
  }

  static async uploadInvoicesAlegra(formattedBills) {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/dev",
        data: formattedBills,
      });
    } catch (err) {
      console.warn("Hubo un error");
    }
  }
}

module.exports = LambdasServices;
