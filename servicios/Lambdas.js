const axios = require("axios");

class LambdasServices {
  static async invokeLambda(formattedBills) {
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
        url: "https://erocq81xb0.execute-api.us-east-2.amazonaws.com/dev/upload-alegra",
        data: formattedBills,
      });
    } catch (err) {
      console.warn("Hubo un error");
    }
  }
}

module.exports = LambdasServices;
