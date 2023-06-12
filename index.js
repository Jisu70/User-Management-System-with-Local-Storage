function saveToLocalStorage(event) {
  event.preventDefault(); // Prevents the default form submission behavior
  const name = event.target.username.value; // Gets the value of the username input field
  const email = event.target.emailId.value; // Gets the value of the emailId input field
  const phonenumber = event.target.phonenumber.value; // Gets the value of the phonenumber input field
  const obj = {
    name,
    email,
    phonenumber,
  };

  console.log(obj); // Prints the user object to the console
  localStorage.setItem(obj.email, JSON.stringify(obj)); // Stores the user object in localStorage using email as the key
  showNewUserOnScreen(obj); // Calls a function to display the new user details on the screen
}

// This function displays the new user details on the screen
function showNewUserOnScreen(user) {
  const userList = document.getElementById("listofuser"); // Gets the <ul> element with the id "listofuser"
  const listItem = document.createElement("li"); // Creates a new <li> element
  listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone Number: ${user.phonenumber}`; // Sets the text content of the <li> element to the user details
  const editButton = document.createElement("button"); // Creates a new "Edit" button element
  editButton.textContent = "Edit"; // Sets the text content of the button to "Edit"
  editButton.addEventListener("click", () => editUserDetails(user.email)); // Adds a click event listener to the button to edit the user details
  const deleteButton = document.createElement("button"); // Creates a new "Delete" button element
  deleteButton.textContent = "Delete"; // Sets the text content of the button to "Delete"
  deleteButton.addEventListener("click", () => deleteUser(user.email)); // Adds a click event listener to the button to delete the user
  listItem.appendChild(editButton); // Appends the "Edit" button to the <li> element
  listItem.appendChild(deleteButton); // Appends the "Delete" button to the <li> element
  userList.appendChild(listItem); // Appends the <li> element to the <ul> element to display the user details on the screen
}

// // This function is called when the "Edit" button is clicked for a user
function editUserDetails(email) {
  const userDetailsString = localStorage.getItem(email); // Retrieves the user details string from localStorage using the email as the key
  const userDetailsObj = JSON.parse(userDetailsString); // Parses the user details string into an object
  const newName = prompt("Enter new name", userDetailsObj.name); // Prompts the user to enter a new name, with the current name as the default value
  const newEmail = prompt("Enter new email", userDetailsObj.email); // Prompts the user to enter a new email, with the current email as the default value
  const newPhoneNumber = prompt("Enter new phone number", userDetailsObj.phonenumber); // Prompts the user to enter a new phone number, with the current phone number as the default value
  userDetailsObj.name = newName; // Updates the name property of the user object
  userDetailsObj.email = newEmail; // Updates the email property of the user object
  userDetailsObj.phonenumber = newPhoneNumber; // Updates the phone number property of the user object
  localStorage.setItem(email, JSON.stringify(userDetailsObj)); // Updates the user details in localStorage
  refreshUserList(); // Refreshes the user list to reflect the changes
}

// // This function is called when the "Delete" button is clicked for a user
function deleteUser(email) {
  localStorage.removeItem(email); // Removes the user details from localStorage using the email as the key
  refreshUserList(); // Refreshes the user list to reflect the changes
}

// // This function refreshes the user list by retrieving all user details from localStorage and displaying them on the screen
function refreshUserList() {
  const userList = document.getElementById("listofuser"); // Gets the <ul> element with the id "listofuser"
  userList.innerHTML = ""; // Clears the existing content of the <ul> element
  const localStorageObj = localStorage; // Gets the localStorage object
  const localStorageKey = Object.keys(localStorageObj); // Gets all the keys from localStorage
  for (let i = 0; i < localStorageKey.length; i++) {
    const key = localStorageKey[i]; // Gets the current key
    const userDetailsString = localStorageObj[key]; // Retrieves the user details string from localStorage using the current key
    const userDetailsObj = JSON.parse(userDetailsString); // Parses the user details string into an object
    showNewUserOnScreen(userDetailsObj); // Calls a function to display the user details on the screen
  }
}

// This event listener is triggered when the DOM content is loaded
window.addEventListener("DOMContentLoaded", () => {
  refreshUserList(); // Refreshes the user list when the page is loaded
});
