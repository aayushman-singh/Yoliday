import { Request, Response, NextFunction } from "express";

export const logResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;
  const originalJson = res.json;
  let responseJSON: any = null;

  res.json = (body: any): Response => {
    // Store body before serialization
    responseJSON = body;
    return originalJson.call(res, body);
  };

  res.send = function (body: any) {
    if (typeof body === "string") {
      try {
        // Try to parse as JSON
        responseJSON = JSON.parse(body);
      } catch {
        // If not valid JSON, set it to body string
        responseJSON = body;
      }
    } else {
      responseJSON = body;
    }

    // Log after response
    console.log("ESSAY RESPONSE SENT:", JSON.stringify(responseJSON, null, 2));
    return originalSend.call(this, body);
  };

  next();
};
