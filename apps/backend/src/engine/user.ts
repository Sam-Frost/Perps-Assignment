import { db } from "../db/in-memory-db";
import { toBackendQueue } from "../queue";
import type {
  RegisterUser,
  ToBackendQueue,
  ToEngineQueue,
} from "../types/queue-types";

export function registerUser(data: ToEngineQueue<RegisterUser>) {
  const users = db.user;

  for (const user of users) {
    if (data.data.userId == user.userId) {
      const errorResponse: ToBackendQueue<null> = {
        success: false,
        eventName: data.eventName,
        correlationId: data.correlationId,
        error: "User is already registered",
      };
      toBackendQueue.push(errorResponse);
      return;
    }
  }

  users.push({
    userId: data.data.userId,
    balance: data.data.initialBalance,
  });

  const responseData: ToBackendQueue<null> = {
    success: true,
    eventName: data.eventName,
    correlationId: data.correlationId,
  };
  toBackendQueue.push(responseData);
}
