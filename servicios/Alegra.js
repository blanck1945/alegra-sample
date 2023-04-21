const axios = require("axios");

class AlegraService {
  static async getBills(token) {
    try {
      const response = await axios({
        method: "get",
        url: "https://app.alegra.com/api/v1/reports/bills-open",
        headers: {
          Authorization: "Basic " + token,
        },
      });

      console.warn(response.data);

      return response.data;
    } catch (err) {
      console.warn(err);
    }
  }

  static async getProviders(token) {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.alegra.com/api/v1/contacts?type=provider&start=0&limit=30&excludeExternals=true&fields=deletable&metadata=true",
        headers: {
          Authorization: "Basic " + token,
        },
      });
      let records = {};
      response.data.data.map((record) => {
        records = {
          ...records,
          [record.name]: {
            id: record.id,
            name: record.name,
            identification: record.identification,
            email: record.email,
            mobile: record.mobile,
          },
        };
      });
      let iterations = 5;

      while (iterations < 2) {
        const response = await axios({
          method: "get",
          url: "https://api.alegra.com/api/v1/contacts",
          headers: {
            Authorization: "Basic " + token,
          },
        });
        records = records.concat(response.data);
        iterations++;
      }

      return records;
    } catch (err) {
      console.warn(err);
    }
  }
}

module.exports = AlegraService;
