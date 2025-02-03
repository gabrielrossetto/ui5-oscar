sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("oscar.challenge.controller.AwardForm", {
    onInit: function () {
      var oComponent = this.getOwnerComponent();

      this.getView().setModel(oComponent.getModel("actors"), "actors");
      this.getView().setModel(oComponent.getModel("films"), "films");
      this.getView().setModel(oComponent.getModel("categories"), "categories");
    },

    onCancel: function () {
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("Main");
    },

    onSaveAward: function () {
      var oView = this.getView();

      var sActorId = oView.byId("actorSelect").getSelectedKey();
      var sFilmId = oView.byId("movieSelect").getSelectedKey();
      var sCategoryId = oView.byId("categorySelect").getSelectedKey();
      var iYear = new Date().getFullYear();

      if (!sActorId || !sFilmId || !sCategoryId) {
        return;
      }

      var oPayload = {
        actor_ID: sActorId,
        film_ID: sFilmId,
        category_ID: sCategoryId,
        year: iYear,
      };

      fetch("/odata/v4/oscar/Awards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oPayload),
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
