function store_user_class(userid, classid, weekday, time, details, callback) {
    var postUrl = '/schedule/' + userid + '/add-class';

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
}