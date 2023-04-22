class Parser {
  static parseAlegraToken(headers) {
    const thunderToken = headers["set-cookie"].filter((cookie) => {
      return cookie.startsWith("al-days-of-thunder=");
    });

    const parseToken = thunderToken[0]
      .split("al-days-of-thunder=")[1]
      .split(";")[0];

    return parseToken;
  }
}

module.exports = Parser;
