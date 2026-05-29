import { toEngineQueue } from "../queue";
import type { RegisterUser, ToEngineQueue } from "../types/queue-types";
import { registerUser } from "./user";

export async function engineInit() {
  while (true) {
    const event = (await toEngineQueue.poll()) as ToEngineQueue<unknown>;

    if (event.eventName == "REGISTER_USER") {
      registerUser(event as ToEngineQueue<RegisterUser>);
    }
  }
}
