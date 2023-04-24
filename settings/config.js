const config = {
  LOCAL: {
    lambdas: {
      upload: "http://localhost:3006",
    },
  },
  DEV: {
    lambdas: {
      upload:
        "https://erocq81xb0.execute-api.us-east-2.amazonaws.com/dev/upload-alegra",
    },
  },
  PROD: {},
};
