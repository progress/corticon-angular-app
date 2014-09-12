# Corticon Angular App

This is an app using Socket.io and Angular that uses Corticon as the backend. It is based of the [Angular Socket.io Seed](https://github.com/btford/angular-socket-io-seed)
The app can be viewed on http://counter-22161.onmodulus.net/

## How to use corticon-angular-app

Clone the corticon-angular-app repository, run `npm install` to grab the dependencies, and start hacking!

### Running the app

Runs like a typical express app:

    node app.js

## Directory Layout
    
    app.js                  --> app config. also contains Socket.io connections to the AngularJS frontent.
    package.json            --> for npm
    bower.json              --> for bower (this repository comes with the necessary AngularJS modules, but bower can also be used)
    public/                 --> all of the files to be used in on the client side
      bower_components/     --> bower modules
        angular-socket-io   --> module for socket.io with angular
      css/                  --> css files
        app.css             --> default stylesheet
      js/                   --> javascript files
        app.js              --> declare top-level app module
        controllers.js      --> application controllers
        directives.js       --> custom angular directives
        filters.js          --> custom angular filters
        services.js         --> custom angular services
    routes/
      api.js                --> route for serving JSON. This is simulating Corticon.
      index.js              --> route for serving HTML pages and partials
    views/
      index.jade            --> main page for app
      layout.jade           --> doctype, title, head boilerplate

## Contact

For a blog post on this project please check out http://mendoncakeegan.wordpress.com/2014/09/04/corticon-counter <br />
For more on Corticon please check out http://www.progress.com/products/corticon <br />
For more on AngularJS please check out http://angularjs.org/ <br />
For more on NodeJS please check out http://nodejs.org/ <br />

## License

MIT
