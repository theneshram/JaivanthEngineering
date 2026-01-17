module.exports = async function (context, req) {
  context.log("Health check requested");

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      status: "OK",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    },
  };
};
