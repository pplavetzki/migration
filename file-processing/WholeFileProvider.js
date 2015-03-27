/**
 * Created by paul on 3/26/15.
 */
/**
 * Created by paul on 3/21/15.
 */
/**
 * Created by paul on 3/11/15.
 */
///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/node_redis/node_redis.d.ts"/>
var RegExUtil = require('./RegExUtil');
var Switch = require('./Switch');
var fs = require('fs');
var WholeFileProvider = (function () {
    function WholeFileProvider() {
        var _this = this;
        this.callback = function (err, mySwitch) {
            _this.parentCallback(null, mySwitch);
        };
        this.parse = function (filePath, callback) {
            var myData = new Switch();
            fs.readFile(filePath, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var util = new RegExUtil();
                var regEx = /interface ([\s\S]*?)(?=!)/g;
                var interfaceMatches;
                myData.ipAddress = util.getIPAddress(data);
                myData.hostname = util.getHostname(data);
                myData.model = util.getModel(data);
                myData.interfaces = [];
                var fastEther;
                var dataVlan;
                var voiceVlan;
                var status;
                var description;
                var values;
                while ((interfaceMatches = regEx.exec(data)) !== null) {
                    fastEther = util.getInterface(interfaceMatches[0]);
                    if (fastEther) {
                        dataVlan = util.getDataLan(interfaceMatches[0]);
                        voiceVlan = util.getVoiceLan(interfaceMatches[0]);
                        status = util.getVlanStatus(interfaceMatches[0], data);
                        description = util.getDescription(interfaceMatches[0]);
                        values = util.getValues(fastEther);
                        var interface = {
                            "id": fastEther,
                            "dataVlan": dataVlan,
                            "voiceVlan": voiceVlan,
                            "status": status,
                            "description": description,
                            "zero": values[0],
                            "one": values[1],
                            "two": values[2]
                        };
                        myData.interfaces.push(interface);
                    }
                }
                callback(null, myData);
            });
        };
    }
    WholeFileProvider.prototype.process = function (filePath, callback) {
        this.parentCallback = callback;
        var mySwitch = this.parse(filePath, this.callback);
    };
    return WholeFileProvider;
})();
module.exports = WholeFileProvider;
//# sourceMappingURL=WholeFileProvider.js.map