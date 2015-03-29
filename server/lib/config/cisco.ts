/**
 * Created by paul on 3/29/15.
 */
///<reference path="../../../typings/express/express.d.ts"/>
///<reference path="../../../typings/node_redis/node_redis.d.ts"/>

import redis = require("redis");
import express = require('express');

var cisco = express.Router();

cisco.get('/', function(req:any, res:any) {
    var client:any = redis.createClient(6379, '127.0.0.1', {});
    client.get('interface:10.169.15.113:FastEthernet2/0/15', function(err, data){
        res.type('json');
        res.json(JSON.parse(data));
    });
    client.quit();
});

cisco.get('/ipAddresses', function(req:any, res:any) {
    var client:any = redis.createClient(6379, '127.0.0.1', {});
    client.smembers('ipAddresses', function(err, data){
        res.type('json');
        res.json(data);
    });
    client.quit();
});

cisco.get('/switch/:ip', function(req:any, res:any) {
    var client:any = redis.createClient(6379, '127.0.0.1', {});
    client.get('switch:' + req.params.ip, function(err, data){
        res.type('json');
        res.json(JSON.parse(data));
    });
    client.quit();
});

cisco.get('/interfaces/:ip', function(req:any, res:any) {
    var client:any = redis.createClient(6379, '127.0.0.1', {});
    client.smembers('interfaces:' + req.params.ip, function(err, data){
        res.type('json');
        res.json(data);
    });
    client.quit();
});

cisco.get('/interface/:ip/:interface', function(req:any, res:any) {
    var client:any = redis.createClient(6379, '127.0.0.1', {});
    client.get('interface:' + req.params.ip + ':' + req.params.interface, function(err, data){
        res.type('json');
        res.json(data);
    });
    client.quit();
});

export = cisco;