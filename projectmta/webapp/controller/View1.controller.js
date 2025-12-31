sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/ODataModel",
    "sap/ui/model/json/JSONModel",
], (Controller, ODataModel, JSONModel) => {
    "use strict";

    return Controller.extend("projectmta.controller.View1", {
        onInit() {
            // this.initateOdataModel();
            this.odataModel = this.getOwnerComponent().getModel();
            this._setHeader();
        },
        _setHeader: function () {
            // var _Suser = "haktan.kosem@iksap.com";
            

           if (sap.ushell && sap.ushell.Container) {
                var oUserInfo = sap.ushell.Container.getService("UserInfo");
                var _Suser = oUserInfo.getUser().getEmail(); // Kullanıcının email adresi
                 
}else{
    _Suser = "haktan.kosem@iksap.com";
}
            var url = "/HeaderSet(Suser='" + _Suser + "')";
            var js = this.getEntity(false, url, [], "");
            this.getView().setModel(js, "HeaderModel");
        },
        getEntity: function (a, e, f, s) {

            var jsonModel = new sap.ui.model.json.JSONModel();

            // search boş değilse url'ye search eklenir.
            if (s !== "" && s !== undefined) {
                e = e + "?search=" + s + "";
            }
            this.odataModel.read(e, {
                filters: f,
                async: a,
                success: function (o) {
                    if (o !== undefined) {
                        jsonModel.setData(o);
                    }

                },
                error: function (error) {
                    //
                }
            });
            return jsonModel;
        },
        oDataModel: function () {
            var ODataServiceUrl = this.serviceUrl();
            var odataModel = new ODataModel(ODataServiceUrl, {
                json: true
            });
            return odataModel;
        },
        serviceUrl: function () {
            return "sap/opu/odata/sap/ZHCM_SHIFT_PLANNING_SRV/";
        },
        initateOdataModel: function () {
            this.odataModel = this.oDataModel();
        },
    });
});