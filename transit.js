// MTA stuff
var Mta = require('mta-gtfs');
var fs = require('fs');
var util = require('util');


const SERVICE_TYPES = {subway: 'subway', bus: 'bus', BT: 'BT',
LIRR: 'LIRR', MetroNort: 'MetroNort'}

export class Transit{

  constructor() {
    this.mta_object = new Mta({
      key: 'MY-MTA-API-KEY-HERE', // only needed for mta.schedule() method
      feed_id: 1                  // optional, default = 1
    });
  }

  // todo: Make this as a task that executes every 5 minutes.
  checkMTAStatus(serviceTypeArg, line, callbackObject) {
    const serviceType = serviceTypeArg || null;

    this.mta_object.status(serviceType).then(function (result) {
      const finalResult = result.filter(function(item){
          return item.name == line;
      });

      callbackObject.sendResultToUser(finalResult)
    }.bind(this));

  }

  // _parseServiceStatus(result, line){
  //   const finalResult = result.filter(function(item){
  //       return item.name == line;
  //   });
  //   console.log(finalResult);
  //   this.slackBot.sendResultToUser(finalResult);
  // }
}
