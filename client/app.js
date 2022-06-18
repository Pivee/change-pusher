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
    'animals-last-updated-at',
  ).innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
});

socket.on('GetUsers', ({ data }) => {
  console.log('Data Received: ', data);
  const users = data;

  const usersListElement = document.getElementById('users');

  let names = [];

  users.forEach((user) => {
    names.push(user.name);
  });

  usersListElement.innerText = names.join(', ');

  document.getElementById(
    'users-last-updated-at',
  ).innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
});
