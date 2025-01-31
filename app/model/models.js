sap.ui.define([], function () {
  "use strict";

  return {
    createWinnersModel: function (oComponent) {
      if (!oComponent) return null;

      return oComponent.getModel("winners");
    },
  };
});
