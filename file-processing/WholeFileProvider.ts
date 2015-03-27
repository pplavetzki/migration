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

import iprocess = require('./IProcess');
import RegExUtil = require('./RegExUtil');
import redis = require("redis");
import Switch = require('./Switch');

var fs = require('fs');

class WholeFileProvider implements iprocess.IProcess{
    parentCallback:any;
    process(filePath:string, callback:any):void {
        this.parentCallback = callback;
        var mySwitch = this.parse(filePath, this.callback);
    }

    callback = (err:any, mySwitch:Switch) : void => {
        this.parentCallback(null, mySwitch);
    }

    parse = (filePath:string, callback:any) : void => {
        var myData:Switch = new Switch();

        fs.readFile(filePath, 'utf8', function(err, data){
            if(err){
                return console.log(err);
            }

            var util:RegExUtil = new RegExUtil();

            var regEx:RegExp = /interface ([\s\S]*?)(?=!)/g;
            var interfaceMatches;

            myData.ipAddress = util.getIPAddress(data);
            myData.hostname = util.getHostname(data);
            myData.model = util.getModel(data);
            myData.interfaces = [];

            var fastEther:string;
            var dataVlan:string;
            var voiceVlan:string;
            var status:string;
            var description:string;
            var values:Array<string>;

            while((interfaceMatches = regEx.exec(data)) !== null){
                fastEther = util.getInterface(interfaceMatches[0]);
                if(fastEther) {

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
                        "zero":values[0],
                        "one":values[1],
                        "two":values[2]
                    };

                    myData.interfaces.push(interface);
                }
            }

            callback(null, myData);
        });
    };
}
export = WholeFileProvider;