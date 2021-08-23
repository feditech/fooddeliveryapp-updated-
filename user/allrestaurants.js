firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // window.location = "allrestaurants.html"
     // ...
    } else {
        window.location = "userlogin.html"
        // User is signed out
      // ...
    }
  });


let dishcard = document.getElementById("allrestaurant")
firebase.database().ref(`restaurant`)
.on("child_added",(data)=>{
    // console.log(data.val().Uid)
   let uid=  `${data.val().Uid}`
        let card = ` <div class="card" style="width: 18rem;">
                          <img height=200px width=100%  src="${data.val().profilepic}" alt="...">
                          <div class="card-body">
                            <h5   class="card-title">${data.val().Restaurantname}</h5>
                            <h6  >City: ${data.val().City} </h6>
                            <h6>Country:dd ${data.val().Country} </h6>
                            <h2><button onclick="exploreRestaurant('${uid}')" width=100% type="button" class="btn btn-primary btn-lg">Explore Restaurant</button></h2>
                            </div>
                        </div>`   
                        
                        dishcard.innerHTML += card;
   
})


let logout = ()=>{
    firebase.auth().signOut()
    .then((res) =>{
        window.location = "userlogin.html"
    } )
}


let exploreRestaurant = (uid)=>{

    // window.location = "explorerestaurant.html"
    let dishcard1 = document.getElementById("allrestaurant")
    dishcard1.innerHTML=""
    firebase.database().ref(`restaurant/${uid}/dishes`)
    .on("child_added",(data)=>{
        // console.log(data.val())
        let card = ` <div class="card" style="width: 18rem;">
    <img height=200px width=100%  src="${data.val().Picurl}" alt="...">
    <div class="card-body">
      <h5   class="card-title">${data.val().Dishname}</h5>
      <h6  >Rs: ${data.val().Dishprice} </h6>
      <h6>Delivery: ${data.val().Deliverytype} </h6>
      <h6>Category: ${data.val().Category} </h6>
      <h2><button onclick="alert('I tried my best.. I will make dashboard soon.')" width=100% type="button" class="btn btn-primary btn-lg">Order Now</button></h2>
    </div>
  </div>`   
        dishcard1.innerHTML += card
    })
    
}