import {initial, lineStatus} from './string_commands';
import {Transit} from './transit';
import {EventEmitter} from './slackEventEmitters';
var SlackBot = require('slackbots');
var RtmClient = require('@slack/client').RtmClient;

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

export class SlackBotWrapper {

	constructor() {
		// Init transit.
		this.transit = new Transit();
		this.params = {
        icon_emoji: ':cat:'
    };

		// Init slack bot.
		this.bot_token = process.env.SLACK_BOT_TOKEN;
		this.slackBot = new SlackBot({token:this.bot_token, name: 'My Bot'})

		// Event handlers
		this.slackBot.on('message', (evt) => this.handleReply(evt));
	}

	sendResultToUser(result) {
		console.log(`sendResultToUser has been called with the following result
			${result.toString()}`);
		console.log(result);
		this.slackBot.postMessageToUser('abbad', result, this.param);
	}


	handleReply(event) {
		const eventType = event.type;
		const username = event.username;

		if (eventType != 'message' || username == 'My Bot') {
			console.log('ignoring ' + eventType);
			return;
		}
		console.log(event);
		switch (event.text) {
			case '1':
				this.slackBot.postMessageToUser('abbad', lineStatus, this.params);
				break;
			case 'L':
			case 'l':
				console.log('we are here');
				this.transit.checkMTAStatus('subway', 'L', this);
				//this.slackBot.postMessageToUser('abbad', lineStatus, this.params);
				break;
			default:
				this.slackBot.postMessageToUser('abbad', initial, this.params);
				break;
		}
	}
}
