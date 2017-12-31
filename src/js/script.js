$(function() {

	var socket = io();

	socket.emit('chatRecentReq');

	$('#mcs').mCustomScrollbar({
		theme:"dark"
	});

	setInterval(function() {
			$.ajax({
				url : '/api/coinflips',
				type : 'GET',
				success : function(data) {              
					var d = data;
					var template = document.getElementById('coinflips-row-template').innerHTML;
					var renderRows = Handlebars.compile(template);
					document.getElementById('coinflip-row').innerHTML = renderRows({
						coinflips: d,
					});
				},
				error : function(request,error)
				{
					alert("Request: "+JSON.stringify(request));
				}
			});
		}, 2000);


	$('#btn-chat').click(sendChat);
	$('#btn-input').keypress(function(e) {
		if(e.which == 13) {
			sendChat();
		}
	});

	socket.on('chatRcv', function(data) {
		addMsg(data);
	});

	socket.on('chatRecentRes', function(msgArray) {
		for(var i = 0; i < msgArray.length; i++) {
			addMsg(msgArray[i]);
		}
	});

	function sendChat() {
		var msg = $('#btn-input').val();
		if(msg.length > 0) {
			socket.emit('chatSend', {
				//name: user.displayName,
				//pic: user.photos[2].value,
				msg: msg
			});
			$('#btn-input').val('');
		}
	};

	function addMsg(data) {
		$('#mCSB_1_container').append($('<p>').html('<hr>'));
          $('#mCSB_1_container').append($('<p>').html(data.msg));
		$('#mcs').mCustomScrollbar("update");
		$('#mcs').mCustomScrollbar("scrollTo", "last");
	}
});

