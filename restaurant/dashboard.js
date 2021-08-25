
//for pending orders

var onstate= firebase.auth().onAuthStateChanged((user) => {                  
    if (user) {
        let dishcard = document.getElementById("Pendingdiv")
        dishcard.innerHTML=""
        var uid = user.uid;
        firebase.database().ref(`restaurant/${uid}/pendingorders`)
        
        .on("child_added",(data)=>{
             orderid = data.val().Orderid;
             resid = data.val().Restaurantid;
             dishid= data.val().Dishid;
             ul = ` <ul style="list-style-type:none"> 
            <li style="text-align:center"><img height=60px width=80px  src="${data.val().Picurl}" alt="..."> </li>
            <li style="text-align:center" >${data.val().Dishname} </li>
            <li style="text-align:center"> Rs: ${data.val().Dishprice}</li>
            <li style="text-align:center">Delivery:${data.val().Deliverytype}</li>
            <li style="text-align:center">Category: ${data.val().Category} </li>
            <h2><button onclick="orderAccepted('${orderid}','${resid}', '${dishid}')" width=100% type="button" class="btn btn-primary btn">Accept Order Now</button></h2>
            <ul>`
            Pendingdiv.innerHTML += ul;
            //window.location.reload()
        })
        // window.location.reload()
    }
})
 

let orderAccepted = ( Orderid,Resid,Dishid)=>{
    
    // window.location.reload()
    // onstate()

    firebase.database().ref(`restaurant/${Resid}/pendingorders/`)
    .once('value', (data)=>{
       
        console.log(data.val())  
    })
 
    
    

    // console.log("orderid===>" ,orderid)
    // firebase.database().ref(`restaurant/${resid}/acceptedorders/${orderid}`).set({

    // })
    
}
    /*  
          ()=>{
let card = ` <div class="card" style="width: 18rem;">
                                  <div class="imgdiv"> <img height=200px width=100%  src="${data.val().Picurl}" alt="..."> </div>
                                  <div class="card-body">
                                    <h5   class="card-title">${data.val().Dishname}</h5>
                                    <h6>Rs: ${data.val().Dishprice} </h6>
                                    <h6>Delivery: ${data.val().Deliverytype} </h6>
                                    <h6>Category: ${data.val().Category} </h6>
                                    <h2><button onclick="" width=100% type="button" class="btn btn-primary btn-lg">Accept Order Now</button></h2>

                                    </div>
                                </div>`
          }
              
            */   
                        