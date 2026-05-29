import type { Request, Response } from "express";
import { createUserSchema } from "../types/schema";
import { toEngineQueue } from "../queue";
import type {
  RegisterUser,
  ToBackendQueue,
  ToEngineQueue,
} from "../types/queue-types";
import { generateCorrelationId } from "../util";
import { pendingResloves } from "../loopback";
import { db } from "../db/in-memory-db";

export async function createUser(req: Request, res: Response) {
  const parsedBody = createUserSchema.safeParse(req.body);

  if (!parsedBody.success) {
    // console.log(parsedBody.);
    res.status(200).json({
      status: "rejected",
      reason: "invalid input",
    });
    return;
  }

  const data: ToEngineQueue<RegisterUser> = {
    correlationId: generateCorrelationId(),
    eventName: "REGISTER_USER",
    data: {
      userId: parsedBody.data.userId,
      initialBalance: parsedBody.data.initialBalance,
    },
  };
  toEngineQueue.push(data);

  const promise = new Promise((resolve, reject) => {
    pendingResloves.set(data.correlationId, resolve);
  });

  const response = (await promise) as ToBackendQueue<null>;

  db.printDb();
  if (response.success) {
    res.status(200).json({
      userId: parsedBody.data.userId,
    });
    return;
  } else {
    res.status(200).json({
      reject: "reject",
      reason: response.error,
    });
  }
}

// getBalance;
// getPosition;
