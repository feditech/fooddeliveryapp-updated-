




//for pending orders

 firebase.auth().onAuthStateChanged((user) => {                  
    if (user) {
        let dishcard = document.getElementById("Pendingdiv")
        dishcard.innerHTML=""
        var uid = user.uid;
        firebase.database().ref(`restaurant/${uid}/pendingorders`)
        .on("child_added",(data)=>{
    
                let card = ` <div class="card" style="width: 18rem;">
                                  <img height=200px width=100%  src="${data.val().Picurl}" alt="...">
                                  <div class="card-body">
                                    <h5   class="card-title">${data.val().Dishname}</h5>
                                    <h6  >Rs: ${data.val().Dishprice} </h6>
                                    <h6>Delivery: ${data.val().Deliverytype} </h6>
                                    <h6>Category: ${data.val().Category} </h6>
                                  </div>
                                </div>`   
                                
                                Pendingdiv.innerHTML += card;
           
        })
    }
})