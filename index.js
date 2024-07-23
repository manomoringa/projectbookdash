const bookList = document.getElementById("book-list");
const BASE_URL = "http://localhost:8001/store";


// Function to fetch and display all books
async function getAllBooks() {
 const response = await fetch(`${BASE_URL}`);
 console.log(response);


 if (response.ok) {
   const books = await response.json();
   bookList.innerHTML = ""; // Clear existing books
   books.forEach((book) => {
     const bookCard = document.createElement("div");
     bookCard.classList.add("book-card");
     bookCard.innerHTML = `
               <h2>${book.title}</h2>
               <p>${book.description}</p>
               <p class="price">${book.price}</p>
               <button onclick="showEditForm(${book.id}, '${book.title}', '${book.description}', '${book.price}')">Edit</button>
               <button onclick="deleteBook(${book.id})">Delete</button>
           `;
     bookList.appendChild(bookCard);
   });
 }
}


// Function to add a new book
async function addBook(book) {
 const response = await fetch(`${BASE_URL}`, {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(book),
 });


 if (response.ok) {
   getAllBooks(); // Refresh the book list
 } else {
   console.error("Failed to add book");
 }
}


// Function to show the edit form
function showEditForm(id, title, description, price) {
 document.getElementById("edit-id").value = id;
 document.getElementById("edit-title").value = title;
 document.getElementById("edit-description").value = description;
 document.getElementById("edit-price").value = price;
 document.getElementById("edit-book-form").style.display = "block";
}


// Function to update a book
async function editBook(event) {
 event.preventDefault();


 const id = document.getElementById("edit-id").value;
 const title = document.getElementById("edit-title").value;
 const description = document.getElementById("edit-description").value;
 const price = document.getElementById("edit-price").value;


 if (id && title && description && price) {
   const book = {
     title,
     description,
     price,
   };


   const response = await fetch(`${BASE_URL}/${id}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(book),
   });


   if (response.ok) {
     getAllBooks(); // Refresh the book list
     document.getElementById("edit-book-form").style.display = "none";
   } else {
     console.error("Failed to update book");
   }
 }
}


// Function to delete a book
async function deleteBook(id) {
 const response = await fetch(`${BASE_URL}/${id}`, {
   method: "DELETE",
 });


 if (response.ok) {
   getAllBooks(); // Refresh the book list
 } else {
   console.error("Failed to delete book");
 }
}


// Event listener to handle book addition
document
 .getElementById("add-book-form")
 .addEventListener("submit", function (event) {
   event.preventDefault();


   const title = document.getElementById("title").value;
   const description = document.getElementById("description").value;
   const price = document.getElementById("price").value;


   if (title && description && price) {
     const newBook = {
       title,
       description,
       price,
     };


     addBook(newBook);
   }
 });


// Event listener to handle book editing
document.getElementById("edit-book-form").addEventListener("submit", editBook);


// Initial fetch to display all books
getAllBooks();



