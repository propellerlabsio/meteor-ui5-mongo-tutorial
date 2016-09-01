var require = meteorInstall({"client":{"template.index.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// client/template.index.js                                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.startup(function() {                                          // 1
  var attrs = {"class":"sapUiBody"};                                 // 2
  for (var prop in attrs) {                                          // 3
    document.body.setAttribute(prop, attrs[prop]);                   // 4
  }                                                                  // 5
});                                                                  // 6
                                                                     // 7
///////////////////////////////////////////////////////////////////////

},"main.js":["../imports/api/tasks.js",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// client/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.import('../imports/api/tasks.js');                            // 1
                                                                     //
sap.ui.getCore().attachInit(function () {                            // 3
    // Create view                                                   //
    var oView = sap.ui.xmlview({                                     // 5
        viewName: "webapp.Tasks"                                     // 6
    });                                                              // 5
                                                                     //
    // Add it to new Shell and place at content div                  //
    new sap.m.Shell({                                                // 10
        app: oView                                                   // 11
    }).placeAt("content");                                           // 10
});                                                                  // 13
///////////////////////////////////////////////////////////////////////

}]},"imports":{"api":{"tasks.js":["meteor/mongo",function(require,exports,module){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// imports/api/tasks.js                                              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
module.export({tasks:function(){return tasks}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});
                                                                     //
// Create a Mongo collection called 'tasks'                          //
var tasks = new Mongo.Collection('Tasks');                           // 4
///////////////////////////////////////////////////////////////////////

}]}}},{"extensions":[".js",".json",".html"]});
require("./client/template.index.js");
require("./client/main.js");