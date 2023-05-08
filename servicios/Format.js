class Formatter {
  static fixedIntegerByCharCode = function (str, length = 8) {
    let placeholder = "";
    for (var i = 0; i < length; i++) {
      placeholder += str.charCodeAt(i) || "0";
    }

    placeholder += str.charCodeAt(str.length - 1);

    return placeholder;
  };

  static formatAlegraData(bills, providers, companyDoc, companyId) {
    const records = [];

    bills.forEach((bill) => {
      records.push({
        invoiceNumber: bill.billNumber,
        total: bill.missingAmount,
        providerDoc: providers[bill.name]
          ? providers[bill.name]?.identification
          : this.fixedIntegerByCharCode(bill.name),
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
