sap.ui.define(
  ["sap/ui/core/mvc/Controller", "../model/models"],
  function (Controller, models) {
    "use strict";

    return Controller.extend("oscar.challenge.controller.Main", {
      onInit: function () {
        var oModel = models.getModel("winners", this.getOwnerComponent());
        if (!oModel) return;

        this.getView().setModel(oModel, "winners");

        this._loadAdditionalData();

        var oEventBus = sap.ui.getCore().getEventBus();
        oEventBus.subscribe(
          "AwardsChannel",
          "AwardAdded",
          this._reloadData,
          this
        );
      },

      _reloadData: function () {
        this._loadAdditionalData();
      },

      _loadAdditionalData: async function () {
        var oModel = this.getView().getModel("winners");

        try {
          var aContexts = await oModel
            .bindList("/Awards", null, null, null, {
              $expand: {
                actor: true,
                film: true,
                category: true,
              },
            })
            .requestContexts();

          var aAwards = aContexts.map((context) => {
            var oAward = context.getObject();
            return {
              ...oAward,
              actorName: oAward.actor?.name || "Unknown Actor",
              filmTitle: oAward.film?.title || "Unknown Film",
              categoryName: oAward.category?.name || "Unknown Category",
            };
          });

          aAwards.sort((a, b) => b.year - a.year);

          this.getView().setModel(
            models.createJSONModel({ Awards: aAwards }),
            "winnersDetailed"
          );
        } catch (error) {
          console.error("Error fetching Awards data:", error);
        }
      },

      onSearch: function (oEvent) {
        var sQuery = oEvent.getParameter("newValue").toLowerCase();
        var oBinding = this.byId("winnersTable").getBinding("items");

        if (!sQuery) {
          oBinding.filter([]);
          return;
        }

        var aFilters = [
          new sap.ui.model.Filter(
            "actorName",
            sap.ui.model.FilterOperator.Contains,
            sQuery
          ),
          new sap.ui.model.Filter(
            "filmTitle",
            sap.ui.model.FilterOperator.Contains,
            sQuery
          ),
          new sap.ui.model.Filter(
            "categoryName",
            sap.ui.model.FilterOperator.Contains,
            sQuery
          ),
        ];

        var oCombinedFilter = new sap.ui.model.Filter({
          filters: aFilters,
          and: false,
        });

        oBinding.filter(oCombinedFilter);
      },

      onAddAward: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("AwardForm", {}, true);
      },

      onAwardPress: function (oEvent) {
        var oItem = oEvent.getSource();
        var oCtx = oItem.getBindingContext("winnersDetailed");
        var sAwardId = oCtx.getProperty("ID");

        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("AwardForm", { awardId: sAwardId });
      },
    });
  }
);
