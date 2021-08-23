
let signupvalidate = () => {

    let name = document.getElementById("retaurantname")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let country = document.getElementById("country")
    let city = document.getElementById("city")


    let empty = /.*\S.*/;
    let emailcheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let usercheck = /^[a-z0-9_-]{3,16}$/;
    let passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // usercheck.test(name.value) && 

    if (empty.test(name.value)) {
        name.style.background = "white"
        if (emailcheck.test(email.value)) {
            email.style.background = "white";

            if (empty.test(country.value)) {
                country.style.background = "white";

                if (empty.test(city.value)) {
                    city.style.background = "white";

                    if (passwordcheck.test(password.value)) {
                        password.style.background = "white";
                       
                        // run function of firebase validation in here
                        register()
                       
                    } else {

                        swal("Invalid Password", "minimum 8 char with upper and lower case special char", "error");
                        password.value = ''
                    }

                } else {
                    swal("Invalid City", "Please Enter City name", "error");
                    city.value = ''
                }
            }
            else {
                swal("Invalid Country", "Please Enter Country name", "error");
                country.value = ''
            }
        } else {
            swal("Invalid Email", "Please Enter valid Email name", "error");
            email.value = ''
        }
    } else {
        swal("Invalid name", "Please Enter valid user name", "error");
        name.value = ''
    }
}





let register = async () => {
    let name = document.getElementById("retaurantname")
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let country = document.getElementById("country")
    let city = document.getElementById("city")

    let loader = document.getElementById("loader")
    loader.style.display = "block";
    loadertext.style.display = 'none';

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            // Signed in 
            var user = res.user;
            firebase.database().ref(`restaurant/${user.uid}`).set(
                {
                    Restaurantname: `${name.value}`,
                    Email: `${email.value}`,
                    Password: `${password.value}`,
                    Country: `${country.value}`,
                    City: `${city.value}`,
                    Type: "restaurant",
                    Uid: user.uid
                    // profilepic: ""

                }
            ).then((res) => {

                loadertext.style.display = "block";
                loader.style.display = "none";
                name.value = ""
                email.value = ""
                password.value = ""
                swal("Successfully Signed up", "User account Created ", "success");
                setTimeout(() => {
                    window.location = "restaurantlogin.html"
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
