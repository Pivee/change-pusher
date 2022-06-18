import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    console.log('Change Pusher Client connected: ', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
