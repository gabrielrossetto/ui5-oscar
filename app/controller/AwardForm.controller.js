sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("oscar.challenge.controller.AwardForm", {
    onInit: function () {
      var oComponent = this.getOwnerComponent();
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

      oRouter
        .getRoute("AwardForm")
        .attachPatternMatched(this._onRouteMatched, this);

      this.getView().setModel(oComponent.getModel("actors"), "actors");
      this.getView().setModel(oComponent.getModel("films"), "films");
      this.getView().setModel(oComponent.getModel("categories"), "categories");
    },

    _onRouteMatched: function (oEvent) {
      var sAwardId = oEvent.getParameter("arguments").awardId;

      if (sAwardId) {
        this._loadAwardData(sAwardId);
      } else {
        this._resetForm();
      }
    },

    _loadAwardData: function (sAwardId) {
      var oView = this.getView();

      fetch(`/odata/v4/oscar/Awards('${sAwardId}')`)
        .then((response) => response.json())
        .then((oData) => {
          var oModel = new sap.ui.model.json.JSONModel(oData);
          oView.setModel(oModel, "award");
        })
        .catch((error) => {
          MessageToast.show("Error loading award data.");
          console.error(error);
        });
    },

    _resetForm: function () {
      var oEmptyData = {
        actor_ID: "",
        film_ID: "",
        category_ID: "",
        year: new Date().getFullYear(),
      };
      this.getView().setModel(
        new sap.ui.model.json.JSONModel(oEmptyData),
        "award"
      );
    },

    onCancel: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Main");
    },

    onSaveAward: function () {
      var oView = this.getView();
      var oAward = oView.getModel("award").getData();

      if (!oAward.actor_ID || !oAward.film_ID || !oAward.category_ID) return;

      var sUrl = "/odata/v4/oscar/Awards";
      var sMethod = "POST";

      if (oAward.ID) {
        sUrl += `('${oAward.ID}')`;
        sMethod = "PUT";
      }

      fetch(sUrl, {
        method: sMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(oAward),
      })
        .then((response) => response.json())
        .then((data) => {
          sap.ui.getCore().getEventBus().publish("AwardsChannel", "AwardAdded");

          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("Main");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
});
