$(function() {
	var socket = io();

	socket.emit('chatRecentReq');

	$('#mcs').mCustomScrollbar({
		theme:"dark"
	});

	$.ajax({
		url : '/api/coinflips',
		type : 'GET',
		success : function(data) {
			// TODO: create addCoinflipRow() and use it here in a loop over all rows in data
			for(var i = 0; i < data.length; i++) {
				addCoinflipRow(data[i]);
			}
		}
	});


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

	function addCoinflipRow(data) {
		var row = '';

		var rowItems = '';
		for(var j = 0; j < data.p1.items.length; j++) {
			rowItems += '<img class="coinflip-row-item" src="' + data.p1.items[j].img + '" title="' + data.p1.items[j].name + '">';
		}
		for(var j = 0; j < data.p2.items.length; j++) {
			rowItems += '<img class="coinflip-row-item" src="' + data.p2.items[j].img + '" title="' + data.p2.items[j].name + '">';
		}

		var statusText = '<button type="button" class="btn btn-block btn-primary">';
		if(data.status == 1) {
			statusText += 'JOIN';
		} else {
			statusText += 'WATCH';
		}
		statusText += '</button>';

		row += "<tr id='" +
		data.id +
		"'><td><img class='coinflip-row-avatar ct-bg' src='" +
		data.p1.img +
		"'><span class='vs'>VS</span><img class='coinflip-row-avatar ct-bg' src='" +
		data.p2.img +
		"'></td><td>" +
		rowItems +
		"</td><td>" +
		(data.p1.value + data.p2.value) +
		"</td><td>" +
		data.status +
		"</td><td>" +
		statusText +
		"</td></tr>";

		$('#coinflip-tbody').append(row);
	}

	function deleteCoinflipRow(id) {
		$('#' + id).remove();
	}

	$('#historyButton').click({
			title: 'History',
			body: '<p>Your History</p>',
			footer: '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'
	}, openModal);

	$('#cgButton').click({
			title: 'Create Coinflip',
			body: '<p>Create Coinflip</p>',
			footer: '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button id="createcgButton" type="button" class="btn btn-primary" data-dismiss="modal">Create</button>',
			update: updatecgModalBody
	}, openModal);

	$('#moButton').click({
			title: 'Manage Offers',
			body: '<p>Manage Offers</p>',
			footer: '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'
	}, openModal);

	$('#profileButton').click({
			title: 'Profile',
			body: buildProfileModalBody(),
			footer: '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" id="updateProfileButton" class="btn btn-primary">Update</button>',
			update: updateProfileModalBody,
	}, openModal);

	function buildProfileModalBody() {
		var body = '';

		body = body + '<h3>Your Profile</h3><br><p>Your trade link can be found <a href="http://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url" target="_blank">here</a>.</p><br>' +
		'<form><div class="form-group"><label for="tradeLinkInput">Trade Link*</label>' + 
		'<input type="text" class="form-control" id="tradeLinkInput" placeholder="Required">' + 
		'</div><div class="form-group"><label for="emailInput">' + 
		'Email</label><input type="text" class="form-control" ' + 
		'id="emailInput" placeholder="Optional"></div>' + 
		'<div class="form-group"><label for="nameInput">' + 
		'Name</label><input type="text" class="form-control" ' + 
		'id="nameInput" placeholder="Optional"></div>' + 
		'</form><p>CsOptic doesnt give away any info, period.</p>';

		return body;
	}

	function updateProfileModalBody() {
		var tradeLink, email, name;

		$.ajax({
			url : '/user',
			type : 'GET',
			success : function(data) {       
				if(typeof data.tradeLink !== 'undefined') {
					$('#tradeLinkInput').val(data.tradeLink);
				} else {
					// TODO: Notify user this is required
				}

				if(typeof data.email !== 'undefined') { $('#emailInput').val(data.email); }
				if(typeof data.name !== 'undefined') { $('#nameInput').val(data.name); }
			},
			error : function(request, error) {
				alert('The server is offline.');
			}
		});

		// Event listener must be registered here because #updateProfileButton doesnt exist unless the user opens the profile modal
		$('#updateProfileButton').click(function() {
			$.ajax({
				type: 'POST',
				url: '/user',
				data: {
					tradeLink: $('#tradeLinkInput').val(),
					email: $('#emailInput').val(),
					name: $('#nameInput').val()
				},
				success: function(data) {
					
				}
			});
		});
	}

	function updatecgModalBody() {
		// Event listener must be registered here because #updateProfileButton doesnt exist unless the user opens the profile modal
		$('#createcgButton').click(function() {
			$.ajax({
				type: 'POST',
				url: '/api/coinflips',
				data: {},
				success: function(data) {
					
				}
			});
		});
	}

	function openModal(event) {

		var template = document.getElementById('modalTemplate').innerHTML;
		var compiledTemplate = Handlebars.compile(template);

		document.getElementById('modalContent').innerHTML = compiledTemplate({
			modalTitle: event.data.title,
			modalBody: event.data.body,
			modalFooter: event.data.footer
		});

		// Javascript black magic
		if(typeof event.data.update !== 'undefined') {
			event.data.update();
		}

		$('#largeModal').modal();
	};
});
