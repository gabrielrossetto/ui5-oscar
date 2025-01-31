sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/odata/v4/ODataModel"],
  function (UIComponent, ODataModel) {
    "use strict";

    return UIComponent.extend("oscar.challenge.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);

        var oServiceUrl =
          this.getMetadata().getManifestEntry("sap.ui5").dataSources.mainService
            .uri;

        if (!oServiceUrl) return;

        var oModel = new ODataModel({
          serviceUrl: oServiceUrl,
          synchronizationMode: "None",
        });

        this.setModel(oModel, "winners");
      },
    });
  }
);
