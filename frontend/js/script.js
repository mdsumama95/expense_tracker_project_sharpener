     
async function signup(event){
    try{
      event.preventDefault();
      console.log(event.target.email.value);
      const signupDetails = {
          name: event.target.name.value,
          email: event.target.email.value,
          password : event.target.password
  
      }
      console.log(signupDetails);
      const response = await axios.post('http://localhost:3000/user/signup', signupDetails)
        console.log(response.data,password);
          if(response.status == 200){
              window.location.href="../html/login.html"
          }else{
              throw new error('Failed to login')
          }
  
    }catch(err){
      document.body.innerHTML = `${err}`;
    }
  }