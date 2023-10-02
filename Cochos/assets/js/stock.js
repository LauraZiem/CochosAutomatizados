
const stockNameInput = document.getElementById("stock-name-input");
const stockQuantInput= document.getElementById("stock-quant-input");
const confirmBtn = document.getElementById("confirm-btn");
const tableBody = document.getElementById("table-body");
const updateStockNameInput = document.getElementById("update-name-input");
const updateStockQuantInput = document.getElementById("update-quant-input");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let stocks = JSON.parse(localStorage.getItem("users")) || [];
let currentStockId = null;

function renderTable() {
    tableBody.innerHTML = "";
    for (let i = 0; i < stocks.length; i++) {
        const stock = stocks[i];
        const tr = document.createElement("tr");
        const idTd = document.createElement("td");
        const stockNameTd = document.createElement("td");
        const stockQuantTd = document.createElement("td");
        const actionsTd = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        idTd.innerText = stock.id;
        stockNameTd.innerText = stock.stockName;
        stockQuantTd.innerText = stock.stockQuant;
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        editBtn.addEventListener("click", () => {
            showUpdateForm(stock.id);
        });
        deleteBtn.addEventListener("click", () =>{
            deleteStock(stock.id);
        });
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(idTd);
        tr.appendChild(stockNameTd);
        tr.appendChild(stockQuantTd);
        tr.appendChild(actionsTd);
        tableBody.appendChild(tr);
    }
}


function addStock(){
  const stockName = stockNameInput.value.trim();
  const stockQuant = stockQuantInput.value.trim();

  if(stockName && stockQuant != null){
      var id = 1;
      var val = stocks.map(function(x){return x.id; }).indexOf(id);
      while(val != -1){
          id++;
          val = stocks.map(function(x){return x.id; }).indexOf(id);
      }

      const stock = {
          id: id,
          stockName: stockName,
          stockQuant: stockQuant,
      };
      stocks.push(stock);
      localStorage.setItem("stocks", JSON.stringify(stocks));
      stockNameInput.value="";
      stockQuantInput.value="";
      renderTable();
  } else {
      alert ("Informe os campos corretamente!")
  }

 
}

function updateStock() {
    const stockName = updateNameInput.value;
    const stockQuant = updateQuantInput.value;
    const index = stocks.findIndex((stock) => stock.id === currentStockId);
    if (index !== -1) {
      stocks[index].stockName = stockName;
      stocks[index].stockQuant = stockQuant;
      localStorage.setItem("stocks", JSON.stringify(stocks));
      hideUpdateForm();
      renderTable();
    }
}

function showUpdateForm(stockId) {
    const stock = stocks.find((stock) => stock.id === stockId);
    if (stock) {
        updateStockNameInput.value = stock.name;
        updateStockQuantInput.value = stock.quant;
        currentStockId = stock.id;
        updateBtn.addEventListener("click", updateStock);
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
    updateStockNameInput.value = "";
    updateStockQuantInput.value = "";
    currentStockId = null;
    updateBtn.removeEventListener("click", updateStock);
    cancelBtn.removeEventListener("click", hideUpdateForm);
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
    updateStockNameInput.style.display = "none";
    updateStockQuantInput.style.display = "none";
    document.getElementById("update-container").style.display = "none";
  }

  function deleteStock(stockId) {
    stocks = stocks.filter((stock) => stock.id !== stockId);
    localStorage.setItem("stocks", JSON.stringify(stocks));
    if (stocks.length == 0){
      hideUpdateForm();
    };
    renderTable();
  }

  confirmBtn.addEventListener("click", addStock);

  renderTable();