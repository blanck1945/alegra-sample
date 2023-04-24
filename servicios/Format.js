class Formatter {
  static randomFixedInteger = function (str, length = 5) {
    let placeholder = "";
    for (var i = 0; i < length; i++) {
      placeholder += str.charCodeAt(i) || "0";
    }

    return parseInt(placeholder);
  };

  static formatAlegraData(bills, providers, companyDoc, companyId) {
    const records = [];

    bills.forEach((bill) => {
      records.push({
        invoiceNumber: bill.billNumber,
        total: bill.missingAmount,
        providerDoc: providers[bill.name]
          ? parseInt(providers[bill.name]?.identification)
          : this.randomFixedInteger(bill.name),
        providerName: bill.name,
        providerTypeDoc: "",
        expirationDate: bill.dueDate,
        emisionDate: bill.date,
        hasNitPlaceholder: providers[bill.name] ? false : true,
      });
    });

    const bubbleObj = {
      invoices: records,
      companyDoc,
      companyId,
      accountingService: "Alegra",
    };

    return bubbleObj;
  }
}

module.exports = Formatter;
