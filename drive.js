/**
 * Created by paul on 3/21/15.
 */
/**
 * Created by paul on 3/21/15.
 */
///<reference path="./typings/node/node.d.ts"/>
var WholeFileProvider = require('./file-processing/WholeFileProvider');
var RedisProvider = require('./file-processing/RedisProvider');
var fs = require('fs');
var wholeFile = new WholeFileProvider();
var redis = new RedisProvider();
if (!process.argv[2]) {
    console.log('Missing Directory!');
}
else {
    var directory = process.argv[2];
    fs.readdir(directory, function (err, files) {
        if (err)
            throw console.log(err);
        var fileProcessed = 0;
        var numFiles = files.length;
        files.forEach(function (fileName) {
            wholeFile.process(directory + '/' + fileName, function (err, data) {
                if (err)
                    console.log(err);
                if (data) {
                    console.log('processed file: ' + fileName);
                    redis.addSwitch(data, dataWritten);
                }
                fileProcessed++;
                if (fileProcessed === numFiles) {
                    console.log("Finished!");
                }
            });
        });
    });
    function dataWritten(err, data) {
        if (err)
            console.log(err);
        if (data) {
            console.log('Data Written');
        }
    }
}
//# sourceMappingURL=drive.js.map