sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'jquery.sap.global',
  'meteor-ui5-mongo/model/Model',
  'sap/ui/model/json/JSONModel',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
  'sap/m/MessageBox'
], function(Controller, jQuery, MongoModel, JSONModel, Filter, FilterOperator, MessageBox) {
  "use strict";

  var CController = Controller.extend("webapp.Tasks", {

    oTasks: Mongo.Collection.get("Tasks"),

    onInit: function() {
      this._validateForm();
      // Include our custom style sheet
      jQuery.sap.includeStyleSheet("webapp/style.css");
      // Instantiate Mongo Model
      var oModel = new MongoModel();
      this.getView().setModel(oModel);

      // Our local view state model
      var oViewState = {
        showCompleted: true
      };
      var oViewModel = new JSONModel(oViewState);
      this.getView().setModel(oViewModel, "ViewState");
      var oBtnSignOut = this.byId("idConfirmSignOut");
      oBtnSignOut.setVisible(false);
    },

    onAddTask: function(oEvent){
      var oUser = Meteor.user();
      if (oUser._id){
        var oInput = oEvent.getSource();
        this.oTasks.insert({
          userId: oUser._id,
          text: oInput.getValue(),
          createdAt: new Date()
        });
        oInput.setValue();
      }
    },

    onPressDeleteTask: function(oEvent){
      if (Meteor.user()){
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
      }
    },

    onPressShowCompleted: function(){
      var oUser = Meteor.user();
      // Get current state of "show completed" toggle button
      var oViewState = this.getView().getModel('ViewState');
      var bShowCompleted = oViewState.getProperty('/showCompleted');

      // Build task filter according to current state
      var aFilters = [];
      if (!bShowCompleted){
        aFilters.push(new Filter({
          path: 'checked',
          operator: FilterOperator.NE,
          value1: true
        }));
      }
      if (oUser._id){
        aFilters.push(new Filter({
          path: 'userId',
          operator: FilterOperator.EQ,
          value1: oUser._id
        }));
      }
     // Set filter
      var oTaskList = this.byId("TaskList");
      oTaskList.getBinding('items').filter(aFilters);
    },

    onSelectionChange: function(oEvent){
      if (Meteor.user()){
        var oListItem = oEvent.getParameters().listItem;
        var oTaskData = oListItem.getBindingContext().getObject();

        // Set the checked property in the database to match the current selection
        this.oTasks.update(oTaskData._id, {
          $set: { checked: oListItem.getSelected() },
        });
      }
    },

    getTaskTextAsHtml: function(bChecked, sText){
      if (bChecked){
        return "<span class='completedTask'>" + sText + "</span>";
      } else {
        return sText;
      }
    },
    _getInputValues: function(){
      var oInputEmail = this.byId("inputEmail");
      var oInputPassword = this.byId("inputPassword");
      return {
        email: oInputEmail.getValue(),
        password: oInputPassword.getValue()
      }
    },

    // Users can log in if they already created account
    onLogInAccount: function(){
      var input = this._getInputValues();
      Meteor.loginWithPassword(input.email, input.password, (oError) => {
        if(oError){
          if(oError.message === "User not found [403]"){
            MessageBox.information("User not found. Please check your entries or create new account");
          } else if (oError.message === "Incorrect password [403]"){
            MessageBox.information("Incorrect password. Please try again");
          } else {
            MessageBox.error('Error Log In', {
              details: oError.toString()
            });
          }
        } else if (Meteor.user()){
          var oTasks = this.byId('TaskList');
          oTasks.setVisible(true);
          this._stateBtn();
          this._onFilterTasks();
        }
      });
    },

    // Filter tasks list by user Id 
    _onFilterTasks: function(){
      var oUser = Meteor.user();
      if (oUser._id) {
        var aFilter = new Filter({
          path: 'userId',
          operator: FilterOperator.EQ,
          value1: oUser._id
        });
        // Apply for filter 
        var oList = this.byId('TaskList');
        oList.getBinding('items').filter(aFilter);
      }
    },

    // Create new user for this account
    onCreateAccount: function(){
      var input = this._getInputValues();
      Accounts.createUser({ email: input.email, password: input.password }, (oError) => {
        if (oError){
          if (oError.message === "Email already exists. [403]") {
            MessageBox.information("Email already exists. Please log in with your password");
          } else if (oError.message === "Need to set a username or email [400]") {
            MessageBox.information("Need to provide email address");
          } else {
            MessageBox.error('Error Create Account', {
              details: oError.toString()
            });
          }

        } else {
          this._stateBtn();
          this._validateForm();
          this._onFilterTasks();
        }
      });
    },

    // Validate the form that only show if user is currently logged in
    _validateForm: function(){
      if (!Meteor.user()) {
        var oTasks = this.byId('TaskList');
        oTasks.setVisible(false);
      } else {
        var oTasks = this.byId('TaskList');
        oTasks.setVisible(true);
      }
    },

    // State Btn depending on user login and logout 
    _stateBtn: function(){
      if (Meteor.user()){
        var oSimpleForm = this.byId("formId");
        oSimpleForm.setVisible(false);
        var oBtnSignOut = this.byId("idConfirmSignOut");
        oBtnSignOut.setVisible(true);
        var oBtnCreateAccount = this.byId("idConfirmCreate");
        oBtnCreateAccount.setVisible(false);
        var oBtnLogInAccount = this.byId("idConfirmLogin");
        oBtnLogInAccount.setVisible(false);
      }
    },

    onSignOutAccount: function(){
      Meteor.logout((oError) => {
        if (oError){
          MessageBox.error("Error Logout", {
            details: oError.toString()
          })
        } else {
          var oSimpleForm = this.byId("formId");
          oSimpleForm.setVisible(true);
          var oBtnSignOut = this.byId("idConfirmSignOut");
          oBtnSignOut.setVisible(false);
          var oBtnCreateAccount = this.byId("idConfirmCreate");
          oBtnCreateAccount.setVisible(true);
          var oBtnLogInAccount = this.byId("idConfirmLogin");
          oBtnLogInAccount.setVisible(true);
          this._validateForm();
        }
      });
    }

  });

  return CController;

});
