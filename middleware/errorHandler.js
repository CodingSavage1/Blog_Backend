const { CustomErrorApi } = require("../errors/customErrorApi");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorApi) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message });
  }
  console.log(err.stack);
  const status = req.statusCode ? res.statusCode : 500;
  return res.status(status).json({ status: status, message: err.message });
};

module.exports = errorHandler;
