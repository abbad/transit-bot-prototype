var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || 'xoxp-183436136117-184141565894-184794945223-2ab2c4b8aeb194fc0bef0c07b3f358fc'; //see section above on sensitive data
var web = new WebClient(token);


web.channels.list(function(err, info) {
   if (err) {
       console.log('Error:', err);
   } else {
       for(var i in info.channels) {
           console.log(info.channels[i]);
       }
   }
});
