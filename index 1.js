var increment=1;
function calculateTotals() {
  var subT = parseFloat(document.getElementById('unitP1').value) || 0; 
  var tax = parseFloat(document.getElementById('tax').value) || 0; 
  var discount = parseFloat(document.getElementById('discount').value) || 0; 

  document.getElementById('subtotal').value = subT.toFixed(2);
  document.getElementById('total').value = (subT + tax - discount).toFixed(2);
}

//var inc = document.getElementById("inc").value;
//var increment = parseInt(inc);
function addRow() {
  var table = document.getElementById("myTable");
  var row = table.insertRow(table.rows.length); 
  increment += 1;
  document.getElementById("inc").value = increment;
  var cells = [];
  for (var i = 0; i < 6; i++) {
    cells[i] = row.insertCell(i);
  }
  
  cells[0].innerHTML = `<input type='text' id='sqNo${increment}' style='width: 60px;' name='sqNo${increment}' style='border:none;' value='${increment}'>`;
  cells[1].innerHTML = `<input type='text' id='discription${increment}' name='discription${increment}' value=' Projecting - Context menu for invoices list'>`;
  cells[2].innerHTML = `<input type='text' id='quantaty${increment}' style='width: 60px;' name='quantaty${increment}' style='border:none;' value='x1.0'>`;
  cells[3].innerHTML = `<input type='text' id='hours${increment}' style='width: 60px;' name='hours${increment}' value='hours'>`;
  cells[4].innerHTML = `<input type='text' id='unitP${increment}' style='width: 60px;' name='unitP${increment}' onchange='totalAmount()' value='50.00'>`;
  cells[5].innerHTML = `<input type='text' id='totalP${increment}' style='width: 60px;' name='totalP${increment}' disabled value='50.00'>`;

  totalAmount();
}

function removeRow() {
  var table = document.getElementById("myTable");
 
  var len = table.rows.length - 1;

  if (table.rows.length > 2) {
    var existingTotal = parseFloat(document.getElementById("total").value);
    var unitP = parseFloat(document.getElementById("unitP" + len).value);
    var exiSubTo = parseFloat(document.getElementById("subtotal").value);

    var exiSubTot = exiSubTo - unitP;
    var presentTotal = existingTotal - unitP;
   
 document.getElementById('total').value = presentTotal.toFixed(2);
 document.getElementById('subtotal').value = exiSubTot.toFixed(2);
 increment -= 1;

    document.getElementById("inc").value = increment;
    table.deleteRow(len);
  } else {
    alert("Cannot remove the last row.");
  }
}


function totalAmount() {
  var table = document.getElementById("myTable");
 var len = table.rows.length - 1;
  var subTotal = 0;

  for (i = 1; i <= len; i++) {
    var idElement = document.getElementById("unitP" + i);
    if (idElement && idElement.value) {
      var id = parseFloat(idElement.value);
      subTotal += id;
      document.getElementById("subtotal").value = subTotal.toFixed(2);
      document.getElementById("totalP" + i).value = id.toFixed(2);
  }else{
    console.error("Element not found for id: " + "unitP" + i);
  }
}
var tax = parseFloat(document.getElementById('tax').value) || 0;
  var discount = parseFloat(document.getElementById('discount').value) || 0;
  var total = subTotal + tax - discount;
  document.getElementById('total').value = total.toFixed(2);
}

const filePath = 'products.json';
fetch(filePath)
.then(response => response.json()) 
  .then(data => {
    populateTable(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation');
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
  });
function handleFileInputChange(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const jsonData = JSON.parse(e.target.result);
        populateTable(jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  }
}

function populateTable(data) {
  var tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';
  var subTotal = 0;
  if (Array.isArray(data.invoiceItems) && data.invoiceItems.length > 0) {
    var item = data.invoiceItems[0];
    var row = tableBody.insertRow(0);
   // data.invoiceItems.forEach((item, index) => {
    //  var row = tableBody.insertRow(index);
    row.innerHTML = `
    <td><input type="text" id="sqNo1" style="width: 60px;" name="sqNo1" style="border:none;" value="${item.sqNo}"></td>
    <td><input type="text" id="description1" name="description1" value="${item.description}"></td>
    <td><input type="text" id="quantity1" style="width: 60px;" name="quantity1" style="border:none;" value="${item.quantity}"></td>
    <td><input type="text" id="units1" style="width: 60px;" name="units1" value="${item.units}"></td>
    <td><input type="text" id="unitP1" style="width: 60px;" name="unitP1" onChange="totalAmount()" value="${item.unitPrice.toFixed(2)}"></td>
    <td><input type="text" id="totalP1" style="width: 60px;" name="totalP1" disabled value="${item.total.toFixed(2)}"></td>
  `;
  var totalRow = document.getElementById('totalP1');
  totalRow.value = item.unitPrice;
  
        subTotal += parseFloat(item.unitPrice);
  
}else {
addRow();
subTotal = parseFloat(document.getElementById(`unitP${increment}`).value) || 0;

}
document.getElementById("subtotal").value = subTotal.toFixed(2);
totalAmount();
}




