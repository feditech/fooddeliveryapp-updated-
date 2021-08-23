firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     
        let username = document.getElementById("username")
        let email = document.getElementById("email")
        let defaultDp = document.getElementById("defaultDp")

        var uid = user.uid;
        firebase.database().ref(`users/${uid}`)
        .once('value',(data)=>{
            username.innerHTML =  data.val().Username
            email.innerHTML = data.val().Email
            // console.log(data.val().profilepic)
            if(data.val().profilepic != null){
                defaultDp.setAttribute("src",`${data.val().profilepic}`)

            }
        })
     // ...
    } else {
        window.location = "userlogin.html"
        // User is signed out
      // ...
    }
  });


  function logout(){
      firebase.auth().signOut()
      .then((res) =>{
          window.location = "userlogin.html"
      } )
  }
  


  let uploadFiles = (file,ref) => {
            return new Promise((resolve, reject) => {
                let storageRef = ref;
                
                // let progress1 = document.getElementById("progress"); // let bar = document.getElementById("bar");  // progress1.style.display = "block"
                let uploading = storageRef.put(file)
                uploading.on('state_changed',
                    (snapshot) => {
                        // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;         // bar.style.width = Math.round(progress.toFixed()) + "%";           // bar.innerHTML = Math.round(progress.toFixed()) + "%";
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            resolve(downloadURL)
                        });
                    }
                );
            })
        }
    
      
      
      
      
      
      
      
        let updateProfile = async ()=>{
            let defaultDp = document.getElementById("defaultDp")
            let profilepic = document.getElementById("profilepic")
            let closebtn = document.getElementById("closebtn")
        
            let Ref = firebase.storage().ref(`profilepics/${profilepic.files[0].name}`);
            let profilePicUrl = await uploadFiles(profilepic.files[0],Ref)  
            console.log(profilePicUrl)
            firebase.auth().onAuthStateChanged((user) => {
                firebase.database().ref(`users/${user.uid}`).update({profilepic: profilePicUrl})
                .then(()=>{
                    closebtn.click()
                    defaultDp.setAttribute("src",`${profilePicUrl}`)
                })
            
            })
                
          }      
    
    