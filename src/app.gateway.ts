import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clientPool = {};

  handleConnection(client: any, ...args: any[]) {
    const { id: clientId } = client;

    this.clientPool[clientId] = client;

    console.log('Change Pusher Client connected: ', client.id);
    console.log(Object.keys(this.clientPool));

    if (this.clientPool[clientId]) {
      setInterval(() => {
        client.emit('GetNewAnimal', this.getNewAnimal());
      }, 2000);
    }
  }

  handleDisconnect(client: any) {
    const { id: clientId } = client;

    delete this.clientPool[clientId];
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  private getNewAnimal() {
    return {
      data: uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
      }),
    };
  }
}
