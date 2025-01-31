sap.ui.define(
  ["sap/ui/core/mvc/Controller", "../model/models"],
  function (Controller, models) {
    "use strict";
    return Controller.extend("oscar.challenge.controller.Main", {
      onInit: function () {
        var oComponent = this.getOwnerComponent();
        var oModel = models.createWinnersModel(oComponent);
        if (!oModel) return;

        this.getView().setModel(oModel, "winners");
      },
      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("newValue");
        var oBinding = this.byId("winnersTable").getBinding("items");
        var oFilter = new sap.ui.model.Filter(
          "name",
          sap.ui.model.FilterOperator.Contains,
          sQuery
        );
        oBinding.filter([oFilter]);
      },
      onAddAward: function () {
        console.log("add New Award click");
      },
    });
  }
);
