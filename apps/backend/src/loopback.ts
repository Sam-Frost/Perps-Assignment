import { toBackendQueue } from "./queue";
import type { ToBackendQueue } from "./types/queue-types";

export const pendingResloves: Map<string, (value: unknown) => void> = new Map();

export async function loopback() {
  while (true) {
    const data = (await toBackendQueue.poll()) as ToBackendQueue<unknown>;
    const pendingResolve = pendingResloves.get(data.correlationId);

    if (!pendingResolve) {
      throw new Error("Cannot find pending resolve!");
    }

    pendingResolve(data);
  }
}
