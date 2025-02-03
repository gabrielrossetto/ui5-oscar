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

        var aContexts = await oModel.bindList("/Awards").requestContexts();
        var aAwards = aContexts.map((context) => context.getObject());

        var aPromises = aAwards.map(async (award) => {
          let [actor, film, category] = await Promise.all([
            this._fetchActorName(award.actor_ID),
            this._fetchFilmTitle(award.film_ID),
            this._fetchCategoryName(award.category_ID),
          ]);

          return {
            ...award,
            actorName: actor.name,
            filmTitle: film.title,
            categoryName: category.name,
          };
        });

        var aDetailedAwards = await Promise.all(aPromises);

        aDetailedAwards.sort((a, b) => b.year - a.year);

        this.getView().setModel(
          models.createJSONModel({ Awards: aDetailedAwards }),
          "winnersDetailed"
        );
      },

      _fetchActorName: function (actorId) {
        return fetch(`/odata/v4/oscar/Actors('${actorId}')`).then((res) =>
          res.json()
        );
      },

      _fetchFilmTitle: function (filmId) {
        return fetch(`/odata/v4/oscar/Films('${filmId}')`).then((res) =>
          res.json()
        );
      },

      _fetchCategoryName: function (categoryId) {
        return fetch(`/odata/v4/oscar/Categories('${categoryId}')`).then(
          (res) => res.json()
        );
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
