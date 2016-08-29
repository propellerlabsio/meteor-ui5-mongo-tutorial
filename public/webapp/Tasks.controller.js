sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'jquery.sap.global',
  'meteor-ui5-mongo/model/Model'
], function(Controller, jQuery, MongoModel) {
  "use strict";

  var CController = Controller.extend("webapp.Tasks", {

    oTasks: Mongo.Collection.get("Tasks"),

    onInit: function() {
      // Include our custom style sheet
      jQuery.sap.includeStyleSheet("webapp/style.css");
      
      // Instantiate Mongo Model
      var oModel = new MongoModel();
      this.getView().setModel(oModel);
    },

    onAddTask: function(oEvent){
        var oInput = oEvent.getSource();
        this.oTasks.insert({
            text: oInput.getValue(),
            createdAt: new Date()
        });
        oInput.setValue();
    },

    onSelectionChange: function(oEvent){
      var oListItem = oEvent.getParameters().listItem;
      var oTaskData = oListItem.getBindingContext().getObject();

      // Set the checked property in the database to match the current selection
      this.oTasks.update(oTaskData._id, {
        $set: { checked: oListItem.getSelected() },
      });
    },

    getTaskTextAsHtml: function(bChecked, sText){
      if (bChecked){
        return "<span class='completedTask'>" + sText + "</span>";
      } else {
        return sText;
      }
    }

  });

  return CController;

});
