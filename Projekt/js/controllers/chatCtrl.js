myApp.controller('MainCtrl', ['$scope', 'Pubnub', 'currentUser', 'MessageService',
	function($scope, Pubnub, currentUser, MessageService){

		$scope.uuid = currentUser;
		$scope.messageContent = '';

		$scope.sendMessage = function(){
			MessageService.sendMessage($scope.messageContent);
			$scope.messageContent = '';
		}

		$scope.autoScrollDown = true;

		$scope.messages = MessageService.getMessages();
	}
]);


/*myApp.controller('MainCtrl', ['$scope', 'Pubnub', 'currentUser', 'MessageService',
	function($scope, Pubnub, currentUser, MessageService) {
		$scope.channel = 'messages-channel';
		//$scope.messages = MessageService();
		$scope.sendMessage = function() {
			$scope.channel = 'messages-channel';
			if (!$scope.messageContent || $scope.messageContent === '') {
				return;
			}
			Pubnub.publish({
				channel: $scope.channel,
				message : {
					content: $scope.messageContent,
					sender_uuid: currentUser,
	                date: new Date()
	            },
	            callback: function(m) {
	                console.log(m);
	            }
			});
			$scope.messageContent = '';
		}
		$scope.messages = [];
		// Subscribing to the ‘messages-channel’ and trigering the message callback
		Pubnub.subscribe({
		    channel: $scope.channel,
		    triggerEvents: ['callback']
		});
		// Listening to the callbacks
		$scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {
		    $scope.$apply(function () {
		        $scope.messages.push(m)
		    });
		});
		// A function to display a nice uniq robot avatar 
		$scope.avatarUrl = function(uuid){
		    return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
		}
	}
]);*/