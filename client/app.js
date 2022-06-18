console.log('Change Pusher Client successfully started');

const socket = io('http://localhost:3000', {
  auth: {
    token: '123',
  },
});

let animal;

socket.on('GetNewAnimal', ({ data }) => {
  console.log('Data Received: ', data);
  animal = data;

  document.getElementById('animal').value = animal;
  document.getElementById(
    'last-updated-at',
  ).innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
});
