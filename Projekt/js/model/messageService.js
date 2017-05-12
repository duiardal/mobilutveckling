/*myApp.factory('MessageService', ['$rootScope', '$pubnubChannel', 'currentUser',
    function MessageServiceFactory($rootScope, $pubnubChannel, currentUser) {
        // We create an extended $pubnubChannel channel object that add an additional sendMessage method
        // that publish a message with a predefined structure.
        var Channel = $pubnubChannel.$extend({
            sendMessage: function(messageContent) {
                return this.$publish({
                    uuid: (Date.now() + currentUser), // Add a uuid for each message sent to keep track of each message sent.
                    content: messageContent,
                    sender_uuid: currentUser,
                    date: Date.now()
                })
            }
        });
        return Channel('messages-channel', {
            autoload: 20,
            presence: true
        });
    }
]);*/


myApp.factory('MessageService', ['$rootScope', '$q', 'Pubnub','currentUser', 'ngNotify',
 function MessageServiceFactory($rootScope, $q, Pubnub, currentUser, ngNotify) {
  
  // Aliasing this by self so we can access to this trough self in the inner functions
  var self = this;
  this.messages = []
  this.channel = 'messages-channel6';

  // We keep track of the timetoken of the first message of the array
  // so it will be easier to fetch the previous messages later
  this.firstMessageTimeToken = null;
  this.messagesAllFetched = false;

  var whenDisconnected = function(){
      ngNotify.set('Connection lost. Trying to reconnect...', {
        type: 'warn',
        sticky: true,
        button: false,
      });
  };

  var whenReconnected = function(){
      ngNotify.set('Connection re-established.', {
          type: 'info',
          duration: 1500
      });
  };

  var init = function() {
      
      Pubnub.subscribe({
          channel: self.channel,
          disconnect : whenDisconnected, 
          reconnect : whenReconnected,
          triggerEvents: ['callback']
      });

      Pubnub.time(function(time){
        self.firstMessageTimeToken = time;
      })

      subcribeNewMessage(function(ngEvent,m){
        self.messages.push(m)
        $rootScope.$digest()
  });

  };

  var populate = function(){

    var defaultMessagesNumber = 20;

    Pubnub.history({
     channel: self.channel,
     callback: function(m){
        // Update the timetoken of the first message
        self.timeTokenFirstMessage = m[1]
        angular.extend(self.messages, m[0]);  
        
        if(m[0].length < defaultMessagesNumber){
          self.messagesAllFetched = true;
        }

        $rootScope.$digest()
        $rootScope.$emit('factory:message:populated')
        
     },
     count: defaultMessagesNumber, 
     reverse: false
    });

  };

  ////////////////// PUBLIC API ////////////////////////

  var subcribeNewMessage = function(callback){
    $rootScope.$on(Pubnub.getMessageEventNameFor(self.channel), callback);
  };


  var fetchPreviousMessages = function(){

    var defaultMessagesNumber = 10;

    var deferred = $q.defer()

    Pubnub.history({
     channel: self.channel,
     callback: function(m){
        // Update the timetoken of the first message
        self.timeTokenFirstMessage = m[1]
        Array.prototype.unshift.apply(self.messages,m[0])
        
        if(m[0].length < defaultMessagesNumber){
          self.messagesAllFetched = true;
        }

        $rootScope.$digest()
        deferred.resolve(m)

     },
     error: function(m){
        deferred.reject(m)
     },
     count: defaultMessagesNumber, 
     start: self.timeTokenFirstMessage,
     reverse: false
    });

    return deferred.promise
  };


  var getMessages = function() {

    if (_.isEmpty(self.messages))
      populate();

    return self.messages;

  };

  var messagesAllFetched = function() {

    return self.messagesAllFetched;

  };

  var sendMessage = function(messageContent) {

      // Don't send an empty message 
      if (_.isEmpty(messageContent))
          return;

      Pubnub.publish({
          channel: self.channel,
          message: {
              uuid: (Date.now() + currentUser),
              content: messageContent,
              sender_uuid: currentUser,
              date: Date.now()
          },
      });
  };


  init();

  // The public API interface
  return {
    getMessages: getMessages, 
    sendMessage: sendMessage,
    subscribeNewMessage: subcribeNewMessage,
    fetchPreviousMessages: fetchPreviousMessages,
    messagesAllFetched : messagesAllFetched
  } 

}]);