const socket = io();

socket.on('messages', (messages) => {
  const elementText = document.querySelector('#messages');
  const html = messages.map((message) => {
    return `
    <div class="row">
      <div class="col d-flex flex-row justify-content-end">
        <strong class="text-primary">${message.email}</strong> <div class="message text-danger">${message.dateAndHour}</div>: 
      </div>
      <div class="col text-start text-success">
        <em>${message.bodyMessage}</em>
      </div>
    </div>
    `;
  });

  elementText.innerHTML = html.join('');
});

const addText = (e) => {
  const email = document.querySelector('#email').value;
  const bodyMessage = document.querySelector('#text').value;

  if (email === '') {
    return alert('Debe ingresar correo electrónico');
  }

  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const age = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const dateAndHour = `[${day}/${month}/${age} ${hours}:${minutes}:${seconds}]`;

  const message = {
    email,
    dateAndHour,
    bodyMessage,
  };
  socket.emit('messageSent', message);
  document.getElementById('text').value = '';

  return false;
};
