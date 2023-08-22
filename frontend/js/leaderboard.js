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
        for (let i = 0; i < response.data.data.length; i++) {
            let num = i
            // let ID = response.data.data[i].id;
            let expense = response.data.data[i].amount;
            let description = response.data.data[i].description;
            let category = response.data.data[i].category;
            container += `
            <div>
             <ul>
              <li>
                ${num}: 
                Expense = ${expense},  Description = ${ description }, category = ${ category } </li>
              </li>
            </ul>
            </div> `;  
        }

        details.innerHTML = container;
    } catch (error) {
        console.log(error);
    }

    console.log(id);
}


// function getExpenses(id)
// {

//     axios.get(`http://localhost:3000/premium/getAllExpenses/${id}`)
//     .then(result=>{
//         console.log(result)
//         let details = document.getElementById('details')
//         let container="";
        
//         for(let i=0;i<result.data.data.length;i++)
//         {
//             let expense = result.data.data[i].name;
//             console.log(expense);
//             let description = result.data.data[i].des;
//             let category = result.data.data[i].categ;
//             container += `<div> Expense=${expense}----Description=${description}-----category=${category} </div>`

//         }
//         details.innerHTML = container
//     })
//     .catch(err =>{
//         console.log(err)
//     })
//     console.log(id);
// }