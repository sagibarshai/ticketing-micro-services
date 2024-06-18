import nats, { Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

export class NatsWrapper {
  public client?: Stan;

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this.client = nats.connect(clusterId, clientId, { url });
    return new Promise((resolve, reject) => {
      this.client?.on("connect", () => {
        console.log("Tickets connected to NATS");
        resolve();
      });

      this.client?.on("error", (err) => {
        console.error("Tickets cannot connected to NATS ", err);
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
