/**
 * Created by paul on 3/22/15.
 */
var RegExUtil = (function () {
    function RegExUtil() {
        var _this = this;
        this.getIPAddress = function (data) {
            var ipRegEx = / ip address (\b(?:[0-9]{1,3}\.){3}[0-9]{1,3})\b/;
            var ipAddressMatch = ipRegEx.exec(data);
            return ipAddressMatch[1];
        };
        this.getHostname = function (data) {
            var hostNameRegEx = /hostname (.*)/;
            var hostNameMatch = hostNameRegEx.exec(data);
            return hostNameMatch[1];
        };
        this.getModel = function (data) {
            var modelRegex = /Model number\s*:\s(.*)/;
            var modelMatch = modelRegex.exec(data);
            return modelMatch[1];
        };
        this.getValues = function (data) {
            var values = [];
            var regEx1 = /\D{8,}(\d{1,2})/;
            var regEx2 = /\D{8,}\d{1,2}\/(\d{1,2})/;
            var regEx3 = /\D{8,}\d{1,2}\/\d{1,2}\/(\d{1,2})/;
            values.push(regEx1.exec(data)[1]);
            values.push(regEx2.exec(data)[1]);
            values.push(regEx3.exec(data)[1]);
            return values;
        };
        this.getInterface = function (data) {
            var regEx = /interface (.+\d{1,2}\/\d{1,2}\/\d{1,2})/;
            var expression = regEx.exec(data);
            if (expression) {
                return expression[1];
            }
            else {
                return null;
            }
        };
        this.getDataLan = function (data) {
            var regEx = /\baccess vlan (\d{1,3})/;
            var expression = regEx.exec(data);
            if (expression) {
                return expression[1];
            }
            else {
                return null;
            }
        };
        this.getDescription = function (data) {
            var regEx = /\bdescription (.*)/;
            var expression = regEx.exec(data);
            if (expression) {
                return expression[1];
            }
            else {
                return null;
            }
        };
        this.getVlanStatus = function (interfaceData, data) {
            var interface = _this.getInterface(interfaceData);
            var interfaceReg = interface.replace(/\//g, "\\/");
            interfaceReg += ' is (.*)(?=,)';
            var interfaceRegEx = RegExp(interfaceReg);
            var matches = interfaceRegEx.exec(data);
            if (matches) {
                return matches[1];
            }
            else {
                return null;
            }
        };
        this.getVoiceLan = function (data) {
            var regEx = /\bvoice vlan (\d{1,3})/;
            var expression = regEx.exec(data);
            if (expression) {
                return expression[1];
            }
            else {
                return null;
            }
        };
    }
    return RegExUtil;
})();
module.exports = RegExUtil;
//# sourceMappingURL=RegExUtil.js.map