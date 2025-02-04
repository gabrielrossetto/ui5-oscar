sap.ui.define(
  ["sap/ui/core/mvc/Controller", "../model/models", "sap/m/MessageToast"],
  function (Controller, models, MessageToast) {
    "use strict";

    return Controller.extend("oscar.challenge.controller.AwardForm", {
      onInit: function () {
        var oComponent = this.getOwnerComponent();
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

        oRouter
          .getRoute("AwardForm")
          .attachPatternMatched(this._onRouteMatched, this);

        this.getView().setModel(
          models.getModel("actors", oComponent),
          "actors"
        );
        this.getView().setModel(models.getModel("films", oComponent), "films");
        this.getView().setModel(
          models.getModel("categories", oComponent),
          "categories"
        );

        this.getView().attachModelContextChange(
          this._onModelContextChange,
          this
        );
      },

      _onModelContextChange: function () {
        var oI18nModel = models.getI18nModel(this.getOwnerComponent());

        if (oI18nModel) {
          this._updateButtonLabel();
          this.getView().detachModelContextChange(
            this._onModelContextChange,
            this
          );
        }
      },

      _updateButtonLabel: function (sAwardId) {
        var oI18nModel = models.getI18nModel(this.getOwnerComponent());
        if (!oI18nModel) return;

        var oResourceBundle = oI18nModel.getResourceBundle();
        var oSaveButton = this.getView().byId("saveButton");

        if (oSaveButton) {
          oSaveButton.setText(
            sAwardId
              ? oResourceBundle.getText("buttonSave")
              : oResourceBundle.getText("buttonNew")
          );
        }
      },

      _onRouteMatched: function (oEvent) {
        var sAwardId = oEvent.getParameter("arguments").awardId;

        if (sAwardId) {
          this._loadAwardData(sAwardId);
        } else {
          this._resetForm();
          this.getView().getModel("award").refresh(true);
        }

        this._updateButtonLabel(sAwardId);
      },

      _loadAwardData: function (sAwardId) {
        var oI18nModel = models.getI18nModel(this.getOwnerComponent());
        var oResourceBundle = oI18nModel.getResourceBundle();

        fetch(`/odata/v4/oscar/Awards('${sAwardId}')`)
          .then((response) => response.json())
          .then((oData) => {
            var oModel = models.createJSONModel(oData);
            this.getView().setModel(oModel, "award");
          })
          .catch((error) => {
            console.error(error);
            MessageToast.show(
              error?.message ||
                oResourceBundle.getText("awardFormLoadErrorMessage")
            );
          });
      },

      _resetForm: function () {
        var oEmptyData = {
          actor_ID: this.byId("actorSelect").getSelectedKey(),
          film_ID: this.byId("movieSelect").getSelectedKey(),
          category_ID: this.byId("categorySelect").getSelectedKey(),
          year: new Date().getFullYear(),
        };
        this.getView().setModel(models.createJSONModel(oEmptyData), "award");
      },

      onCancel: function () {
        sap.ui.core.UIComponent.getRouterFor(this).navTo("Main");
      },

      onSaveAward: function () {
        var oI18nModel = models.getI18nModel(this.getOwnerComponent());
        var oResourceBundle = oI18nModel.getResourceBundle();
        var oAward = this.getView().getModel("award").getData();

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
          .then(() => {
            sap.ui
              .getCore()
              .getEventBus()
              .publish("AwardsChannel", "AwardAdded");

            MessageToast.show(
              oResourceBundle.getText("awardFormSaveSuccessMessage"),
              {
                duration: 1000,
                animationDuration: 100,
                onClose: () => {
                  sap.ui.core.UIComponent.getRouterFor(this).navTo("Main");
                },
              }
            );
          })
          .catch((error) => {
            console.error(error);
            MessageToast.show(
              error?.message ||
                oResourceBundle.getText("awardFormSaveErrorMessage")
            );
          });
      },
    });
  }
);
