async function saveToServer(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const desc = event.target.description.value;

    const obj = {
      amount,
      desc
    };

    try {
      console.log(obj,"postdataobj")
      const response = await axios.post("http://localhost:3000/expense", obj);
      console.log(response.data);
      showUserOnScreen(response.data);
      calculateTotalPrice();
    } catch (err) {
      document.body.innerHTML += "<h4>Something went wrong</h4>";
      console.log(err);
    }
  }

  async function removeItemFromServer(id) {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:3000/expense/${id}`);  
      console.log(response.data);
       calculateTotalPrice(response.data); // Update total price after deletion
    } catch (error) {
      console.log(error);
    }
  }

  document.getElementById("expenseForm").addEventListener("submit", saveToServer);

  async function showItemsFromServer() {
    try {
      const response = await axios.get("http://localhost:3000/expense");
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
      calculateTotalPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function showUserOnScreen(obj) {
    const parentElem = document.getElementById('listOfItems');
    const childElem = document.createElement('li');
    childElem.style.marginTop = '10px';
    childElem.innerHTML = ` ${obj.price} - ${obj.name} `;

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
  var totalPrice = 0;
  async function calculateTotalPrice(data) {
    try {
      for (let i = 0; i < data.length; i++) {
        totalPrice += (data[i].price);
      }
      console.log(totalPrice,"totalPrice");
      const totalElem = document.getElementById('totalPrice');
      totalElem.textContent = `Total Price: $${totalPrice}`;
    } catch (error) {
      console.log(error);
     }
  
  }

  window.addEventListener("DOMContentLoaded", showItemsFromServer);
