export type eventName = "REGISTER_USER" | "GET_BALANCE";

export type ToEngineQueue<T> = {
  correlationId: string;
  eventName: eventName;
  data: T;
};

export type ToBackendQueue<T> = {
  success: boolean;
  correlationId: string;
  eventName: eventName;
  data?: T;
  error?: string;
};

// To Engine Queue
export type RegisterUser = {
  userId: string;
  initialBalance: number;
};

// To Backend Queue
