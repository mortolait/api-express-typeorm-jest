import amqp, { Connection, Channel } from 'amqplib';

export class RabbitMQService {
  private static instance: RabbitMQService;
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly queue: string;

  private constructor(queue: string) {
    this.queue = queue;
  }

  public static getInstance(queue: string): RabbitMQService {
    if (!RabbitMQService.instance) {
      RabbitMQService.instance = new RabbitMQService(queue);
    }
    return RabbitMQService.instance;
  }

  public async connect(): Promise<void> {
    if (this.connection && this.channel) {
      return;
    }
    try {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: false });
    } catch (error) {
      throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
    }
  }

  public async sendMessage(message: string): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel is not initialized. Call 'connect' first.");
    }
     this.channel.sendToQueue(this.queue, Buffer.from(message));
    console.log(` [x] Sent ${message}`);
  }

  public close(): void {
    if (this.connection) {
      this.connection.close();
    }
  }
}

