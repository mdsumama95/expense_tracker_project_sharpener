window.addEventListener('DOMContentLoaded',() =>{
    const token = localStorage.getItem('token')
    axios.get("http://localhost:3000/premium/getAllUsers",{ headers: {"Authorization" : token} })
    .then(result =>{
        console.log(result.data.data)
        const leaderboard = document.getElementById('lb');
        for(let i=0;i<result.data.data.length;i++)
        {
            let email = result.data.data[i].email;
            let id = result.data.data[i].id;
            console.log(email);
           leaderboard.innerHTML+= `<div>
           <ul> 
             <li>
               ${email} <button onclick="getExpenses(${id})">Details</button>
              </li>
           </ul>
             </div>`
             
        }
    })
    .catch(err =>console.log(err))
})
async function getExpenses(id) {
    try {
        const response = await axios.get(`http://localhost:3000/premium/getAllExpenses/${id}`);
        console.log(response);
        let details = document.getElementById('details');
        let container = "";
        response.data.data.sort((a, b) => a.amount - b.amount);
         const tableHead = `
          <thead>
            <tr>
                <th>Num</th>
                <th>Expense</th>
                <th>Description</th>
                <th>Category</th>
            </tr>
          </thead>`;
        // Open the table tag
        container += `<table class='table custom-table'>${tableHead}<tbody>`;
        
        for (let i = 0; i < response.data.data.length; i++) {
            let num = i;
            let expense = response.data.data[i].amount;
            let description = response.data.data[i].description;
            let category = response.data.data[i].category;
        
            // Add a table row with cells for each data point
            container += `
                <tr>
                    <td>${num}</td>
                    <td>${expense}</td>
                    <td>${description}</td>
                    <td>${category}</td>
                </tr>`;
        }
        
        // Close the table tag
        container += "</tbody></table>";
        
        details.innerHTML = container;
        
        // let details = document.getElementById('details');
        // let container = "";
        // response.data.data.sort((a, b) => a.amount - b.amount);
        // for (let i = 0; i < response.data.data.length; i++) {
        //     let num = i
        //     // let ID = response.data.data[i].id;
        //     let expense = response.data.data[i].amount;
        //     let description = response.data.data[i].description;
        //     let category = response.data.data[i].category;
        //     container += `
        //     <div>
        //      <ul>
        //       <li>
        //         ${num}: 
        //         Expense = ${expense},  Description = ${ description }, category = ${ category } </li>
        //       </li>
        //     </ul>
        //     </div> `;  
        // }

        // details.innerHTML = container;
    } catch (error) {
        console.log(error);
    }

    console.log(id);
}
