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




// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    // console.log(grocery.value);
    const value = grocery.value;
    
    const id = new Date().getTime().toString(); // gives us a unique id for this little project (~not best practice otherwise)
    // console.log(id);

    if (value && !editFlag){
        // console.log("add item to the list");
        const element = document.createElement("article");
        // add class
        element.classList.add("grocery-item");
        // add id 
        const attr = document.createAttribute("data-id");           // didn't fully understand below here but works!
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
        // append child
        list.appendChild(element);
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
        console.log("editing");
    }
    else{
        // console.log("empty value");
        // alert.textContent = "empty value";      // not a pop up, but banner-style
        // alert.classList.add("alert-danger");
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

// set back to default (most are extras for now, will need later!)
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
        displayAlert("items deleted", "danger");
        setBackToDefault();
        // localStorage.removeItem("list");
    }
};



// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    console.log("add to local storage:" + value);
};

// ****** SETUP ITEMS **********
