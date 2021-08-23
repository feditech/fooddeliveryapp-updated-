let signupvalidate = ()=>{

    let name = document.getElementById("username")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let phone = document.getElementById("phone")
    let country = document.getElementById("country")
    let city = document.getElementById("city")
    



    let empty = /.*\S.*/;
    let emailcheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let usercheck = /^[a-z0-9_-]{3,16}$/;
    let phonecheck = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    let passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
 
      
    
    if(usercheck.test(name.value) && empty.test(name.value)){
        name.style.background="white"
        if(emailcheck.test(email.value)){
            email.style.background="white";

        if(phonecheck.test(phone.value)){
            phone.style.background="white";
        
                if(empty.test(country.value)){
                    country.style.background="white";

                if(empty.test(city.value)){
                    city.style.background="white";
                

      if(passwordcheck.test(password.value)){
                    password.style.background="white";
                    register()
                    // run function of firebase validation in here
                }else{
                    
                    swal("Invalid Password", "minimum 8 char with upper and lower case special char", "error");

                    password.value=''
                }

                }else{
                    swal("Invalid City", "Please Enter City name", "error");
                    city.value='' 
                }

                }else{
                    swal("Invalid Country", "Please Enter Country name", "error");
                    country.value=''
                }
          

            }else{
                swal("Invalid Phone", "Please Enter valid Phone name", "error");
                phone.value=''    
            }

        }else{
            
            swal("Invalid Email", "Please Enter valid Email name", "error");
                email.value=''
        }


    }
else{
    swal("Invalid name", "Please Enter valid user name", "error");
    name.value=''
}



}



let register = async () => {


let loader = document.getElementById("loader")
loader.style.display = "block";
loadertext.style.display = 'none';

firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
        // Signed in 
        var user = res.user;
        firebase.database().ref(`users/${user.uid}`).set(
            {
                Username: `${username.value}`,
                Email: `${email.value}`,
                Password: `${password.value}`,
                Type: "user",
                Uid: user.uid

            }
        ).then((res) => {
        
            loadertext.style.display = "block";
            loader.style.display = "none";
            username.value = ""
            email.value = ""
            password.value = ""
            swal("Successfully Signed up", "User account Created ", "success");
            successdiv.innerText=""
            setTimeout(() => {
                window.location = "userlogin.html"
            }, 1000)

        })


    })
    .catch((error) => {
        swal("Invalid Data", `${error.message}`, "error");
        loader.style.display = "none";
        loadertext.style.display = "block";


        // ..
    });
}
