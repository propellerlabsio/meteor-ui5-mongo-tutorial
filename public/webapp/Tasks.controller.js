sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'meteor-ui5-mongo/model/Model',
  'sap/m/MessageBox'
], function(Controller, MongoModel, MessageBox) {
  "use strict";

  var CController = Controller.extend("webapp.Tasks", {

    oTasks: Mongo.Collection.get("Tasks"),

    onInit: function() {
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

    onPressDeleteTask: function(oEvent){
      var oListItem = oEvent.getSource();
      var oTaskData = oListItem.getBindingContext().getObject();

      // Ask user to confirm delete
      var that = this;
      MessageBox.confirm("Permanently remove task?", {
        onClose: function(oAction){
          if (oAction === MessageBox.Action.OK){
            // Remove the task
            that.oTasks.remove(oTaskData._id);
          }
        }
      });
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
