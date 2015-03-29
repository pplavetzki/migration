/**
 * Created by paul on 3/26/15.
 */
class Switch{
    meta:{
        ipAddress:string;
        hostname:string;
        model:string;
    };
    interfaces:any[];
    constructor(){
        this.meta = {ipAddress:'', hostname:'', model:''};
    }
}

export = Switch;