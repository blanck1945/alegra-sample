class Formatter {
  static randomFixedInteger = function (length) {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
  };

  static formatAlegraData(bills, providers, companyDoc, companyId) {
    const records = [];

    bills.forEach((bill) => {
      records.push({
        invoiceNumber: bill.billNumber,
        total: bill.missingAmount,
        providerDoc: providers[bill.name]
          ? parseInt(providers[bill.name]?.identification)
          : this.randomFixedInteger(8),
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
