sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'meteor-ui5-mongo/model/Model'
], function(Controller, MongoModel) {
  "use strict";

  var CController = Controller.extend("webapp.Tasks", {

    onInit: function() {
      var oModel = new MongoModel();
      this.getView().setModel(oModel);
    },

    onAddTask: function(oEvent){
        var oInput = oEvent.getSource();
        Mongo.Collection.get("Tasks").insert({
            text: oInput.getValue(),
            createdAt: new Date()
        });
        oInput.setValue();
    }

  });

  return CController;

});
