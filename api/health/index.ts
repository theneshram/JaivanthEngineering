import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const healthFunction: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Health check requested");

  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      status: "OK",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "production",
    },
  };
};

export default healthFunction;
