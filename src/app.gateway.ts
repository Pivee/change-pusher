import { HttpService } from '@nestjs/axios';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { catchError, map } from 'rxjs';
import { Server } from 'socket.io';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private httpService: HttpService) {}

  @WebSocketServer()
  server: Server;

  clientPool = {};

  handleConnection(client: any, ...args: any[]) {
    const { id: clientId } = client;

    this.clientPool[clientId] = client;

    console.log('Change Pusher Client connected: ', client.id);
    console.log(Object.keys(this.clientPool));

    if (this.clientPool[clientId]) {
      /**
       * This pushes an update on the Animal once every 2000ms.
       */
      setInterval(() => {
        client.emit('GetNewAnimal', this.getNewAnimal());
      }, 2000);

      /**
       * This calls an external Users API and pushes the changes on Users once every 500ms.
       */
      setInterval(() => {
        try {
          this.httpService.get('http://localhost:4000/users').subscribe({
            next: (response) => {
              const { data } = response as any;

              client.emit('GetUsers', { data });
            },
            error: (error) => {
              console.error(
                '⚠️ Connection to http://localhost:4000/users failed',
              );
            },
          });
        } catch (error) {
          console.error(error);
        }
      }, 500);
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
