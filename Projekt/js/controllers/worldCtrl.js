myApp.controller('WorldCtrl', function($scope, $rootScope, Pubnub) {
    $rootScope.$on(Pubnub.getMessageEventNameFor('hello_world'), function (ngEvent, message, envelope, channelOrGroup, time, channel) {
        console.log(
            "Message Received." + "\n" +
            "Channel or Group: " + JSON.stringify(channelOrGroup) + "\n" +
            "Channel: " + JSON.stringify(channel) + "\n" +
            "Message: " + JSON.stringify(message)  + "\n" +
            "Time: " + time  + "\n" +
            "Raw Envelope: " + JSON.stringify(envelope)
        );
    });
 
    $rootScope.$on(Pubnub.getEventNameFor('subscribe', 'connect'), function () {
        Pubnub.publish({
            channel: 'hello_world',
            message : "Hello from PubNub Docs!",
            triggerEvents: true
        })
    });
 
    $rootScope.$on(Pubnub.getEventNameFor('publish', 'callback'), function (ngEvent, message) {
        console.log(message);
    });
});