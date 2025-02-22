sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
  ],
  function (UIComponent, ODataModel, ResourceModel, JSONModel, Device) {
    "use strict";

    return UIComponent.extend("oscar.challenge.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);

        jQuery.sap.includeStyleSheet("css/style.css");

        var oServiceUrl =
          this.getMetadata().getManifestEntry("sap.ui5").dataSources.mainService
            .uri;

        if (!oServiceUrl) return;

        var oModel = new ODataModel({
          serviceUrl: oServiceUrl,
          synchronizationMode: "None",
        });

        var i18nModel = new ResourceModel({
          bundleName: "oscar.challenge.i18n.i18n",
        });

        var oDeviceModel = new JSONModel({
          isPhone: Device.system.phone,
          isTablet: Device.system.tablet,
          isDesktop: Device.system.desktop,
        });

        this.setModel(oDeviceModel, "device");
        this.setModel(i18nModel, "i18n");
        this.setModel(oModel, "winners");
        this.setModel(oModel, "actors");
        this.setModel(oModel, "films");
        this.setModel(oModel, "categories");

        this.getRouter().initialize();
      },
    });
  }
);
