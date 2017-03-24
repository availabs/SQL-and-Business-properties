//Module dependencies
var application_root = __dirname,
    express = require( 'express' ); //Web framework

//Create server
var app = express();

// Configure server
app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method
    app.use( app.router );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Router
//Get a list of all books
app.get( '/api/books', function( request, response ) {
    var books = [
            {
                title: "Book 1",
                author: "Author 1",
                releaseDate: "01/01/2014"
            },
            {
                title: "Book 2",
                author: "Author 2",
                releaseDate: "02/02/2014"
            }
        ];

    response.send(books);
});
//Insert a new book
app.post( '/api/books', function( request, response ) {
    var book = {
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate
    };
    
    response.send(book);
});
//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
    var book = {
        title: "Unique Book",
        author: "Unique Author",
        releaseDate: "03/03/2014"
    };
    
    response.send(book);
});
//Update a book
app.put( '/api/books/:id', function( request, response ) {
    response.send("Updated!");
});
//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    response.send("Deleted");
});

//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
}); 
