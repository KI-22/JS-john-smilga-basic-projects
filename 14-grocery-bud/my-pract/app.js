// ****** SELECT ITEMS **********

const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");

const container = document.querySelector(".grocery-container"); // ??

const submitBtn = document.querySelector(".submit-btn");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


// edit option
let editElement;
let editFlag = false;
let editID = "";


// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);
// clear items
clearBtn.addEventListener("click", clearItems);
// load items
window.addEventListener("DOMContentLoaded", setupItems);




// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    // console.log(grocery.value);
    const value = grocery.value;
    
    const id = new Date().getTime().toString(); // gives us a unique id for this little project (~not best practice otherwise)
    // console.log(id);

    if (value && !editFlag){
        // // console.log("add item to the list");
        // const element = document.createElement("article");
        // // add class
        // element.classList.add("grocery-item");
        // // add id 
        // const attr = document.createAttribute("data-id");           // didn't fully understand below here but works!
        // attr.value = id;
        // element.setAttributeNode(attr);
        // element.innerHTML = `<p class="title">${value}</p>  
        //       <div calss="btn-container">
        //         <button type="button" class="edit-btn">
        //           <i class="fas fa-edit"></i>
        //         </button>
        //         <button type="button" class="delete-btn">
        //           <i class="fas fa-trash"></i>
        //         </button>
        //       </div>`;
        // const deleteBtn = element.querySelector(".delete-btn");
        // const editBtn = element.querySelector(".edit-btn");
        // deleteBtn.addEventListener("click", deleteItem);
        // editBtn.addEventListener("click", editItem);
        // // append child
        // list.appendChild(element);

        createListItem(id, value);

        // display alert
        displayAlert("item added", "success");
        // show container (our list items)
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id,value);
        // set back to default
        setBackToDefault();
    }
    else if (value && editFlag){
        // console.log("editing");
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else{
        // console.log("empty value");
        displayAlert("please enter value", "danger");
    };
};

// display alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    // remove alert (after given time)
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000); // milliseconds
};


// edit function
function editItem(e) {
    // console.log("edit item");
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling; // parentElement here is 'btn-container'
    // set form value
    grocery.value = editElement.innerHTML;   // will give us the element name/value (e.g. eggs, milk) in our input
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit"; // changes button text from 'submit' to 'edit'
};


// delete function
function deleteItem(e) {
    // console.log("item deleted");
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id; // ??? for removeFromLocalStorage
    list.removeChild(element);
    if (list.children.length === 0) {   // hides container if no items left after deletion
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
};


// set back to default
function setBackToDefault(){
    // console.log("set back to default");
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
};

// clear items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        items.forEach(function(item){
            list.removeChild(item);
        });
        container.classList.remove("show-container"); // no items to show but helps hide clear-btn
        displayAlert("empty list", "danger");
        setBackToDefault();
        localStorage.removeItem("list");
    }
};




// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    const grocery = {id, value};
    // let items = localStorage.getItem("list")        // this part checks whether item exists or not...
    //     ? JSON.parse(localStorage.getItem("list"))  // ...if it does, then get me that item (using Json.parse)
    //     : [];                                       // ...if it doesn't, defaults to empty array (i think)
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
    console.log(items);
};


function removeFromLocalStorage(id){
    let items = getLocalStorage();
    
    items = items.filter(function(item){    // filter out those that don't match id
        if (item.id != id) {  
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
};


function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item) {
        if (item.id === id) {  
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
};


function getLocalStorage(){
    return localStorage.getItem("list")        // this part checks whether item exists or not...
        ? JSON.parse(localStorage.getItem("list"))  // ...if it does, then get me that item (using Json.parse)
        : [];   
}


// localStorageAPI << can see on Chrome Developer window under 'Application'
// setItem
// getItem
// save as strings

// localStorage.setItem('orange', JSON.stringify(['item', 'item2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges);
// localStorage.removeItem('orange');


// ****** SETUP ITEMS **********
function setupItems(){
    let items = getLocalStorage();
    if (items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value); // as on Applicatoin is id:..., value:...
        })
    container.classList.add("show-container");
    }
};

function createListItem(id, value){
    // console.log("add item to the list");
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    // add id 
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>  
            <div calss="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
}