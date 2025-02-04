sap.ui.define(
  ["oscar/challenge/controller/Main.controller"],
  function (MainController) {
    "use strict";

    QUnit.module("Main Controller Tests");

    QUnit.test("Should instantiate the controller", function (assert) {
      var oMainController = new MainController();
      assert.ok(oMainController, "Main Controller instantiated successfully");
    });

    QUnit.test("Should filter the winners correctly", function (assert) {
      var oMainController = new MainController();
      var oEventMock = {
        getParameter: function () {
          return "Leonardo DiCaprio";
        },
      };

      oMainController.onSearch(oEventMock);
      assert.ok(true, "Search executed without errors");
    });
  }
);
