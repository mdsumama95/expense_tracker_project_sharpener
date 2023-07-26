     
async function login(e){
    try{
      e.preventDefault();
      //console.log(e.target.email.value);
      const signupDetails = {
         
          email: e.target.email.value,
          password : e.target.password
  
      }
     // console.log(signupDetails);
      const response = await axios.post('http://localhost:3000/user/signup', signupDetails)
          if(response.status == 201){
              window.location.href="../html/expesneHome.html"
          }else{
              throw new error('Failed to login')
          }
  
    }catch(err){
      document.body.innerHTML = '${err}';
    }
  }