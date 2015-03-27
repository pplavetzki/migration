/**
 * Created by paul on 3/26/15.
 */
///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/node_redis/node_redis.d.ts"/>
var redis = require("redis");
var RedisProvider = (function () {
    function RedisProvider() {
        this.addSwitch = function (switchData, callback) {
            var client = redis.createClient(6379, '127.0.0.1', {});
            client.sadd("ipAddresses", switchData.ipAddress, function (err, obj) {
                if (err) {
                    console.log(err);
                }
            });
            for (var i = 0; i < switchData.interfaces.length; i++) {
                if (switchData.interfaces[i] && switchData.interfaces[i].id) {
                    client.sadd(switchData.ipAddress, switchData.interfaces[i].id, function (err, obj) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    client.set(switchData.ipAddress + ':' + switchData.interfaces[i].id, JSON.stringify(switchData.interfaces[i]), function (err, obj) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
            client.quit();
            callback(null, { result: true });
        };
    }
    return RedisProvider;
})();
module.exports = RedisProvider;
//# sourceMappingURL=RedisProvider.js.map