
window.addEventListener('DOMContentLoaded', function (event) {
var open_window=document.getElementsByClassName("Add-term-button")[0];
open_window.onclick=function(){open_sign_in_page()
    };
  
 
  var modalCloseButton = document.querySelector('#add-user-modal .modal-close-button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }

  var modalCancalButton = document.querySelector('#add-user-modal .modal-cancel-button');
    if (modalCancalButton) {
        modalCancalButton.addEventListener('click', closeModal);
    }
   var modalAcceptButton = document.querySelector('#add-user-modal .modal-accept-button');
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', insertnewid);
    }
  var deletename=document.querySelector('.Dropdown-content');
     if(deletename){
         deletename.addEventListener('click', deleteusername );  } 
    
   var clickname=document.querySelector('.Dropdown-content');
     if(clickname){
         clickname.addEventListener('click',openschedule);
     }
    
   
});

function   deleteusername(event){
            console.log(event.target);  
            if(event.target.textContent=="") 
          {   console.log("empty");
             
             console.log(event.target.parentNode.parentNode);
           var the_username=event.target.parentNode.parentNode;
          delete_name_in_database(the_username,function(err){});
          }

}

//console.log(event.target.parentNode.firstChild.textContent)
function delete_name_in_database(the_username, callback){      var the_name=the_username.getElementsByClassName("name")[0].innerHTML;
    
        console.log(the_name);                                                 
var postUrl = '/home/delete-user';


    var postRequest = new XMLHttpRequest();
    console.log(postRequest);
    postRequest.open('POST', postUrl);
    postRequest.setRequestHeader('Content-Type', 'application/json');
  
    postRequest.addEventListener('load', function (event) {
        var error;
        if (event.target.status !== 200) {
            error = event.target.response;
        console.log("i am in delete postRequest")
        }
        callback(error);
    });

    
    postRequest.send(JSON.stringify({
        the_name: the_name
       
    }));
        
         
         
         
         
         }
        
     



function openschedule(event){
    console.log(event.target);
    var the_name_clicked=event.target.textContent;
    if(event.target.textContent!==""){
    console.log(the_name_clicked);
    var thestring="../schedule/"+the_name_clicked;
   
    window.open(thestring);}

}






function open_sign_in_page(){
  var backdropElem = document.getElementById('modal-bdrop');
    var addClassModalElem = document.getElementById('add-user-modal');

    // Show the modal and its backdrop.
    backdropElem.classList.remove('hidden');
    addClassModalElem.classList.remove('hidden');
}




function closeModal() {

    var backdropElem = document.getElementById('modal-bdrop');
    var addClassModalElem = document.getElementById('add-user-modal');
    // Hide the modal and its backdrop.
    backdropElem.classList.add('hidden');
    addClassModalElem.classList.add('hidden');
    clearClassInputValues();

}


function clearClassInputValues() {

    var inputElems = document.getElementsByClassName('todo-input-element');
    for (var i = 0; i < inputElems.length; i++) {
        var input = inputElems[i].querySelector('input, textarea');
        input.value = '';
    }
}



function insertnewid() {

    var userid = document.getElementById('todo-input-user').value || '';
    var pin = document.getElementById('todo-input-pin').value || '';
    
    if (userid.trim()) {

      //  var userID = getUserIDFromLocation();

       
            store_user_pin(userid, pin, function (err) {
                if (err) {

                    // If we couldn't save the user class, alert the user.
                    alert("Unable to save user's class.  Got this error:\n\n" + err);

                }else {

                  
                    console.log("everything is good");

                }
            });
        }

         closeModal();

     
}


function store_user_pin( userid, pin, callback) {
    var postUrl = '/home/add-user';

    // Start a new request to post our newly added photo as JSON data.
    var postRequest = new XMLHttpRequest();
    console.log(postRequest);
    postRequest.open('POST', postUrl);
    postRequest.setRequestHeader('Content-Type', 'application/json');
   console.log(userid);
    postRequest.addEventListener('load', function (event) {
        var error;
        if (event.target.status !== 200) {
            error = event.target.response;
        console.log("i am in postRequest")
        }
        callback(error);
    });
var wstring="../schedule/"+userid;
    //Send class info off to the server.
    postRequest.send(JSON.stringify({
        userid: userid,
        pin: pin
    }));

window.open(wstring);

}

/*
function store_user_pin( userid, pin, callback) {
    var postUrl = '/home/add-user';

    // Start a new request to post our newly added photo as JSON data.
    var postRequest = new XMLHttpRequest();
    console.log(postRequest);
    postRequest.open('POST', postUrl);
    postRequest.setRequestHeader('Content-Type', 'application/json');
   console.log(userid);
    postRequest.addEventListener('load', function (event) {
        var error;
        if (event.target.status !== 200) {
            error = event.target.response;
        console.log("i am in postRequest")
        }
        callback(error);
    });

    //Send class info off to the server.
    postRequest.send(JSON.stringify({
        userid: userid,
        pin: pin
    }));
}
*/





