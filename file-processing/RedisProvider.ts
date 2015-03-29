/**
 * Created by paul on 3/26/15.
 */
///<reference path="../typings/node/node.d.ts"/>
///<reference path="../typings/node_redis/node_redis.d.ts"/>

import redis = require("redis");
import Switch = require('./Switch');

class RedisProvider{

    addSwitch = (switchData:Switch, callback:any):void => {
        var client = redis.createClient(6379, '127.0.0.1', {});
        client.sadd("ipAddresses", switchData.meta.ipAddress, function(err, obj){
            if(err) {
                console.log(err);
            }
        });

         client.set('switch:' + switchData.meta.ipAddress, JSON.stringify(switchData.meta), function(err, obj){
             if(err){
                console.log(err);
             }
         });

        for(var i:number = 0;i < switchData.interfaces.length;i++){
            if(switchData.interfaces[i] && switchData.interfaces[i].id) {
                client.sadd('interfaces:' + switchData.meta.ipAddress, switchData.interfaces[i].id, function (err, obj) {
                    if (err) {
                        console.log(err);
                    }
                });

                client.set('interface:' + switchData.meta.ipAddress + ':' + switchData.interfaces[i].id, JSON.stringify(switchData.interfaces[i]), function (err, obj) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
        client.quit();
        callback(null, {result:true});
    };
}

export = RedisProvider;
