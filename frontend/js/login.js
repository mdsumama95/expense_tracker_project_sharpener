   
function login(e){
      e.preventDefault();
      console.log(e.target.name);
      const loginDetails = {
          email: e.target.email.value,
          password : e.target.password
      }
      console.log(loginDetails)
      axios.post('http://localhost:3000/user/login', loginDetails).then(response => {
         if(response.status == 200)
            alert(response.data.message)
            window.location.href = '../html/expesneHome.html';
      }).catch(err => {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<div style = "colored:red;">${err.message}</div>`;
      })
    }


    
  