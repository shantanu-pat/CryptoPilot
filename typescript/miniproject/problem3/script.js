let users = getUsersFromCookie();
let editIndex = -1;

let nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  if (name === "" || email === "") {
    alert("Enter all fields");
    return;
  }

  if (editIndex === -1) {
    users.push({
      id: nextId,
      name: name,
      email: email
    });
    nextId++;
  } else {
    users[editIndex].name = name;
    users[editIndex].email = email;
    editIndex = -1;
  }

  saveUsersToCookie();
  clearInputs();
  displayUsers();
}

// DISPLAY
function displayUsers() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    list.innerHTML += `
      <li>
        ID: ${users[i].id} | ${users[i].name} - ${users[i].email}
        <button onclick="editUser(${i})">Edit</button>
        <button onclick="deleteUser(${i})">Delete</button>
      </li>
    `;
  }
}

// DELETE
function deleteUser(index) {
  users.splice(index, 1);
  saveUsersToCookie();
  displayUsers();
}

// EDIT
function editUser(index) {
  document.getElementById("name").value = users[index].name;
  document.getElementById("email").value = users[index].email;

  editIndex = index;
}

function saveUsersToCookie() {
  document.cookie = "users=" + JSON.stringify(users) + "; path=/";
}

function getUsersFromCookie() {
  let cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    let parts = cookies[i].split("=");
    if (parts[0] === "users") {
      return JSON.parse(parts[1]);
    }
  }
  return [];
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

displayUsers();