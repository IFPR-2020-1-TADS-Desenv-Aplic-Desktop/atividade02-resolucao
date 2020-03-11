const fs = require('fs');

// console.log('Hello from BrowserWindow');

// const fileDiv = document.querySelector('.file');

// fs.readFile('/home/diego/test.txt', 'utf-8', (err, data) => {
//   fileDiv.innerHTML = data;
// });

const form = document.querySelector('form');
const input = document.querySelector('#path');
const content = document.querySelector('.content');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const path = input.value;

  content.innerHTML = '';

  try {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      content.innerHTML += `<li>${dirent.name}</li>`;
    }
  } catch (error) {
    content.innerHTML = '<li>Error loading files!</li>';
  }
});
