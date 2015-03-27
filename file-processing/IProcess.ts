/**
 * Created by paul on 3/26/15.
 */
import Switch = require('./Switch');

export interface IProcess{
    process(filePath:string, callback:any): void;
}