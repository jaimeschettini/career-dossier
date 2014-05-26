$(function() {
	var calculate_events_board_width = function() {
		var events_board = $('.events-board'),
		events = events_board.find('.event');


		var number_of_events = events.length;
		var first = events.first();
		var event_width = first.css('width').replace('px', '');
		var margin_left = first.css('margin-left').replace('px', '');
		var margin_right = first.css('margin-right').replace('px', '');

		var result = number_of_events * (parseInt(event_width) + parseInt(margin_left) + parseInt(margin_right)) + 10 + 'px';

		events_board.find('.events-container').css('width', result);
	};

	var retrieve_data_from_google = function(callback) {
		var translate = function(spreadsheet) {
				var translated = [];

				console.log(spreadsheet.entry);

				spreadsheet.entry.forEach(function(row /* index, array */) {
					translated.push({
						type: row['gsx$type']['$t'],
						event: row['gsx$event']['$t'],
						people: row['gsx$people']['$t'],
						context: row['gsx$context']['$t'],
						comments: row['gsx$comments']['$t'],
						show_in_lifeline: row['gsx$show']['$t']
					});
				});

				callback(translated);
			},
			url = "https://spreadsheets.google.com/feeds/list/1zJTTAeA2pJyAodugqQ1f7I4hfJ3Tofe_FeBPKD2mocI/od6/public/values?alt=json-in-script&callback=?";

		$.getJSON(url, function(data) { 
			translate(data.feed);
		});
	};

	var draw_balloon = function(event) {
		/* Copy and paste. Refactor the retrieval of elements. */
		var jqEvents = $('.events-board .events-container'),
			event_html = 	'<div class="event">' + 
					            '<div class="balloon ' + event.type + '">' + 
					            	'<strong>Event</strong>: ' + event.event + 
					            	'. <strong>People</strong>: ' + event.people + 
					            	'. <strong>Context</strong>: ' + event.context + 
					            '</div>' +
					        '</div>';

					        console.log()
		jqEvents.append(event_html);
	};

	var draw_balloons = function(balloons_drawn) {
		retrieve_data_from_google(function(events) {
			events.forEach(function(event) {
				draw_balloon(event);
			});

			balloons_drawn();
		});
	};

	draw_balloons(function() {
		calculate_events_board_width();
	});
});
