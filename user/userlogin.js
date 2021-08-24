
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        firebase.database().ref(`users/${uid}`)
            .once('value', (data) => {             
                if (data.val() != null) {
                    if (data.val().Type == "user") {
                        swal("Success", "Signed in Successfully", "success");
                        setTimeout(() => {
                            window.location = "userprofile.html"
                        }, 1000)
                    } else {
                        swal("Not a User", "Kindly login with Customer Account", "error");
                        setTimeout(() => {
                            logout()
                        }, 2000)
                    }
                }
            })
    }
    else {
        console.log("reached here")
        // window.location = "usersignup.html"
    }
})


let loginvalidate = () => {
    let emailcheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    if (emailcheck.test(email.value)) {
        email.style.background = "white";
        if (passwordcheck.test(password.value)) {
            password.style.background = "white";
            login()
        } else {
            swal("Invalid Password", "minimum 8 char with upper and lower case special char", "error");
            password.value = ''
        }

    } else {
        swal("Invalid Email", "Please Enter valid Email name", "error");
        email.value = ''
    }

}

let login = () => {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let loader = document.getElementById("loader")
    let loadertext = document.getElementById("loadertext")

    loader.style.display = "block";
    loadertext.style.display = 'none';


    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            // Signed in

            var user = res.user;

            loader.style.display = "none";
            loadertext.style.display = 'block';
            // signed in message displayed in on state change
            window.location = "userlogin.html"

        })
        .catch((error) => {
            loader.style.display = "none";
            loadertext.style.display = 'block';
            swal("Invalid Credential", `${error.message}`, "error");
            email.value = ""
            password.value = ""

        });

}

function logout(){
    firebase.auth().signOut()
    .then((res) =>{
        window.location = "userlogin.html"
    } )
}
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//      window.location = "userprofile.html" }
//     else{
//         window.location= "usersignup.html"
//     }
// })



/*    if(data.val().Type == "restaurant"){
               window.location = "../restaurant/restaurantprofile.html"
           }else{
               window.location = "userprofile.html"
           }*/