const USER_URL = "http://localhost:3000/users"
const table = document.querySelector("#users");
const form = document.querySelector("form");
let page = 0;
let userslen;
let last_id =0;

const user_checker = {
  first: /^[A-Za-z-]+$/,
  last: /^[A-Za-z-]+$/,
  email: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,3}$/,
  company: /^[A-Za-z- ]+$/,
  country: /^[A-Za-z- ]+$/
};

const keys = ["first", "last", "email", "company", "country"];

// The user to edit
let current_user;


/**
 * Fetch et refresh les utilisateurs
 */
const get_users = () => fetch(USER_URL)
    .then(res => res.json())
    .then(json => {
      userslen = json.length;
      last_id = json[json.length-1].id;
      refreshTable(json,page);
    });

/**
 * Rafraishir le tableau de la page web
 * @param {User[]} users le tableau de la base de donnée
 */
const refreshTable = (user,startid) => {
  // On vide le tableau 
  table.innerHTML = "";
  let split = 10;
  // Boucle pour recuperer tout les utilisateur
  for (let i=startid*split;i<split*(startid+1); i++) {
      
      
        let row = document.createElement("tr");
        row.id = "user-" + user.id;
        row.innerHTML = `
        <td>${user[i].first}</td>
        <td>${user[i].last}</td>
        <td>${user[i].email}</td>
        <td>${user[i].company}</td>
        <td>${user[i].country}</td>
        <td><img onclick="start_edit(${user[i].id})" src="edit.svg"/></td>
        <td><img onclick="delete_user(${user[i].id})" src="delete.svg"/></td>
        `;

        // Ajout 
        table.appendChild(row);
  }
};

/**
 * Pagination de nos données
 */
const changePage = (param) =>{
  if(param == 'next' && page < parseInt(userslen/10))
    page++;
  if(param == 'prev' && page > 0)
    page--;
  if(param == 'first')
    page = 0;
  if(param == 'last')
    page = parseInt(userslen/10);

  document.getElementById("page").innerHTML = page+1;
  get_users();
}

form.addEventListener("submit",event => {
  let rawdata = new FormData(form);
  let data = {};

  rawdata.forEach((value, key) =>{
    // Mauvaise info donnéé 
    if(value.match(user_checker[key]) == null){
        document.getElementById("error").innerHTML = "Vérifiez les informations";
        event.preventDefault();
        return;
    }

    data[key] = value;
  });

  //Delete form
  for (let input of document.querySelectorAll("form input:not([type='submit'])")){
    input.value = "";
  }

  event.preventDefault();
  return add_user(data);

});

/**
 * Add user in database 
 * @param {User} user 
 */
const add_user = user => fetch(USER_URL,{
    method: "post",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
}).then(get_users);

/**
 * Initialize user edit
 * @param {number} id The user's id
 */
const start_edit = id => {
  let row = document.getElementById("user-" + id);
  let row_data = row.children;

  current_user = {id: id};

  for (let i = 0 ; i < keys.length ; i++) {
      current_user[keys[i]] = row_data[i].innerHTML;
      row_data[i].innerHTML = `<input type="text" value="${current_user[keys[i]]}">`;
  }

  row_data[5].innerHTML = `<img onclick="edit_user()" src="done.svg"/>`;
  row_data[6].innerHTML = `<img onclick="cancel_edit()" src="close.svg"/>`;

};

/**
 * Cancel the user edit by retrieving html
 */
const cancel_edit = () => {
  let row = document.getElementById("user-" + current_user.id);
  let row_data = row.children;

  for (let i = 0 ; i < keys.length ; i++) {
      row_data[i].innerHTML = current_user[keys[i]];
  }

  row_data[5].innerHTML = `<img onclick="start_edit(${current_user.id})" src="edit.svg"/>`;
  row_data[6].innerHTML = `<img onclick="delete_user(${current_user.id})" src="delete.svg"/>`;
};

const edit_user = () =>{
  // Get form info
  let new_user = {};
  let row = document.getElementById("user-" + current_user.id);
  let row_data = row.children;

  for(let i = 0; i < keys.length; i++){
      // Check info
      if(row_data[i].firstChild.value.match(user_checker[keys[i]]) == null){
          alert("verifiez les informations");
          return cancel_edit();
      }
      new_user[keys[i]] = row_data[i].firstChild.value;
  }
  fetch(USER_URL,{
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: current_user.id,
      to_edit: new_user
    })
  }).then(get_users);
};

/**
 * Delete
 * @param {number} id t
 */

const delete_user = id => {
  fetch(USER_URL,{
    method: "delete",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id:id
    })
  }).then(get_users);
};

get_users();