const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:3000/premium/getReport", {headers:{"Authorization":token}})
    .then(result=>{
      const dailyExpense = document.getElementById('dailyExpense');
let container = "";

// Sort the data based on amount
result.data.sort((a, b) => a.amount - b.amount);

for (let i = 0; i < result.data.length; i++) {
    let expense = result.data[i].amount;
    let category = result.data[i].category;
    let description = result.data[i].description;

    container += `
        <tr>
            <td>${expense}</td>
            <td>${description}</td>
            <td>${category}</td>
        </tr>`;
}

// Create a table and append the table body
const table = `
        <tbody>
            ${container}
        </tbody>
    </table>`;

dailyExpense.innerHTML = table;
    })
    //     const dailyExpense = document.getElementById('dailyExpense')
    //     let container = "";
    //     result.data.sort((a, b) => a.amount - b.amount);
    //     for(let i =0;i<result.data.length;i++)
    //     {
            
    //         let expense = result.data[i].amount;
    //         let category = result.data[i].category;
    //         let description = result.data[i].description;

    //         container +=`
    //      <ul>
    //         <li>
    //           <div> expense = ${expense}, description = ${description}, category = ${category}</div>
    //         </li>
    //       </ul>`
    //     }
    //     dailyExpense.innerHTML = container;
    // })

        axios.get("http://localhost:3000/premium/getWeeklyReport", {headers:{"Authorization":token}})
        .then(result=>{
            console.log(result)
            const WeeklyExpense = document.getElementById('weeklyExpense');
            let container = "";

// Sort the data based on amount
           result.data.sort((a, b) => a.amount - b.amount);

for (let i = 0; i < result.data.length; i++) {
    let expense = result.data[i].amount;
    let category = result.data[i].category;
    let description = result.data[i].description;

    container += `
        <tr>
            <td>${expense}</td>
            <td>${description}</td>
            <td>${category}</td>
        </tr>`;
}

// Create a table and append the table body
const table = `
    <table class="table custom-table">
       
        <tbody>
            ${container}
        </tbody>
    </table>`;

     WeeklyExpense.innerHTML = table;
 
            // const WeeklyExpense = document.getElementById('weeklyExpense')
            // let container = "";
            // result.data.sort((a, b) => a.amount - b.amount);
            // for(let i =0;i<result.data.length;i++)
            // {
            //     let expense = result.data[i].amount;
            //     let category = result.data[i].category;
            //     let description = result.data[i].description;

            //     container +=`<ul>
            //     <li>
            //       <div> expense = ${expense }, description = ${ description}, category = ${ category}<br></div>
            //     </li>
            //     </ul>`


            // }
            // WeeklyExpense.innerHTML = container;
    })
    .catch(err =>{
        console.log(err)
    })

})