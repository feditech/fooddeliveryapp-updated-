firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var User = user;
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
  .on("child_added", (data) => {
    // console.log(data.val().Uid)

    // https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png
    let restaurantid = `${data.val().Restaurantid}`
    let card = ` <div class="card" style="width: 18rem;">
                          <img height=200px width=100%  src="${data.val().Profilepic}" alt="...">
                          <div class="card-body">
                            <h5   class="card-title">${data.val().Restaurantname}</h5>
                            <h6  >City: ${data.val().City} </h6>
                            <h6>Country: ${data.val().Country} </h6>
                            <h2><button onclick="exploreRestaurant('${restaurantid}')" width=100% type="button" class="btn btn-primary btn-lg">Explore Restaurant</button></h2>
                            </div>
                        </div>`

    dishcard.innerHTML += card;

  })


let exploreRestaurant = (restaurantid) => {
  // window.location = "explorerestaurant.html"
  let dishcard1 = document.getElementById("allrestaurant")
  dishcard1.innerHTML = ""
  firebase.database().ref(`restaurant/${restaurantid}/dishes`)
    .on("child_added", (data) => {
      
      let dishid = data.val().Dishid
      let restaurantid = data.val().Restaurantid

      let card = ` <div class="card" style="width: 18rem;">
                      <img height=200px width=100%  src="${data.val().Picurl}" alt="...">
              <div class="card-body">
                  <h5   class="card-title">${data.val().Dishname}</h5>
                  <h6  >Rs: ${data.val().Dishprice} </h6>
                  <h6>Delivery: ${data.val().Deliverytype} </h6>
                 <h6>Category: ${data.val().Category} </h6>
              <h2><button onclick="ordernow('${restaurantid}','${dishid}' )" width=100% type="button" class="btn btn-primary btn-lg">Order Now</button></h2>
      </div>
  </div>`
      dishcard1.innerHTML += card
    })

}


//used custom id for order
ordernow = (Resid, Dishid) => {

    var order;
  //to get ordered dish data
  firebase.database().ref(`restaurant/${Resid}/dishes/${Dishid}`)
  .on("value",(data)=>{
      order = data.val()
      // console.log(order)
  })   

  var User;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      User = user.uid;
    
    }})
  //genereating custom order id
  let orderid =  Math.round(Math.random() * 1222312312312)
   orderid = `ord${orderid}`
  firebase.database().ref(`restaurant/${Resid}/pendingorders/${orderid}`).set({
    Dishname: order.Dishname,
    Dishprice:   order.Dishprice,
    Picurl:     order.Picurl,
    Deliverytype:  order.Deliverytype,
    Category:    order.Category ,
    Restaurantid:  order.Restaurantid     ,
    Dishid: order.Dishid,
    Orderid:  orderid,
    Customerid: `${firebase.auth().currentUser.uid}`
  })               
  .then(()=>{
                    // alert("user id",User.uid)
                    swal("Success", "Order placed", "success");
                })


            
}


let logout = () => {
  firebase.auth().signOut()
    .then((res) => {
      window.location = "userlogin.html"
    })
}



//     push({
//       Dishname: dishname.value,
//       Dishprice: dishprice.value,
//       Picurl: picUrl,
//       Deliverytype: deliverytype.value,
//       Category: dishcategory.value,
//       Restaurantid: user.uid
        
//   })
//   //after push is done we get pushid in .then()  
//   .then((snapshot)=>{
//     let dishid  = snapshot.key
//     //seting anthor dish id atribute in dish
//     firebase.database().ref(`restaurant/${user.uid}/dishes/${dishid}`).update(
//         { Dishid: dishid }
//     )
//     .then(()=>{
//         closebtn.click()
//     })                                    
//   })
  
  
// })