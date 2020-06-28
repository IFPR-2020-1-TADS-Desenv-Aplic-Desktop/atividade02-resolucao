const fs = require('fs');

const form = document.querySelector('.form-path');
const input = document.querySelector('#path');
const content = document.querySelector('.content');
const createFilePanel = document.querySelector('.create-file-panel');
const formCreate = document.querySelector('.form-create');
const createButton = document.querySelector('.btn-create');
const fileNameInput = document.querySelector('#filename');
const fileContentInput = document.querySelector('#file-content');

createFilePanel.classList.add('hide');

form.addEventListener('submit', e => {
  e.preventDefault();
  loadFiles(input.value);
});

createButton.addEventListener('click', e => {
  createFilePanel.classList.remove('hide');
});

formCreate.addEventListener('submit', e => {
  e.preventDefault();
  saveFile(input.value, fileNameInput.value, fileContentInput.value);
  createFilePanel.classList.add('hide');
});

const loadFiles = async path => {
  content.innerHTML = '';
  createFilePanel.classList.add('hide');
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
    console.log(error);

    content.innerHTML =
      '<li class="list-group-item bg-danger">Error loading files!</li>';
  }
};

const selectEntry = entryName => {
  const newPath = `${input.value}/${entryName}`;
  input.value = newPath;
  loadFiles(newPath);
  createFilePanel.classList.add('hide');
};

const saveFile = async (folder, filename, content) => {
  await fs.promises.writeFile(`${folder}/${filename}`, content, 'utf-8');
  loadFiles(folder);
};
