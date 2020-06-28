const fs = require('fs');

const form = document.querySelector('form');
const input = document.querySelector('#path');
const content = document.querySelector('.content');

form.addEventListener('submit', e => {
  e.preventDefault();

  const path = input.value;

  loadFiles(path);
});

const loadFiles = async path => {
  content.innerHTML = '';
  try {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      const dir = dirent.isDirectory();

      const li = document.createElement('li');
      li.classList.add('list-group-item');
      if (dir) {
        li.addEventListener('click', () => selectEntry(dirent.name));
        li.classList.add('bg-info');
        li.classList.add('item-folder');
      }
      const value = document.createTextNode(dirent.name);
      li.appendChild(value);
      content.appendChild(li);
    }
  } catch (error) {
    content.innerHTML =
      '<li class="list-group-item bg-danger">Error loading files!</li>';
  }
};

const selectEntry = entryName => {
  const newPath = `${input.value}/${entryName}`;
  input.value = newPath;
  loadFiles(newPath);
};
