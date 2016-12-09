var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var port = process.env.PORT || 3000;

/*
 * Read info about the MySQL connection from the environment and use it to
 * make the connection.
 */

var mysqlHost = process.env.MYSQL_HOST;
var mysqlUser = process.env.MYSQL_USER;
var mysqlPassword = process.env.MYSQL_PASSWORD;
var mysqlDB = process.env.MYSQL_DB;
var mysqlConnection = mysql.createConnection({
  host:'mysql.cs.orst.edu',
  user: 'cs290_maoyi',
  password: '8664',
  database: 'cs290_maoyi'
});

/*
 * Make a connection to our MySQL database.  This connection will persist for
 * as long as our server is running.
 */
mysqlConnection.connect(function(err) {
  if (err) {
    console.log("== Unable to make connection to MySQL Database.")
    throw err;
  }
});

/*
 * Do some preprocessing on our data to make special note of people 65 or
 * older.
 */
// Object.keys(people).forEach(function (person) {
//   if (people[person].age >= 65) {
//     people[person].is65OrOlder = true;
//   }
// });

/*
 * Set up Express to use express-handlebars as the view engine.  This means
 * that when you call res.render('page'), Express will look in `views/` for a
 * file named `page` (express-handlebars will recognize the .handlebars
 * extension), and it will use express-handlebars to render the content of that
 * file into HTML.
 *
 * Here, we're also setting express-handlebars to use 'main' as the default
 * layout.  This means that, if we can res.render('page'), express-handlebars
 * will take the content from `views/page.handlebars` and plug it into the
 * {{{body}}} placeholder in `views/layouts/main.handlebars`.
 */
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

// Parse all request bodies as JSON.
app.use(bodyParser.json());

// Serve static files from public/.
app.use(express.static(path.join(__dirname, 'public')));

// Render the index page for the root URL path ('/').
app.get('/home', function (req, res) {
 

console.log("mao");
  /*
   * Initiate a database query for all of our people in the database.  We'll
   * respond to the requesting client from within the callback of the MySQL
   * query.
   */
  mysqlConnection.query('SELECT username FROM USERHOLDER  ', function (err,rows) {
      console.log(rows);
      if(err){
          
          console.log("mmmmm");
      }
      else{
 var user_in_home;
console.log(user_in_home);      
 
      
        var name_info = [];
          rows.forEach(function (rows) {
            name_info.push({
              usename: rows.username
             
            });
          });

          // Render the page, sending all the needed info to Handlebars.
          res.render('homepage', {
            pageTitle: "hoge",
            user_in_home: {
            
            name_info: name_info
            }
          });
          console.log(user_in_home);
          
      /*
       * If we got at least one row (should be exactly 1), then we found the
       * requested person.  Fetch that person's photos as well.
       */
        
      }
    
  

});
});

//////////////////////////////////////////////////////////////////////

app.post('/home/add-user', function (req, res, next) {

 console.log(req.body.userid);
if (req.body && req.body.userid) {
    mysqlConnection.query(
      'INSERT INTO USERHOLDER (username, Pin) VALUES (?,?)',
      [  req.body.userid,req.body.pin ],
      function (err, result) {
        if (err) {
          /*
           * Send an error response if there was a problem inserting the photos
           * into the DB.
           */
          console.log("== Error inserting photos for person (", req.params.user, ") from database:", err);
          res.status(500).send("Error inserting photos itnto database: " + err);
        }
        res.status(200).send();
      });
  } else {
    res.status(400).send("Person photo must have a URL.");
  }

});

///////////////////////////////////////////////////////
app.post('/home/delete-user', function (req, res, next) {

    if (req.body && req.body.the_name) {
    mysqlConnection.query(
      'DELETE FROM USERHOLDER WHERE username=?', 
      [req.body.the_name],function (err,result) {
        if (err) {
          /*
           * Send an error response if there was a problem inserting the photos
           * into the DB.
           */
          console.log("== Error inserting photos for person  from database:", err);
          res.status(500).send("Error inserting photos itnto database: " + err);
        }
        res.status(200).send();
      });
  } else {
    res.status(400).send("Person photo must have a URL.");
  }


});
////////////////////////////////////////////////////////////////



/*
 * Render the people page for the URL path '/people'.
 */
/*
app.get('/people', function (req, res) {

  
  mysqlConnection.query('SELECT * FROM people', function (err, rows) {

    if (err) {

     
      console.log("== Error fetching people from database:", err);
      res.status(500).send("Error fetching people from database: " + err);

    } else {

      var people = [];
      rows.forEach(function (row) {
        people.push({
          userid: row.userid,
          name: row.name,
          is65OrOlder: row.age >= 65
        });
      });

      res.render('people-page', {
        pageTitle: 'Famous People',
        people: people
      });

    }

  });

});
*/
/*
 * Use a dynamic route to render a page for each individual person.
 */
app.get('/schedule/:user', function (req, res, next) {

  /*
   * Initiate a database query for all of our people in the database.  We'll
   * respond to the requesting client from within the callback of the MySQL
   * query.
   */
  mysqlConnection.query('SELECT * FROM STUDENT WHERE username = ?', [ req.params.user ], function (err, rows) {

    if (err) {

      /*
       * Send an error response if there was a problem fetching the person
       * from the DB.
       */
      console.log("== Error fetching person (", req.params.user, ") from database:", err);
      res.status(500).send("Error fetching person from database: " + err);

    } else if (rows.length >= 0) {

      /*
       * If we got at least one row (should be exactly 1), then we found the
       * requested person.  Fetch that person's photos as well.
       */
      var person = rows[0];

      mysqlConnection.query('SELECT * FROM STUDENT WHERE username = ?', [ req.params.user ], function (err, rows) {

        if (err) {

          /*
           * Send an error response if there was a problem fetching the photos
           * from the DB.
           */
          console.log("== Error fetching classid for user (", req.params.person, ") from database:", err);
          res.status(500).send("Error fetching classid from database: " + err);

        } else {

          /*
           * Put each of the photos we fetched from the DB into an array to
           * be passed along to Handlebars.
           */
          var class_info = [];
          rows.forEach(function (row) {
            class_info.push({
              classid: row.Course_id,
              weekday: row.Weekday,
             time:row.Time  ,
             details:row.Detail
            });
          });

          // Render the page, sending all the needed info to Handlebars.
          res.render('schedule', {
            pageTitle: "schedule",
            person: {
              
              class_info: class_info
            }
          });

        }

      });

    } else {

      /*
       * If there wasn't info for the requested person in the DB (i.e. if we
       * didn't get any rows back from our query), then fall through to a 404.
       */
      next();

    }

  });

});

app.post('/schedule/:user/add-class', function (req, res, next) {

  /*
   * If the POST body contains a photo URL, then add the new photo to the
   * person's photos in the DB and respond with success.  Otherweise, let the
   * client know they made a bad request.
   */
  /*if (req.body && req.body.url) {
    mysqlConnection.query(
      'INSERT INTO photos (userid, url, caption) VALUES (?, ?, ?)',
      [ req.params.person, req.body.url, req.body.caption ],
      function (err, result) {
        if (err) {
          
          console.log("== Error inserting photos for person (", req.params.person, ") from database:", err);
          res.status(500).send("Error inserting photos itnto database: " + err);
        }
        res.status(200).send();
      });
  } else {
    res.status(400).send("Person photo must have a URL.");
  }
*/
if (req.body && req.body.classid) {
    mysqlConnection.query(
      'INSERT INTO STUDENT (username, No, Course_id,Weekday,Time,Detail) VALUES (?,?,?,?,?,?)',
      [ req.params.user , '1', req.body.classid,req.body.weekday,req.body.time,req.body.details ],
      function (err, result) {
        if (err) {
          /*
           * Send an error response if there was a problem inserting the photos
           * into the DB.
           */
          console.log("== Error inserting photos for person (", req.params.user, ") from database:", err);
          res.status(500).send("Error inserting photos itnto database: " + err);
        }
        res.status(200).send();
      });
  } else {
    res.status(400).send("Person photo must have a URL.");
  }





});
//////////////////
app.post('/schedule/:user/delete-notes', function (req, res, next) {

  
if (req.body && req.body.classid) {
    mysqlConnection.query(
      'DELETE FROM STUDENT  WHERE username=? AND Course_id=? AND Weekday=? AND Time=? AND Detail=?', 
      [ req.params.user ,  req.body.classid, req.body.weekday,req.body.time,req.body.details ],
      function (err, result) {
        if (err) {
          /*
           * Send an error response if there was a problem inserting the photos
           * into the DB.
           */
          console.log("== Error inserting photos for person (", req.params.user, ") from database:", err);
          res.status(500).send("Error inserting photos itnto database: " + err);
        }
        res.status(200).send();
      });
  } else {
    res.status(400).send("Person photo must have a URL.");
  }





});





// If we didn't find the requested resource, send a 404 error.
app.get('*', function(req, res) {
  res.status(404).render('404-page', {
    pageTitle: '404'
  });
});

// Listen on the specified port.
app.listen(port, function () {
  console.log("== Listening on port", port);
});
