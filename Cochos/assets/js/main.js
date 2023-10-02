
const nameInput = document.getElementById("name-input");
const timeInput= document.getElementById("time-input");
const quantInput= document.getElementById("quant-input");
const confirmBtn = document.getElementById("confirm-btn");
const tableBody = document.getElementById("table-body");
const updateNameInput = document.getElementById("update-name-input");
const updateTimeInput = document.getElementById("update-time-input");
const updateQuantInput = document.getElementById("update-quant-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUserId = null;

function renderTable() {
    tableBody.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const tr = document.createElement("tr");
        const idTd = document.createElement("td");
        const nameTd = document.createElement("td");
        const timeTd = document.createElement("td");
        const quantTd = document.createElement("td");
        const actionsTd = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        idTd.innerText = user.id;
        nameTd.innerText = user.name;
        timeTd.innerText = user.time;
        quantTd.innerText = user.quant;
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        editBtn.addEventListener("click", () => {
            showUpdateForm(user.id);
        });
        deleteBtn.addEventListener("click", () =>{
            deleteUser(user.id);
        });
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(idTd);
        tr.appendChild(nameTd);
        tr.appendChild(timeTd);
        tr.appendChild(quantTd);
        tr.appendChild(actionsTd);
        tableBody.appendChild(tr);
    }
}

function addUser(){
    const name = nameInput.value.trim();
    const time = timeInput.value.trim();
    const quant = quantInput.value.trim();

    if(name && time && quant != null){
        var id = 1;
        var val = users.map(function(x){return x.id; }).indexOf(id);
        while(val != -1){
            id++;
            val = users.map(function(x){return x.id; }).indexOf(id);
        }

        const user = {
            id: id,
            name: name,
            time: time,
            quant: quant,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        nameInput.value="";
        timeInput.value="";
        quantInput.value="";
        renderTable();
    } else {
        alert ("Informe os campos corretamente!")
    }

   
}

function addStock(){
  const stockName = stockNameInput.value.trim();
  const stockQuant = stockQuantInput.value.trim();

  if(stockName && stockQuant != null){
      var id = 1;
      var val = users.map(function(x){return x.id; }).indexOf(id);
      while(val != -1){
          id++;
          val = users.map(function(x){return x.id; }).indexOf(id);
      }

      const user = {
          id: id,
          stockName: stockName,
          stockQuant: stockQuant,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      stockNameInput.value="";
      stockQuantInput.value="";
      renderTable();
  } else {
      alert ("Informe os campos corretamente!")
  }

 
}

function updateUser() {
    const name = updateNameInput.value;
    const time = updateTimeInput.value;
    const quant = updateQuantInput.value;
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].name = name;
      users[index].time = time;
      users[index].quant = quant;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
}

function showUpdateForm(userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
        updateNameInput.value = user.name;
        updateTimeInput.value = user.time;
        updateQuantInput.value = user.quant;
        currentUserId = user.id;
        updateBtn.addEventListener("click", updateUser);
        cancelBtn.addEventListener("click", hideUpdateForm);
        updateBtn.style.display = "incline-block";
        cancelBtn.style.display = "incline-block";
        updateNameInput.style.display = "inline-block";
        updateCpfInput.style.display = "inline-block";
        updateCnhInput.style.display = "inline-block";
        document.getElementById("update-container").style.display = "block";
    }
}

function hideUpdateForm() {
    updateNameInput.value = "";
    updateTimeInput.value = "";
    updateQuantInput.value = "";
    currentUserId = null;
    updateBtn.removeEventListener("click", updateUser);
    cancelBtn.removeEventListener("click", hideUpdateForm);
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
    updateNameInput.style.display = "none";
    updateTimeInput.style.display = "none";
    updateQuantInput.style.display = "none";
    document.getElementById("update-container").style.display = "none";
  }

  function deleteUser(userId) {
    users = users.filter((user) => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(users));
    if (users.length == 0){
      hideUpdateForm();
    };
    renderTable();
  }

  confirmBtn.addEventListener("click", addUser);

  renderTable();