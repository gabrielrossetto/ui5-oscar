sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  return {
    getModel: function (sModelName, oComponent) {
      if (!oComponent) return null;
      return oComponent.getModel(sModelName);
    },

    createJSONModel: function (oData = {}) {
      return new JSONModel(oData);
    },

    getI18nModel: function (oComponent) {
      return this.getModel("i18n", oComponent);
    },
  };
});
