var inc = document.getElementById("inc").value;
var increment = parseInt(inc);
let search_terms = [];
document.addEventListener('DOMContentLoaded', fetchData);
let jsonData;

function fetchData() {
  fetch('products123.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      search_terms = jsonData.map(item => item.description.toLowerCase());
      populateTable();
    })
    .catch(error => console.log('Error fetching data:', error));
}

function populateTable() {
  increment += 1;
  document.getElementById("inc").value = increment;
  const tableBody = document.querySelector('#myTable tbody');
  tableBody.innerHTML = '';
  for (i = 1; i < increment; i++) {
    const record = jsonData.find(item => item.sqNo === i)
    if (record) {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      idCell.textContent = record.sqNo;
      row.appendChild(idCell);

      const nameCell = document.createElement('td');
      nameCell.textContent = record.description;
      row.appendChild(nameCell);

      const tagCell = document.createElement('td');
      tagCell.textContent = record.quantity;
      row.appendChild(tagCell);

      const idCell1 = document.createElement('td');
      idCell1.textContent = record.units;
      row.appendChild(idCell1);

      const nameCell1 = document.createElement('td');
      nameCell1.textContent = record.unitPrice;
      row.appendChild(nameCell1);

      const tagCell1 = document.createElement('td');
      tagCell1.textContent = record.total;
      row.appendChild(tagCell1);

      tableBody.appendChild(row);

    } else {
      console.log('Record not found for sqNo:', i);
    }
  }
  totalAmount();

}
function removeRow() {
  var table = document.getElementById("myTable");
  var len = table.rows.length;
  if (len > 1) {
    var lastRow = table.rows[len - 1];
    if (len > 2) {
      const record = jsonData.find(i => i.sqNo === parseInt(lastRow.cells[0].textContent));
      if (record) {
        var existingTotal = document.getElementById("total").value;
        var exiSubTo = document.getElementById("subtotal").value;
        var exiSubTot = parseInt(exiSubTo) - parseInt(record.total);
        var presentTotal = parseInt(existingTotal) - parseInt(record.total);
        document.getElementById('total').value = presentTotal;
        document.getElementById('subtotal').value = exiSubTot;
        increment -= 1;
        document.getElementById("inc").value = increment;
        table.deleteRow(len - 1);
      } else {
        console.log('Record not found for sqNo:', increment - 1);
      }
    } else {
      alert("Cannot remove the row.");
    }
  } else {
    alert("Cannot remove the last row.");

  }
}
function totalAmount() {
  var tax = parseFloat(document.getElementById('tax').value) || 0;
  var discount = parseFloat(document.getElementById('discount').value) || 0;
  var subTotal = 0, total = 0;
  for (i = 1; i < increment; i++) {
    const record = jsonData.find(item => item.sqNo === i)
    if (record) {
      subTotal += parseFloat(record.total) || 0;
    } else {
      console.log('Record not found for sqNo:', i);
    }
    
  }
  document.getElementById("subtotal").value = subTotal;
    total = parseInt(subTotal) + parseInt(tax) - parseInt(discount);
    document.getElementById("total").value = total;
}


function calculateTotals(records){
  var tax = parseFloat(document.getElementById('tax').value) || 0;
  var discount = parseFloat(document.getElementById('discount').value) || 0;
  var subTotal = 0, total = 0;
  records.forEach(record=>{
    if (record) {
      subTotal += parseFloat(record.total) || 0;
    } else {
      console.log('Record not found for sqNo:', i);
    }  });
  document.getElementById("subtotal").value = subTotal;
    total = parseInt(subTotal) + parseInt(tax) - parseInt(discount);
    document.getElementById("total").value = total;
}

function autocompleteMatch(input) {
  console.log('Input:', input);
  if (input === '') {
    return [];
  }
  var reg = new RegExp('^' + input, 'i');
 return search_terms.filter(term => term.match(reg))
}

function showResults(val) {
  console.log('Value:', val);
  const res = document.getElementById("result");
  res.innerHTML = '';
  let list = '';
  let terms = autocompleteMatch(val);
  const tableBody = document.querySelector('#myTable tbody');
tableBody.innerHTML = '';
if (val.trim() === '') {
  // Display the first record as default
  const firstRecord = jsonData[0];
  const firstRow = document.createElement('tr');
  const firstIdCell = document.createElement('td');
  firstIdCell.textContent = firstRecord.sqNo;
  firstRow.appendChild(firstIdCell);

  const firstNameCell = document.createElement('td');
  firstNameCell.textContent = firstRecord.description;
  firstRow.appendChild(firstNameCell);

  const firstTagCell = document.createElement('td');
  firstTagCell.textContent = firstRecord.quantity;
  firstRow.appendChild(firstTagCell);

  const firstIdCell1 = document.createElement('td');
  firstIdCell1.textContent = firstRecord.units;
  firstRow.appendChild(firstIdCell1);

  const firstNameCell1 = document.createElement('td');
  firstNameCell1.textContent = firstRecord.unitPrice;
  firstRow.appendChild(firstNameCell1);

  const firstTagCell1 = document.createElement('td');
  firstTagCell1.textContent = firstRecord.total;
  firstRow.appendChild(firstTagCell1);

  tableBody.appendChild(firstRow);
  totalAmount();
  terms = [];
} else {
  var reg = new RegExp('^' + val, 'i');
  terms = autocompleteMatch(val);
}
   let matchingRecordsFound = false;
  if (terms.length > 0 && increment > 1) {
 const matchingRecords = [];
    terms.forEach(term => {
      const record = jsonData.find(item => item.description.toLowerCase() === term);
      if (record) {
       // matchingRecordsFound = true;
matchingRecords.push(record);
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = record.sqNo;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = record.description;
        row.appendChild(nameCell);

        const tagCell = document.createElement('td');
        tagCell.textContent = record.quantity;
        row.appendChild(tagCell);

        const idCell1 = document.createElement('td');
        idCell1.textContent = record.units;
        row.appendChild(idCell1);

        const nameCell1 = document.createElement('td');
        nameCell1.textContent = record.unitPrice;
        row.appendChild(nameCell1);

        const tagCell1 = document.createElement('td');
        tagCell1.textContent = record.total;
        row.appendChild(tagCell1);

        tableBody.appendChild(row);
      }
     
    });
    calculateTotals(matchingRecords);
    matchingRecordsFound = matchingRecords.length > 0;
  }
    if (!matchingRecordsFound && val.trim() !=='') {
    alert('No matching terms found.');
    // Display the first record in the table when there are no matching terms
    const firstRecord = jsonData[0];
    const firstRow = document.createElement('tr');
    const firstIdCell = document.createElement('td');
    firstIdCell.textContent = firstRecord.sqNo;
    firstRow.appendChild(firstIdCell);

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = firstRecord.description;
    firstRow.appendChild(firstNameCell);

    const firstTagCell = document.createElement('td');
    firstTagCell.textContent = firstRecord.quantity;
    firstRow.appendChild(firstTagCell);

    const firstIdCell1 = document.createElement('td');
    firstIdCell1.textContent = firstRecord.units;
    firstRow.appendChild(firstIdCell1);

    const firstNameCell1 = document.createElement('td');
    firstNameCell1.textContent = firstRecord.unitPrice;
    firstRow.appendChild(firstNameCell1);

    const firstTagCell1 = document.createElement('td');
    firstTagCell1.textContent = firstRecord.total;
    firstRow.appendChild(firstTagCell1);

    tableBody.appendChild(firstRow);
  }
 
  }

 