const axios = require("axios");

class LambdasService {
  static async invokeLambda(formattedBills) {
    try {
      return await this.uploadInvoicesAlegra(formattedBills);
    } catch (err) {
      console.warn(err);
    }
  }

  static async uploadInvoicesAlegra(formattedBills) {
    await axios({
      method: "post",
      //url: "http://localhost:3006/dev",
      // url: "https://erocq81xb0.execute-api.us-east-2.amazonaws.com/dev/upload-alegra",
      url: "https://alegra-be-upload.onrender.com/upload-alegra",
      data: formattedBills,
    });
  }
}

module.exports = LambdasService;
