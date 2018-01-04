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
					var template = document.getElementById('coinflips-row-template').innerHTML;
					var renderRows = Handlebars.compile(template);
					document.getElementById('coinflip-row').innerHTML = renderRows({
						coinflips: data,
					});
				},
				error : function(request,error)
				{
					//alert("Request: "+JSON.stringify(request));
					alert('The server is offline.');
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
				msg: msg
			});
			$('#btn-input').val('');
		}
	};

	function addMsg(data) {
		$('#mCSB_1_container').append($('<p>').html('<hr>'));
		if(typeof data.name !== 'undefined' && typeof data.pic !== 'undefined') {
			$('#mCSB_1_container').append($('<p>').html('<img src=' + data.pic + ' class="chatavi"/><strong> ' + data.name + '</strong>: ' + data.msg.msg));
		} else {
			$('#mCSB_1_container').append($('<p>').html(data.msg));
		}
		$('#mcs').mCustomScrollbar("update");
		$('#mcs').mCustomScrollbar("scrollTo", "last");
	};

	$('#profileButton').click({
			title: 'Profile',
			body: buildProfileModalBody(),
			footer: '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'
	}, openModal);

	$('#historyButton').click({
			title: 'History',
			body: '<p>Your History</p>',
			footer: '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'
	}, openModal);

	$('#cgButton').click({
			title: 'Create Coinflip',
			body: '<p>Create Coinflip</p>',
			footer: '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" data-dismiss="modal">Create</button>'
	}, openModal);

	$('#moButton').click({
			title: 'Manage Offers',
			body: '<p>Manage Offers</p>',
			footer: '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'
	}, openModal);

	function buildProfileModalBody() {
		var body = '';

		body = body + '<h3>Your Profile</h3>' +
		'<form><div class="form-group"><label for="tradelinkInput">Trade Link*</label>' + 
		'<input type="text" class="form-control" id="tradelinkInput" placeholder="Required">' + 
		'</div><div class="form-group"><label for="emailInput">' + 
		'Email</label><input type="text" class="form-control" ' + 
		'id="emailInput" placeholder="Optional"></div>' + 
		'<div class="form-group"><label for="nameInput">' + 
		'Name</label><input type="text" class="form-control" ' + 
		'id="nameInput" placeholder="Optional"></div>' + 
		'</form>';

		return body;
	}

	function openModal(event) {

		var template = document.getElementById('modalTemplate').innerHTML;
		var compiledTemplate = Handlebars.compile(template);

		document.getElementById('modalContent').innerHTML = compiledTemplate({
			modalTitle: event.data.title,
			modalBody: event.data.body,
			modalFooter: event.data.footer
		});

		$('#largeModal').modal();
	};
});
