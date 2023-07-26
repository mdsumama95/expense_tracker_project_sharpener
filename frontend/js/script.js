     
async function signup(e){
    try{
      e.preventDefault();
      console.log(e.target.email.value);
      const signupDetails = {
          name:e.target.name.value,
          email: e.target.email.value,
          password : e.target.password
  
      }
      console.log(signupDetails);
      const response = await axios.post('http://localhost:3000/user/signup', signupDetails)
          if(response.status == 200){
              window.location.href="../Login/login.html"
          }else{
              throw new error('Failed to login')
          }
  
    }catch(err){
      document.body.innerHTML = `${err}`;
    }
  }