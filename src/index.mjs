
export const handler = async (event, context) => {
  const timestamp = new Date().toISOString();

  console.log("===== Expense Tracker Lambda Started =====");

  console.log({
    timestamp,
    requestId: context.awsRequestId,
    functionName: context.functionName,
    functionVersion: context.functionVersion,
    region: process.env.AWS_REGION,
  });

  try {
    // Handle API Gateway requests and direct Lambda invocations.
    const isApiGatewayRequest = event?.requestContext !== undefined;

    const responseData = {
      message: "Expense Tracker Lambda executed successfully",
      status: "SUCCESS",
      timestamp,
      functionName: context.functionName,
      requestId: context.awsRequestId,
    };

    console.log("Execution completed successfully");

    if (isApiGatewayRequest) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseData),
      };
    }

    return {
      statusCode: 200,
      body: responseData,
    };

  } catch (error) {
    console.error("Lambda execution failed:", error);

    return {
      statusCode: 500,
      body: {
        message: "Internal server error",
        status: "FAILED",
      },
    };
  }
};
