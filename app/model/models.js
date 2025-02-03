sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/model/odata/v4/ODataModel"],
  function (JSONModel, ODataModel) {
    "use strict";

    return {
      getModel: function (sModelName, oComponent) {
        if (!oComponent) return null;
        return oComponent.getModel(sModelName);
      },

      createJSONModel: function (oData = {}) {
        return new JSONModel(oData);
      },

      createODataModel: function (sServiceUrl) {
        return new ODataModel({
          serviceUrl: sServiceUrl,
          synchronizationMode: "None",
        });
      },

      updateModelData: function (oModel, oNewData) {
        if (oModel && oNewData) {
          oModel.setData(oNewData);
          oModel.refresh(true); 
        }
      },

      getI18nModel: function (oComponent) {
        return this.getModel("i18n", oComponent);
      },
    };
  }
);
