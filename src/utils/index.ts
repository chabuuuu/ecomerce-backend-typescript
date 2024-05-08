import _ from 'lodash';

export function getInfoData (payload : {
    fields: string[],
    object: any
}){
    const {fields, object} = payload;
   return _.pick(object, fields); 
}