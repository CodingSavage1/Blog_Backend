class CustomErrorApi extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const CustomError = (msg, status) => {
  const statusCode = status || 400;
  return new CustomErrorApi(msg, statusCode);
};

module.exports = {
  CustomErrorApi,
  CustomError,
};
