var inc = document.getElementById("inc").value;
var increment = parseInt(inc);
let search_terms = [];
let jsonData;
document.addEventListener('DOMContentLoaded', function () {
  fetchData();
  //populateTable();
  document.getElementById("tax").addEventListener('input', totalAmount);
  document.getElementById("discount").addEventListener('input', totalAmount);

});

function removeRow() {
  var table = document.getElementById("myTable");
  var len = table.rows.length;
  if (len > 1) {
    var lastRow = table.rows[len - 1];

    var total = parseFloat(lastRow.cells[5].querySelector('input').value) || 0;
    if (len > 2) {
     // Update the totals
     var existingTotal = parseFloat(document.getElementById("total").value);
     var exiSubTo = parseFloat(document.getElementById("subtotal").value);
     var exiSubTot = exiSubTo - total; 
     var presentTotal = parseInt(existingTotal) - parseInt(total);
        var presentTotal = existingTotal-total;
            // Update the input fields
        document.getElementById('total').value = presentTotal;
        document.getElementById('subtotal').value = exiSubTot;
        increment -= 1;
        document.getElementById("inc").value = increment;
        table.deleteRow(len - 1);
      
  
  } else {
    alert("Cannot remove the last row.");

  }
}else{
  alert("Cannot remove the last row.");
}
  totalAmount();
}

function fetchData() {
  fetch('products123.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      search_terms = jsonData.map(item => item.description.toLowerCase());
      populateTable();
      console.log(jsonData);
    })
    .catch(error => console.log('Error fetching data:', error));
}

function addRow(sqNo, description, quantity, units, unitPrice, total) {
  const tableBody = document.querySelector('#myTable tbody');
  const row = document.createElement('tr');
  const idCell = document.createElement('td');
  idCell.textContent = sqNo;
  row.appendChild(idCell);

  const nameCell = document.createElement('td');
  nameCell.textContent = description;
  row.appendChild(nameCell);

  const tagCell = document.createElement('td');
  tagCell.textContent = quantity;
  row.appendChild(tagCell);

  const idCell1 = document.createElement('td');
  idCell1.textContent = units;
  row.appendChild(idCell1);

  const nameCell1 = document.createElement('td');
  nameCell1.textContent = unitPrice;
  row.appendChild(nameCell1);

  const tagCell1 = document.createElement('td');
  tagCell1.textContent = total;
  row.appendChild(tagCell1);
  tableBody.appendChild(row);
}

function populateTable() {
  const tableBody = document.querySelector('#myTable tbody');
  increment = tableBody.children.length + 1;
  document.getElementById("inc").value = increment;
  const currentRow = tableBody.lastElementChild;
  if (currentRow) {
    const nameInput = currentRow.cells[1].querySelector('input');
    const quantityInput = currentRow.cells[2].querySelector('input');
    const unitInput = currentRow.cells[3].querySelector('input');
    const unitPriceInput = currentRow.cells[4].querySelector('input');
    const totalInput = currentRow.cells[5].querySelector('input');

    if (!nameInput.value || !quantityInput.value || !unitInput.value || !unitPriceInput.value || !totalInput.value) {
      alert("Please complete the current row before adding a new one.");
      return;
    }
  }

  const sqNo = increment;
  const row = document.createElement('tr');

  const idCell = document.createElement('td');
  idCell.textContent = sqNo;
  row.appendChild(idCell);

  const nameCell = document.createElement('td');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Enter Description';
  nameInput.autocomplete='off';
 // nameInput.classList.add('autocomplete-input');
  const autocompleteList = document.createElement('ul');
      autocompleteList.className = 'autocomplete-list';
   
      console.log(nameInput);
  if (jsonData && jsonData.length > 0 && increment===1) {
    nameInput.value = jsonData[0].description;  
  }
  nameCell.appendChild(nameInput);
  row.appendChild(nameCell);

  $(nameInput).autocomplete({
    source: function(request, response){
const searcTerm = request.term.toLowerCase();
const filteredData = search_terms.filter(item => item.toLowerCase().startsWith(searcTerm));
console.log(search_terms);
console.log('Search term:', searcTerm); // Check the search term being used
console.log('Filtered data:', filteredData);
response(filteredData);    
},
    select: function(event, ui){
      nameInput.value = ui.item.value;
      console.log(ui.item.value);
      updateUnitPrice(this, row);
    //  updateTotal.call(nameInput);
    }
  })

  const tagCell = document.createElement('td');
  const tagInput = document.createElement('input');
  tagInput.type = 'text';
  tagInput.placeholder = 'Enter quantity';
  tagInput.value = '1';
  tagInput.style.width = '100px'
  tagCell.appendChild(tagInput);
  row.appendChild(tagCell);

  const idCell1 = document.createElement('td');
  const idInput = document.createElement('input');
  idInput.type = 'text';
  idInput.placeholder = 'Enter units';
  idInput.style.width = '100px'
  idCell1.appendChild(idInput);
  row.appendChild(idCell1);

  const nameCell1 = document.createElement('td');
  const nameInput1 = document.createElement('input');
  nameInput1.type = 'text';
  nameInput1.placeholder = 'Enter Unit price';
  nameInput1.style.width = '100px'
  nameCell1.appendChild(nameInput1);
  row.appendChild(nameCell1);

  const tagCell1 = document.createElement('td');
  const tagInput1 = document.createElement('input');
  tagInput1.type = 'text';
  tagInput1.style.width = '100px'
  tagInput1.placeholder = 'Enter total';
  tagCell1.appendChild(tagInput1);
  row.appendChild(tagCell1);

  tagInput.addEventListener('input', updateTotal);
  nameInput1.addEventListener('input', updateTotal);

  tableBody.appendChild(row);
  totalAmount();
  updateUnitPrice(nameInput, row);
  

}
function initializeInputField(row, cellIndex, type, placeholder, defaultValue = '') {
  const cell = document.createElement('td');
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.value = defaultValue;
  cell.appendChild(input);
  row.appendChild(cell);
}
function updateUnitPrice(nameInput, row) {
  const selectedDescription = nameInput.value.toLowerCase();
  const selectedRecord = jsonData.find(item => item.description.toLowerCase() === selectedDescription);
  console.log('Selected Description:', selectedDescription);

  if (selectedRecord) {
    const unitPrice = parseFloat(selectedRecord.unitPrice) || 0;
    row.cells[4].querySelector('input').value = unitPrice;
    updateTotal.call(nameInput); 
  } else {
    console.log('Record not found for description:', selectedDescription);
  }
}
function updateTotal() {
  const row = this.closest('tr');
  const nameInput = row.cells[1].querySelector('input');
  const quantity = parseFloat(row.cells[2].querySelector('input').value) || 0;
  const selectedDescription = nameInput.value.toLowerCase();
  const selectedRecord = jsonData.find(item => item.description.toLowerCase() === selectedDescription);

  if (selectedRecord) {
    const unitPrice = parseFloat(selectedRecord.unitPrice) || 0;
    const total = quantity * unitPrice;

    // Update Unit Price and Total fields
    row.cells[4].querySelector('input').value = unitPrice;
    row.cells[5].querySelector('input').value = total;
    totalAmount();
  } else {
    // Handle the case where the selected description is not found
    console.log('Record not found for description:', selectedDescription);
  }
}
  
function totalAmount() {
  var taxPercentage = 18;
  var discountPercentage = 10;
  var subTotal = 0, total = 0;
  const table = document.getElementById('myTable');
  
  for (i = 1; i < table.rows.length; i++) {
    const totalValue = parseFloat(table.rows[i].cells[5].querySelector('input').value) || 0;
    subTotal += totalValue;
  }
  var tax = (subTotal * taxPercentage) / 100;
  var discount = (subTotal * discountPercentage) / 100

  total = subTotal + tax - discount;
  subTotal = subTotal.toFixed(2);
  tax = tax.toFixed(2);
  discount = discount.toFixed(2);
  total = total.toFixed(2);

  document.getElementById("subtotal").value = subTotal;
  document.getElementById("tax").value = tax;
  document.getElementById("discount").value = discount;
  document.getElementById("total").value = total;

}

