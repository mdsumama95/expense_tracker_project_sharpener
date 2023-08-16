const token = localStorage.getItem('token');
function addNewExpense(e){
    e.preventDefault();
    const form = new FormData(e.target);

    const expenseDetails = {
        amount: form.get("amount"),
        description: form.get("description"),
        category: form.get("category")

    }
    console.log(expenseDetails)
    axios.post('http://localhost:3000/user/addExpense',expenseDetails, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 201){
        addNewExpensetoUI(response.data.expense);
    } else {
        throw new Error('Failed To create new expense');
    }

    }).catch(err => showError(err))

}
window.addEventListener('load', async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/getexpenses', {
        headers: { "Authorization": token }
      });
      if (response.status === 200) {
        response.data.expenses.forEach(expense => {
          addNewExpensetoUI(expense);
        });
        console.log(response.data.user.ispremiumuser);
        // window.location.href = "../html/login.html";
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
  

// window.addEventListener('load', ()=> {
//     axios.get('http://localhost:3000/user/getexpenses', { headers: {"Authorization" : token} }).then(response => {
//         if(response.status === 200){
//             response.data.expenses.forEach(expense => {
//                 addNewExpensetoUI(expense);
//             })
//             console.log(response.ispremiumuser)
//               //  window.location.href = "../html/login.html"
//         } else {
//             throw new Error();
//         }
//     })
// });

function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.amount} - ${expense.category} - ${expense.description}
            <button class="btn btn-outline-primary btn-sm" onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
            <button class="btn btn-outline-primary btn-sm" onclick=EditUser('${expense.amount}','${expense.description}','${expense.category}','${expense.id}')>Edit</button>
        </li>`
}

function deleteExpense(e, expenseid) {
    axios.delete(`http://localhost:3000/user/deleteExpense/${expenseid}`, { headers: {"Authorization" : token} }).then((response) => {

    if(response.status === 200){
            removeExpensefromUI(expenseid);
        } else {
            throw new Error('Failed to delete');
        }
    }).catch((err => {
        showError(err);
    }))
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

function removeExpensefromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
}
function download(){
    axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}



document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:3000/purchase/premiumMemberShip', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Sharpener Technology",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Somama",
       "email": "mdsumama9090@gmail.com",
       "contact": "8727089931"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment

     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/purchase/updateTransactionStatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}