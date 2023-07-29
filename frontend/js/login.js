   
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


    
  