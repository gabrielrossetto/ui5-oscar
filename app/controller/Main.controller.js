sap.ui.define(
  ["sap/ui/core/mvc/Controller", "../model/models"],
  function (Controller, models) {
    "use strict";
    return Controller.extend("oscar.challenge.controller.Main", {
      onInit: async function () {
        var oComponent = this.getOwnerComponent();
        var oModel = models.createWinnersModel(oComponent);
        if (!oModel) return;

        this.getView().setModel(oModel, "winners");

        await this._loadAdditionalData();
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

        var oDetailedModel = new sap.ui.model.json.JSONModel({
          Awards: aDetailedAwards,
        });
        this.getView().setModel(oDetailedModel, "winnersDetailed");
      },
      _fetchActorName: async function (actorId) {
        return fetch(`/odata/v4/oscar/Actors('${actorId}')`).then((res) =>
          res.json()
        );
      },
      _fetchFilmTitle: async function (filmId) {
        return fetch(`/odata/v4/oscar/Films('${filmId}')`).then((res) =>
          res.json()
        );
      },
      _fetchCategoryName: async function (categoryId) {
        return fetch(`/odata/v4/oscar/Categories('${categoryId}')`).then(
          (res) => res.json()
        );
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
