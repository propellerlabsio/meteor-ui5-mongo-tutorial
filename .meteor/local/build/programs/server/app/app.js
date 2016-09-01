var require = meteorInstall({"imports":{"api":{"tasks.js":["meteor/mongo",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// imports/api/tasks.js                                                            //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
module.export({tasks:function(){return tasks}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});
                                                                                   //
// Create a Mongo collection called 'tasks'                                        //
var tasks = new Mongo.Collection('Tasks');                                         // 4
/////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["../imports/api/tasks.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// server/main.js                                                                  //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
var tasks;module.import('../imports/api/tasks.js',{"tasks":function(v){tasks=v}});
/////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
