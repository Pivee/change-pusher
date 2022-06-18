import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { interval } from 'rxjs';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log('Change Pusher Client connected: ', client.id);
    interval(2000)
      .pipe()
      .forEach(() => {
        this.server.emit('GetNewAnimal', {
          data: uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
          }),
        });
      });
  }

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
