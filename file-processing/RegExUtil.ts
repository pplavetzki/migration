/**
 * Created by paul on 3/22/15.
 */
class RegExUtil{

    getIPAddress = (data:string): string => {
        var ipRegEx:RegExp = / ip address (\b(?:[0-9]{1,3}\.){3}[0-9]{1,3})\b/;

        var ipAddressMatch:any = ipRegEx.exec(data);
        return ipAddressMatch[1];
    };

    getHostname = (data:string): string => {
        var hostNameRegEx:RegExp = /hostname (.*)/;
        var hostNameMatch:any = hostNameRegEx.exec(data);

        return hostNameMatch[1];
    };

    getModel = (data:string): string => {
        var modelRegex:RegExp = /Model number\s*:\s(.*)/;
        var modelMatch:any = modelRegex.exec(data);

        return modelMatch[1];
    };

    getValues = (data:string): Array<string> => {
        var values:Array<string> = [];
        var regEx1:RegExp = /\D{8,}(\d{1,2})/;
        var regEx2:RegExp = /\D{8,}\d{1,2}\/(\d{1,2})/;
        var regEx3:RegExp = /\D{8,}\d{1,2}\/\d{1,2}\/(\d{1,2})/;

        values.push(regEx1.exec(data)[1]);
        values.push(regEx2.exec(data)[1]);
        values.push(regEx3.exec(data)[1]);

        return values;
    };

    getInterface = (data:string): string => {
        var regEx:RegExp = /interface (.+\d{1,2}\/\d{1,2}\/\d{1,2})/;
        var expression:any = regEx.exec(data);
        if(expression){
            return expression[1];
        }
        else {
            return null;
        }
    }

    getDataLan = (data:string): string => {
        var regEx:RegExp = /\baccess vlan (\d{1,3})/;
        var expression:any = regEx.exec(data);
        if(expression){
            return expression[1];
        }
        else {
            return null;
        }
    };

    getDescription = (data:string): string => {
        var regEx:RegExp = /\bdescription (.*)/;
        var expression:any = regEx.exec(data);
        if(expression){
            return expression[1];
        }
        else {
            return null;
        }
    };

    getVlanStatus = (interfaceData:string, data:string): string => {
        var interface:string = this.getInterface(interfaceData);
        var interfaceReg:string = interface.replace(/\//g, "\\/");
        interfaceReg += ' is (.*)(?=,)';
        var interfaceRegEx:RegExp = RegExp(interfaceReg);
        var matches = interfaceRegEx.exec(data);

        if(matches){
            return matches[1];
        }
        else {
            return null;
        }
    };

    getVoiceLan = (data:string): string => {
        var regEx:RegExp = /\bvoice vlan (\d{1,3})/;
        var expression:any = regEx.exec(data);
        if(expression){
            return expression[1];
        }
        else {
            return null;
        }
    };

}

export = RegExUtil;
