sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
  "use strict";

  var CController = Controller.extend("webapp.Tasks", {

    onInit: function() {
      var oModel = new JSONModel({
        Tasks: [{
          text: 'This is task 1'
        }, {
          text: 'This is task 2'
        }, {
          text: 'This is task 3'
        }, ]
      });
      this.getView().setModel(oModel);
    }

  });

  return CController;

});
