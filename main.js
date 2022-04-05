const inputBox = document.querySelector(".input-field input");
const addBtn = document.querySelector(".input-field button");
const todolist = document.querySelector(".todolist");
const clearAll = document.querySelector(".footer button");
const pendingNum = document.querySelector(".pendingNum");

function validateData(value) {
  let valid = false;
  if (value.trim() != "") {
    valid = true;
  }
  return valid;
}
inputBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtn.click();
  }
});
addBtn.addEventListener("click", () => {
  let userData = inputBox.value;
  const isvalid = validateData(userData);
  if (!isvalid) {
    return;
  }
  let getLocalStorage = localStorage.getItem("todo");
  if (getLocalStorage == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  listArray.push(userData);
  localStorage.setItem("todo", JSON.stringify(listArray));
  showTask();
});
showTask();
function showTask() {
  let getLocalStorage = localStorage.getItem("todo");
  if (getLocalStorage == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  pendingNum.textContent = listArray.length;
  let newTag = "";
  listArray.forEach((element, index) => {
    newTag += `<li>
    ${element} <span onclick="deteleTodo(${index})";><i class="bx bxs-trash-alt"></i></span>
  </li>`;
  });
  todolist.innerHTML = newTag;
  inputBox.value = "";
}

function deteleTodo(index) {
  let getLocalStorage = localStorage.getItem("todo");
  listArray = JSON.parse(getLocalStorage);
  listArray.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(listArray));
  showTask();
}

clearAll.addEventListener("click", () => {
  listArray = [];
  localStorage.setItem("todo", JSON.stringify(listArray));
  showTask();
});
