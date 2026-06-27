import "./style.css"

console.log('application initiated/ JS loaded');

const addButton = document.querySelector('#username');
const vanFastApp = document.querySelector('.my-vanilla-fast-app');
const line = document.querySelector('.line');
const secondLine = document.querySelector('.second-line');
const inputForm = document.querySelector('.main-app-form');
const input =  document.querySelector('#input')
const app = document.querySelector('#app');

const API_URL = window.location.hostname.includes('github.io')
  ? 'https://crud-note-app.onrender.com'
  : 'http://127.0.0.1:8000';

inputForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log('button clicked');


  const payload = { username: input.value };

  console.log('input value:', input.value);

  try {
    const response = await fetch(`${API_URL}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Backend response:', data);
  } catch (error) {
    console.error('CPRS or Network Error: ', error);
  }
});


async function loadData() {
  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();

  const userList = document.querySelector('#user-list');
  userList.innerHTML = '';

  users.forEach(u => {
    const aUserList = document.createElement("li");
    aUserList.textContent = `${u.id}: ${u.username}`;

    //**----- delete button -----**//
    const deleteButton =  document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.dataset.id = u.id;
    deleteButton.width = '20px';
    deleteButton.height = '20px';
    deleteButton.borderRadius = '60px';
    deleteButton.marginRight = '10px';
    deleteButton.onclick = (e) => {
      deleteUser(e.target.dataset.id);
    }
    userList.appendChild(aUserList);
    aUserList.appendChild(deleteButton);
  });

}

async function deleteUser(id) {

  console.log('Deleting id:', id);

  if (!confirm('Delete this item ?')) {
    return;
  }

  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE"
  });

  if (res.status == 200) {
    loadData();
  } else {
    const err = await res.json();
    alert("Failed to delete item");
    console.log("Failed to delete item", err.detail);
  }
}

loadData();

//**----- button logic -----**//
/**
addButton.addEventListener("click", () => {
  const popUp = document.createElement('div');
  const TextContent = document.createTextNode(`${input.value}`);
  const vanillaDiv = document.querySelector('#app');

  popUp.style.borderRadius = "5px";
  popUp.style.width = "100px";
  popUp.style.height = "20px";
  popUp.style.backgroundColor = "white";
  popUp.style.color = "lightblue";

  popUp.appendChild(TextContent);

  document.body.insertBefore(popUp, vanillaDiv)
  console.log('button is working', addButton);
})

**/

//**----------**//


//**----line-styling----**//

line.style.width = "91px";
line.style.height = "8px";
line.style.backgroundColor = "lightgray";
line.style.borderRadius = "20px";

//**----------**//


//**----second-line-styling----**//

secondLine.style.width = "500px";
secondLine.style.height = "2px";
secondLine.style.margin = "10px";
secondLine.style.justifyContent = "center";
secondLine.style.alignItems = "center";
secondLine.style.backgroundColor = "blue";
secondLine.style.borderRadius = "5px";

//**----------**//
