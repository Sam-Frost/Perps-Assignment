class Queue {
  queue: unknown[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
    console.log(`${name} queue created!`);
  }

  push(data: unknown) {
    console.log(`Pushing data to ${this.name}`);
    this.queue.push(data);
  }
  async poll() {
    let data = this.queue.shift();

    while (data == undefined) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      data = this.queue.shift();
    }

    console.log(`Polling data from ${this.name}`);
    return data;
  }
}

export const toEngineQueue = new Queue("to-engine-queue");
export const toBackendQueue = new Queue("to-backend-queue");
