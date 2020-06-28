const fs = require("fs");

const form = document.querySelector("form");
const input = document.querySelector("#path");
const content = document.querySelector(".content");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const path = input.value;

  content.innerHTML = "";

  try {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      const dir = dirent.isDirectory();

      content.innerHTML += `<li class="list-group-item ${
        dir ? "bg-info item-folder" : ""
      }">${dirent.name}</li>`;
    }
  } catch (error) {
    content.innerHTML =
      '<li class="list-group-item bg-danger">Error loading files!</li>';
  }
});
