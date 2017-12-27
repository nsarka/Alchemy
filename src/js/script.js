$(function() {

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
});
