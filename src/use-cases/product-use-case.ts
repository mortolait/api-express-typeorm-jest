import amqp, { Connection, Channel } from 'amqplib';

export class RabbitMQService {
  private static instance: RabbitMQService;
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly exchange: string;
  private readonly exchangeType: string;

  private constructor(exchange: string, exchangeType: string) {
    this.exchange = exchange;
    this.exchangeType = exchangeType;
  }

  public static getInstance(exchange: string, exchangeType: string): RabbitMQService {
    if (!RabbitMQService.instance) {
      RabbitMQService.instance = new RabbitMQService(exchange, exchangeType);
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
      await this.channel.assertExchange(this.exchange, this.exchangeType, { durable: true });

      this.connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err);
        this.reconnect();
      });
      this.connection.on('close', () => {
        console.error('RabbitMQ connection closed. Reconnecting...');
        this.reconnect();
      });

    } catch (error) {
      throw new Error(`Failed to connect to RabbitMQ: ${error.message}`);
    }
  }

  public async sendMessage(exchange: string, routingKey: string, message: string): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel is not initialized. Call 'connect' first.");
    }
    try {
      this.channel.publish(exchange, routingKey, Buffer.from(message), { persistent: true });
      console.log(` [x] Sent ${message} to exchange ${exchange} with routing key ${routingKey}`);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  public async bindQueue(queue: string, routingKey: string): Promise<void> {
    if (!this.channel) {
      throw new Error("Channel is not initialized. Call 'connect' first.");
    }
    try {
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, this.exchange, routingKey);
      console.log(` [x] Bound queue ${queue} to exchange ${this.exchange} with routing key ${routingKey}`);
    } catch (error) {
      console.error('Failed to bind queue:', error);
    }
  }

  public close(): void {
    if (this.connection) {
      this.connection.close();
    }
  }

  private async reconnect(): Promise<void> {
    try {
      await this.connect();
      console.log('Reconnected to RabbitMQ');
    } catch (error) {
      console.error('Reconnection to RabbitMQ failed. Trying again in 5 seconds...');
      setTimeout(() => this.reconnect(), 5000);
    }
  }
}

// Garantir que a conexão seja fechada ao encerrar a aplicação
