//do bar on state lagana h
//for pending orders

 firebase.auth().onAuthStateChanged((user) => {                  
    if (user) {
        let pendingdiv = document.getElementById("Pendingdiv")
        // pendingdishcard.innerHTML=""
        var uid = user.uid;
        firebase.database().ref(`restaurant/${uid}/pendingorders`)
        
        .on("child_added",(data)=>{
             let orderid = data.val().Orderid;
             let resid = data.val().Restaurantid;
             let dishid= data.val().Dishid;
             let customerid = data.val().Customerid;
            let ul = ` <ul style="list-style-type:none"> 
            <li style="text-align:center"><img height=60px width=80px  src="${data.val().Picurl}" alt="..."> </li>
            <li style="text-align:center" >${data.val().Dishname} </li>
            <li style="text-align:center"> Rs: ${data.val().Dishprice}</li>
            <li style="text-align:center">Delivery:${data.val().Deliverytype}</li>
            <li style="text-align:center">Category: ${data.val().Category} </li>
            <h2><button onclick="orderAccepted('${orderid}','${resid}', '${dishid}','${customerid}')" width=100% type="button" class="btn btn-primary btn">Accept Order Now</button></h2>
            <ul>`
            // console.log(data.val())
            pendingdiv.innerHTML += ul;
                })
        
        // for accepted div

        let accepteddiv = document.getElementById("Accepteddiv")
        // accepteddiv.innerHTML=""
        var uid = user.uid;
        firebase.database().ref(`restaurant/${uid}/acceptedorders`)
        .on("child_added",(data)=>{
            console.log(data.val())
             let orderid = data.val().Orderid;
             let resid = data.val().Restaurantid;
              let dishid= data.val().Dishid;
              let customerid = data.val().Customerid;
              console.log(orderid,resid,dishid)
            //   console.log(data.val())
             let ul1 = ` <ul style="list-style-type:none"> 
            <li style="text-align:center"><img height=60px width=80px  src="${data.val().Picurl}" alt="..."> </li>
            <li style="text-align:center" >${data.val().Dishname} </li>
            <li style="text-align:center"> Rs: ${data.val().Dishprice}</li>
            <li style="text-align:center">Delivery:${data.val().Deliverytype}</li>
            <li style="text-align:center">Category: ${data.val().Category} </li>
            <h2><button onclick="orderDelivered('${orderid}','${resid}', '${dishid}','${customerid}')" width=100% type="button" class="btn btn-primary btn">Deliver Order Now</button></h2>
            <ul>`
            // console.log(data.val())
            accepteddiv.innerHTML += ul1;
                })
    
                 
            // for delivered div
        
            let Delivereddiv = document.getElementById("Delivereddiv")
            // accepteddiv.innerHTML=""
            var uid = user.uid;
            firebase.database().ref(`restaurant/${uid}/deliveredorders`)
            .on("child_added",(data)=>{
                // console.log(data.val())
                 let orderid = data.val().Orderid;
                 let resid = data.val().Restaurantid;
                  let dishid= data.val().Dishid;
                  let customerid = data.val().Customerid;
                  console.log(orderid,resid,dishid)
                 let ul2 = ` <ul style="list-style-type:none"> 
                <li style="text-align:center"><img height=60px width=80px  src="${data.val().Picurl}" alt="..."> </li>
                <li style="text-align:center" >${data.val().Dishname} </li>
                <li style="text-align:center"> Rs: ${data.val().Dishprice}</li>
                <li style="text-align:center">Delivery:${data.val().Deliverytype}</li>
                <li style="text-align:center">Category: ${data.val().Category} </li>
                <h2><button onclick="orderDelivered('${orderid}','${resid}', '${dishid}','${customerid}')" width=100% type="button" class="btn btn-primary btn">Remove from Deliver</button></h2>
                <ul>`
                // console.log(data.val())
                Delivereddiv.innerHTML += ul2;
                    })
        
        
            }
        })
 










//order accepted function

let orderAccepted = (OrderID,Resid,Dishid,CustomerId)=>{
    var order;
    // console.log(OrderID , Resid,Dishid)
    firebase.database().ref(`restaurant/${Resid}/pendingorders/${OrderID}`)
    .on('value', (data)=>{
        order = data.val()        
    })
 
    firebase.database().ref(`restaurant/${Resid}/acceptedorders/${OrderID}`).set(
        {
    Dishname: order.Dishname,
    Dishprice:   order.Dishprice,
    Picurl:     order.Picurl,
    Deliverytype:  order.Deliverytype,
    Category:    order.Category ,
    Restaurantid:  order.Restaurantid     ,
    Dishid: order.Dishid,
    Orderid:   OrderID,
    Customerid: CustomerId
    }
    )
    firebase.database().ref(`restaurant/${Resid}/pendingorders/${OrderID}`).remove()
    .then(()=>{
        setTimeout(()=>{
            window.location.reload();

        },1500)
        
    })   
}

let orderDelivered = (OrderID,Resid,Dishid)=>{
    var order;
    firebase.database().ref(`restaurant/${Resid}/acceptedorders/${OrderID}`)
    .on('value', (data)=>{
        order = data.val()        
    })
 

    firebase.database().ref(`restaurant/${Resid}/deliveredorders/${OrderID}`).set(
        {
    Dishname: order.Dishname,
    Dishprice:   order.Dishprice,
    Picurl:     order.Picurl,
    Deliverytype:  order.Deliverytype,
    Category:    order.Category ,
    Restaurantid:  order.Restaurantid     ,
    Dishid: order.Dishid,
    Orderid:   OrderID
    }
    )
    firebase.database().ref(`restaurant/${Resid}/acceptedorders/${OrderID}`).remove()
    .then(()=>{
        setTimeout(()=>{
            window.location.reload();

        },1500)
    })  
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
                        