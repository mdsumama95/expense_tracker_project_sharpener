  /* 
function login(event){
  event.preventDefault();
      console.log(event.target.name);
      const loginDetails = {
          email: event.target.email.value,
          password : event.target.password
      }
      console.log(loginDetails)
      axios.post('http://localhost:3000/user/login', loginDetails).then(response => {
            alert(response.data.message)
            console.log(response.data)
            window.location.href = '../html/expesneHome.html';
      }).catch(err => {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<div style = "colored:red;">${err.message}</div>`;
      })
    }
*/



function login(e) {
  e.preventDefault();
  console.log(e.target.name);
  const form = new FormData(e.target);

  const loginDetails = {
      email: form.get("email"),
      password: form.get("password")

  }
  console.log(loginDetails)
  axios.post('http://localhost:3000/user/login', loginDetails).then(response => {
    console.log(response);
      if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userDetails', JSON.stringify(response.data.user))
          window.location.href = "../html/expesneHome.html" // change the page on successful login
      } else {
          throw new Error('Failed to login')
      }
  }).catch(err => {
      document.body.innerHTML += `<div style="color:red;">${err} <div>`;
  })
}
function forgotpassword() {
  window.location.href = "../html/forgetPassword.html"
}
/*

async function login(e) {
  try{ 
  e.preventDefault();
  console.log(e.target.name);
  const form = new FormData(e.target);

  const loginDetails = {
      email: form.get("email"),
      password: form.get("password")

  }
  console.log(loginDetails)
  const response = await axios.post('http://localhost:3000/user/login', loginDetails)
    console.log(response);
      if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userDetails', JSON.stringify(response.data.user))
          window.location.href = "../html/expesneHome.html" // change the page on successful login
      } else {
          throw new Error('Failed to login')
      }
  
    }catch(err) {
      document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}

function forgotpassword() {
  window.location.href = "../html/forgetPassword.html"
}*/


function forgotpassword() {
  window.location.href = "../html/forgetPassword.html"
}


    
  