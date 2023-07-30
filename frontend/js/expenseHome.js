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
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:3000/expense/deleteExpense${id}`);  
      console.log(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  document.getElementById("expenseForm").addEventListener("submit", saveToServer);


  document.getElementById('rzr-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/purchase/premiumMemberShip', {headers : {"Authorization" : token}});
    console.log(response);
    var option = 
    {
      "Key": response.data.Key_id,
      "order_id": response.data.order_id,
      "handler": async function(response){
        await axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
          order_id: option.order_id,
          payment_id: response.razorpay_payment_id,
        }, {header : {"Authorization" : token}})

        alert('you are a premium user')
        document.getElementById('rzr-button1').style.visibility = "hidden"
        document.getElementById('message').innerHTML = "you are a premium user"
        localStorage.setItem('token', res.data.token)
        showLeaderboard()
      },
    };
  }
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function showPremiumuserMessage(){
  document.getElementById('rzr-button1').style.visibility = "hidden"
  document.getElementById('message').innerHTML = "you are a premium user"
}
  async function showItemsFromServer() {
    try {
      const token = localStorage.getItem('token')
      const decodeToken = parseJwt(token)
      const ispremiumuser = decodeToken.ispremiumuser
      if(ispremiumuser){
        showPremiumuserMessage()
        showLeaderboard()
      }
   
      const response = await axios.get('http://localhost:3000/expense/getexpenses', {headers: {"Authorization":token}});
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
  function showLeaderboard(){
    const inputElement = document.createElement("input")
    inputElement.type = "button"
    inputElement.value = 'Show Leaderboard'
    inputElement.onclick = async() => {
      const token = localStorage.getItem('token')
      const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showLeaderBoard', {headers : {"Authorization" : token}})
      console.log(userLeaderBoardArray)

      var leaderBoardElem = document.getElementById('leaderboard')
      leaderBoardElem.innerHTML += '<h1> leader Board</h1>'
      userLeaderBoardArray.data.forEach((userDetails) => {
        leaderBoardElem.innerHTML += `<li>Name - ${userDetails.name} Toala expense</li>`
      })
    }
    document.getElementById("message").appendChild(inputElement);
  }
  


  window.addEventListener("DOMContentLoaded", showItemsFromServer,showLeaderboard);
