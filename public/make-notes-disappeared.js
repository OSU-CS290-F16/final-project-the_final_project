function closelayout(event){
    console.log(event.target);
    if (event.target.parentNode.className === "dismiss-button-in-block") {
	var temp=event.target.parentNode.parentNode;
    
	document.getElementsByTagName('main')[0].removeChild(temp);
    delete_notes_in_database(temp,function(err){});
    }
}
function getUserIDFromLocation() {
    var pathComponents = window.location.pathname.split('/');
    if (pathComponents[0] !== '' && pathComponents[1] !== 'schedule') {
        return null;
    }
    return pathComponents[2];
}



var main = document.querySelector('.schedule_main');
  main.addEventListener('click', closelayout);

   function delete_notes_in_database(temp,callback){
       console.log(temp);
var userID = getUserIDFromLocation();
var classid=temp.getElementsByClassName("id")[0].innerHTML;
var weekday=temp.getElementsByClassName("week")[0].innerHTML;
var time=temp.getElementsByClassName("the_time")[0].innerHTML;
var details=temp.getElementsByClassName("the_detail")[0].innerHTML;
   console.log(userID);
       
   var postUrl = '/schedule/' + userID + '/delete-notes';

    // Start a new request to post our newly added photo as JSON data.
    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', postUrl);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
        var error;
        if (event.target.status !== 200) {
            error = event.target.response;
        }
       callback(error);
    });

    //Send class info off to the server.
    postRequest.send(JSON.stringify({
        classid: classid,
        weekday: weekday,
        time: time,
        details: details
    }));    
   
   };