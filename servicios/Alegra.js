const axios = require("axios");
const Parser = require("./Parser");

class AlegraService {
  static async getAlegraToken(username, password) {
    const response = await axios({
      method: "post",
      url: "https://app.alegra.com/api/v1/login?fields=user,company,company_dictionary",
      data: {
        activeSession: true,
        email: username,
        password,
      },
    });

    return Parser.parseAlegraToken(response.headers);
  }

  static async getBills(token) {
    const today = new Date().toISOString();
    const response = await axios({
      method: "get",
      url: `https://app.alegra.com/api/v1/reports/bills-open?start=0&limit=200&order_direction=DESC`,
      headers: {
        Authorization: "Basic " + token,
      },
    });

    return response.data;
  }

  static async getProviders(token) {
    const response = await axios({
      method: "get",
      url: "https://api.alegra.com/api/v1/contacts?type=provider&start=0&limit=30&excludeExternals=true&fields=deletable&metadata=true",
      headers: {
        Authorization: "Basic " + token,
      },
    });
    let records = response.data.data;
    let shouldIterate = response.data.metadata.total / 30;
    let iterations = 0;

    while (iterations < 2 && shouldIterate > 1) {
      console.warn("3.5/5- Getting Alegra providers (iteration)");
      iterations++;
      shouldIterate--;
      const response = await axios({
        method: "get",
        url: `https://api.alegra.com/api/v1/contacts?type=provider&start=${
          iterations * 30 + 1
        }&limit=30&excludeExternals=true&fields=deletable&metadata=true`,
        headers: {
          Authorization: "Basic " + token,
        },
      });
      records = records.concat(response.data.data);
    }

    let alegraProviders = {};

    records.forEach((record) => {
      alegraProviders = {
        ...alegraProviders,
        [record.name]: {
          id: record.id,
          name: record.name,
          identification: record.identification,
          email: record.email,
          mobile: record.mobile,
        },
      };
    });

    return { alegraProviders, matadate: response.data };
  }
}

module.exports = AlegraService;
