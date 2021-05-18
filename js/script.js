var mainApp = {};
(function () {
  var firebase = app_firebase;
  var uid = null;

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.id;
    } else {
      //redirect to login page
      window.location.replace("login.html");
    }
  });
  function logOut() {
    firebase.auth().signOut();
  }
  function messageHandler(err) {
    if (!!err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  }

  function fnCreate() {
    var path = "users/" + uid;
    var data = {
      name: "TAnvi",
      age: 20,
      message: "Hello Firebase"
    };
    app_firebase.databaseApi.create(path, data, messageHandler);
  }

  mainApp.logOut = logOut;
})();

/*----------------DOM Elements-----------------*/
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let numPages = document.querySelector("#numPages");
let status = document.querySelector("#status");
let addBook = document.querySelector("#addBook");
let modal = document.querySelector(".modal");
let table = document.querySelector("#list");
let listdiv = document.querySelector(".list");
let deletebtn = document.querySelector(".delbtn");
let statusbtn = document.querySelector(".statusbtn");
let email;
let myLibrary = [];

/*-----------------Function constructor---------------------*/
function Book(title, author, numPages, status) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.readStatus = status === "true" ? "Read" : " Not Read";
}

/*--------------------------Functions---------------------------- */
function addBookToLibrary(title, author, numPages, status) {
  const newBook = new Book(title, author, numPages, status);
  myLibrary.push(newBook);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    table.insertAdjacentHTML(
      "beforeend",
      `
   <tr class="Book">
   <td>${myLibrary[i].title}</td>
   <td>${myLibrary[i].author}</td>
   <td>${myLibrary[i].numPages}</td>
   <td><button class="statusbtn">${myLibrary[i].readStatus}</button></td>
   <td><button class="delbtn">Delete</button></td>
   </tr>
   `
    );
  }
}
function updateTable() {
  //Updating UI
  let rows = document.querySelectorAll(".Book");
  for (let i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
  displayBooks();
}
function toggleStatus(row) {
  let stsTitle = row.firstChild.nextElementSibling.innerHTML;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == stsTitle) {
      myLibrary[i].readStatus =
        myLibrary[i].readStatus == "Read" ? "Not Read" : "Read";
    }
  }
  updateTable();
}
function deleteBook(row) {
  let deltitle = row.firstChild.nextElementSibling.innerHTML;
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == deltitle) {
      myLibrary.splice(i, 1);
    }
  }
  updateTable();
}
/*-----------------------EVENT LISTENERS-------------------------*/
/* window.addEventListener("load", () => {
  let emailID = prompt("Enter Your Email ID");
}); */
addBook.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value == "") {
    alert("Title cannot be empty");
  } else if (author.value == "") {
    alert("Author field is empty");
  } else if (!parseInt(numPages.value)) {
    alert("Invalid Number of Pages ");
  } else {
    addBookToLibrary(
      title.value,
      author.value,
      parseInt(numPages.value),
      status.value
    );
    updateTable();
  }
});

//Delete Book
listdiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("delbtn")) {
    //Delete that book
    let row = e.target.parentNode.parentNode;
    deleteBook(row);
  }
});
listdiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("statusbtn")) {
    toggleStatus(e.target.parentNode.parentNode);
  }
});

////////////////////////////////////////////////////////////////////////////////////
addBookToLibrary("Wings Of Fire", "A. P. J. Abdul Kalam", 228, "Not Read");
updateTable();
