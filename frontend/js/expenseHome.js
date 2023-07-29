async function saveToServer(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const desc = event.target.description.value;
    const category = event.target.category.value;

    const obj = {
      amount,
      desc,
      category
    };

    try {
      console.log(obj,"postdataobj")
      const response = await axios.post("http://localhost:3000/expense/addExpense", obj);
      console.log(response.data);
      showUserOnScreen(response.data);
    } catch (err) {
      document.body.innerHTML += "<h4>Something went wrong</h4>";
      console.log(err);
    }
  }

  async function removeItemFromServer(id) {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:3000/expense/deleteExpense${id}`);  
      console.log(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  document.getElementById("expenseForm").addEventListener("submit", saveToServer);

  async function showItemsFromServer() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/expense/getexpenses', {Headers: {"Authorization":token}});
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showUserOnScreen(obj) {
    const parentElem = document.getElementById('listOfItems');
    const childElem = document.createElement('li');
    childElem.style.marginTop = '10px';
    childElem.innerHTML = ` ${obj.price} - ${obj.name}-${obj.category} `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Product';
    deleteButton.style.marginLeft = '10px';
    deleteButton.onclick = () => {
      console.log(obj);
      removeItemFromServer(obj.id);
      parentElem.removeChild(childElem);
    };
    childElem.appendChild(deleteButton);
    parentElem.appendChild(childElem);
  }
  


  window.addEventListener("DOMContentLoaded", showItemsFromServer);
