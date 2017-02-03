var toggle_check = false;

function create_toggle_btn() {
	btn.onclick = function() {
		if (toggle_check) {
			rest_list_DOM.style.left = "-20vw";
			right_side_DOM.style.opacity = 1;
			right_side_DOM.style.pointerEvents = "auto";
			toggle_check = false;
		} else {
			rest_list_DOM.style.left = 0;
			right_side_DOM.style.opacity = 0.2;
			right_side_DOM.style.pointerEvents = "none";
			toggle_check = true;
		}
	}
}

function remove_onfocus_class(array) {
	for (var i = 0; i < array.length;

		i++) {
		array[i].classList.remove("onfocus");
	}
}

// euclidean_part (original part)
function create_picked_list(number) {
	rest_num = number;
	var client_commnet = new XMLHttpRequest();
	client_commnet.open('GET', 'frontend_reviews/restaurant_' + (rest_num + 1) + '.json');
	client_commnet.onload = function() {
		dish_text_array = JSON.parse(client_commnet.responseText).dish_reviews;

		score_avg_btn.onclick.apply();
		picked_dom_array[0].onclick.apply(picked_dom_array[0]);
	}
	client_commnet.send();
	for (var i = 0; i < picked_dom_array.length; i++) {
		if (i < 5) {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_euclidean_avg[i].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_euclidean_avg[i].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_euclidean_avg[i].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_euclidean_avg[i].count;

			picked_dom_array[i].avg = picked_json_array[rest_num].top5_euclidean_avg[i].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_euclidean_avg[i].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_euclidean_avg[i].count;


			picked_dom_array[i].innerHTML = (i + 1) + ". " + picked_dom_array[i].name;
		} else if (i >= 5 && i < 10) {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_euclidean_min[i - 5].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_euclidean_min[i - 5].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_euclidean_min[i - 5].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_euclidean_min[i - 5].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_euclidean_min[i - 5].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_euclidean_min[i - 5].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_euclidean_min[i - 5].count;


			picked_dom_array[i].innerHTML = ((i - 5) + 1) + ". " + picked_dom_array[i].name;
		} else {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_frequent[i - 10].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_frequent[i - 10].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_frequent[i - 10].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_frequent[i - 10].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_frequent[i - 10].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_frequent[i - 10].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_frequent[i - 10].count;


			picked_dom_array[i].innerHTML = ((i - 10) + 1) + ". " + picked_dom_array[i].name;
		}
	}
}

// euclidean_part (original part) (min)
function update_picked_array() {
	score_min_btn.innerHTML = "Top Score (min)";
	for (var i = 0; i < picked_dom_array.length; i++) {
		if (i < 5) {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_euclidean_avg[i].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_euclidean_avg[i].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_euclidean_avg[i].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_euclidean_avg[i].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_euclidean_avg[i].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_euclidean_avg[i].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_euclidean_avg[i].count;


			picked_dom_array[i].innerHTML = (i + 1) + ". " + picked_dom_array[i].name;
		} else if (i >= 5 && i < 10) {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_euclidean_min[i - 5].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_euclidean_min[i - 5].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_euclidean_min[i - 5].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_euclidean_min[i - 5].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_euclidean_min[i - 5].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_euclidean_min[i - 5].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_euclidean_min[i - 5].count;


			picked_dom_array[i].innerHTML = ((i - 5) + 1) + ". " + picked_dom_array[i].name;
		} else {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_frequent[i - 10].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_frequent[i - 10].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_frequent[i - 10].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_frequent[i - 10].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_frequent[i - 10].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_frequent[i - 10].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_frequent[i - 10].count;


			picked_dom_array[i].innerHTML = ((i - 10) + 1) + ". " + picked_dom_array[i].name;
		}
	}
	return picked_dom_array;
}

// cosine_part (max)
function update_picked_array_cosine() {
	score_min_btn.innerHTML = "Top Score (max)";
	for (var i = 0; i < picked_dom_array.length; i++) {
		if (i < 5) {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_cosine_avg[i].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_cosine_avg[i].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_cosine_avg[i].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_cosine_avg[i].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_cosine_avg[i].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_cosine_avg[i].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_cosine_avg[i].count;


			picked_dom_array[i].innerHTML = (i + 1) + ". " + picked_dom_array[i].name;
		} else if (i >= 5 && i < 10) {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_cosine_max[i - 5].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_cosine_max[i - 5].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_cosine_max[i - 5].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_cosine_max[i - 5].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_cosine_max[i - 5].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_cosine_max[i - 5].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_cosine_max[i - 5].count;


			picked_dom_array[i].innerHTML = ((i - 5) + 1) + ". " + picked_dom_array[i].name;
		} else {
			picked_dom_array[i].name = picked_json_array[rest_num].top5_frequent[i - 10].name;
			picked_dom_array[i].x = picked_json_array[rest_num].top5_frequent[i - 10].x;
			picked_dom_array[i].y = picked_json_array[rest_num].top5_frequent[i - 10].y;
			picked_dom_array[i].radius = picked_json_array[rest_num].top5_frequent[i - 10].count;


			picked_dom_array[i].avg = picked_json_array[rest_num].top5_frequent[i - 10].euclidean_avg_score.toFixed(3);

			picked_dom_array[i].min = picked_json_array[rest_num].top5_frequent[i - 10].euclidean_min_score.toFixed(3);

			picked_dom_array[i].freq = picked_json_array[rest_num].top5_frequent[i - 10].count;


			picked_dom_array[i].innerHTML = ((i - 10) + 1) + ". " + picked_dom_array[i].name;
		}
	}
	return picked_dom_array;
}

function clean_innerHTML(element) {
	element.innerHTML = "";
}

function draw_axis(svg) {
	// draw axis
	var axis_svg = makeSVG('path', {
		d: "M" + w / 2 + " " + view_h * 0.08 + "L" + w / 2 + " " + (view_h + view_h * 0.08) + "M0 " + ((view_h / 2) + (view_h * 0.08)) + " L" + w + " " + ((view_h / 2) + (view_h * 0.08)),
		stroke: "#333",
		// stroke: "#A1A1A1",
		"stroke-width": 1
	});

	legend_x = 0.3,
		legend_y = 0.95;

	// draw legend
	var g1 = makeSVG('g', {});
	var legend_circle1 = makeSVG('circle', {
		cx: w * legend_x,
		cy: h * legend_y,
		fill: most_point_color,
		r: 5
	});
	var legend_text1 = makeSVG('text', {
		x: (w * legend_x) + 7,
		y: (h * legend_y) + 5,
		fill: most_point_color
	});
	legend_text1.innerHTML = 'Top Score (avg)';
	legend_text1.id = 't1';
	g1.appendChild(legend_text1);
	g1.appendChild(legend_circle1);

	var g2 = makeSVG('g', {});
	var legend_circle2 = makeSVG('circle', {
		cx: w * legend_x + 220,
		cy: h * legend_y,
		fill: top_point_color,
		r: 5
	});
	var legend_text2 = makeSVG('text', {
		x: (w * legend_x) + 220 + 7,
		y: (h * legend_y) + 5,
		fill: top_point_color
	});
	legend_text2.innerHTML = 'Most Frequent Dishes';
	g2.appendChild(legend_text2);
	g2.appendChild(legend_circle2);

	var g3 = makeSVG('g', {});
	/*	var legend_circle3 = makeSVG('circle', {
			cx: w * legend_x,
			cy: h * legend_y + 25,
			fill: good_point_color,
			r: 5
		});*/
	cross_radius = 10;
	var legend_word = makeSVG('path', {
		d: "M" + ((w * legend_x) - cross_radius / 2) + " " + (h * legend_y + 25) + " L" + ((w * legend_x) + cross_radius / 2) + " " + ((h * legend_y + 25) + "M" + w * legend_x) + " " + ((h * legend_y + 25) - cross_radius / 2) + "L" + (w * legend_x) + " " + ((h * legend_y + 25) + cross_radius / 2),
		stroke: good_point_color,
		"stroke-width": 1
	});
	var legend_text3 = makeSVG('text', {
		x: (w * legend_x) + 7,
		y: (h * legend_y) + 25 + 5,
		fill: good_point_color
	});
	legend_text3.innerHTML = 'Positive Sentiment Word';
	g3.appendChild(legend_text3);
	g3.appendChild(legend_word);
	// g3.appendChild(legend_circle3);

	var g4 = makeSVG('g', {});
	var legend_circle4 = makeSVG('circle', {
		cx: w * legend_x + 220,
		cy: h * legend_y + 25,
		fill: most_point_min_color,
		r: 5
	});
	var legend_text4 = makeSVG('text', {
		x: (w * legend_x) + 220 + 7,
		y: (h * legend_y) + 25 + 5,
		fill: most_point_min_color
	});
	legend_text4.innerHTML = 'Top Score (min)';
	g4.appendChild(legend_text4);
	g4.appendChild(legend_circle4);

	var legend_rect = makeSVG('g', {});

	var restaurant_title = makeSVG('text', {
		x: (w * 0.01),
		y: (h * 0.07),
		fill: "#E74C3C",
		'font-size': '1.5em',
        "font-weight": "bold"
	});
	restaurant_title.innerHTML = rest_json[rest_num].restaurant_name;
	legend_rect.appendChild(restaurant_title);

	legend_rect.appendChild(g1);
	legend_rect.appendChild(g2);
	legend_rect.appendChild(g3);
	legend_rect.appendChild(g4);

	svg.appendChild(legend_rect);
	svg.appendChild(axis_svg);

	return svg;
}

function form(item, determine, extreme_value) {
	extreme_value = 0.5;
	if (determine == 'x') {
		item = ((item + extreme_value) / extreme_value) * w / 2;
	} else if (determine == 'y') {
		item = -item;
		item = ((item + extreme_value) / extreme_value) * ((view_h / 2) + (view_h * 0.08));
	} else {
		console.error('determine error');
	}

	return item;
}

function draw_points(svg) {

	// good and bad points
	var cross_radius = 10;
	for (var i = 0; i < good_array.length; i++) {
		var circle_good = makeSVG('circle', {
			cx: form(good_array[i].x, 'x', 2),
			cy: form(good_array[i].y, 'y', 2),
			r: 6,
			fill: "transparent",
			stroke: good_point_color,
			"stroke-width": 0
		});

		var group = makeSVG('g', {});
		var cross_good = makeSVG('path', {
			d: "M" + (form(good_array[i].x, 'x', 2) - cross_radius / 2) + " " + form(good_array[i].y, 'y', 2) + " L" + (form(good_array[i].x, 'x', 2) + cross_radius / 2) + " " + form(good_array[i].y, 'y', 2) + "M" + form(good_array[i].x, 'x', 2) + " " + (form(good_array[i].y, 'y', 2) - cross_radius / 2) + "L" + form(good_array[i].x, 'x', 2) + " " + (form(good_array[i].y, 'y', 2) + cross_radius / 2),
			stroke: good_point_color,
			"stroke-width": 1
		});
		var text_good = makeSVG('text', {
			x: form(good_array[i].x, 'x', 2) + 10,
			y: form(good_array[i].y, 'y', 2) - 10,
			fill: good_point_color
		});
		text_good.innerHTML = good_array[i].word;
		group.appendChild(cross_good);
		group.appendChild(text_good);

		/*		var circle_bad = makeSVG('circle', {
					cx: form(bad_array[i].x, 'x', 2),
					cy: form(bad_array[i].y, 'y', 2),
					r: 5,
					fill: bad_point_color,
					stroke: bad_point_color,
					"stroke-width": 2
				});
				var text_bad = makeSVG('text', {
					x: form(bad_array[i].x, 'x', 2) + 10,
					y: form(bad_array[i].y, 'y', 2) - 10,
					fill: bad_point_color
				});
				text_bad.innerHTML = bad_array[i].word;*/

		// svg.appendChild(circle_bad);
		// svg.appendChild(text_bad);
		svg.appendChild(circle_good);
		svg.appendChild(group);
		// svg.appendChild(cross_good);
		// svg.appendChild(text_good);
	}

	// draw dishes point
	for (var i = picked_dom_array.length-1; i >= 0; i--) {
		if (i < 5) {
			var circle_dishes = makeSVG('circle', {
				cx: form(picked_dom_array[i].x, 'x', 2),
				cy: form(picked_dom_array[i].y, 'y', 2),
				r: Math.pow(picked_dom_array[i].radius, 0.5) * 2,
				fill: most_point_color,
				stroke: "rgba(0,0,0,0.4)",
				"stroke-width": 1
			});

		} else if (i >= 5 && i < 10) {
			var circle_dishes = makeSVG('circle', {
				cx: form(picked_dom_array[i].x, 'x', 2),
				cy: form(picked_dom_array[i].y, 'y', 2),
				r: Math.pow(picked_dom_array[i].radius, 0.5) * 2,
				fill: most_point_min_color,
				stroke: "rgba(0,0,0,0.4)",
				"stroke-width": 1
			});

		} else {
			var circle_dishes = makeSVG('circle', {
				cx: form(picked_dom_array[i].x, 'x', 2),
				cy: form(picked_dom_array[i].y, 'y', 2),
				r: Math.pow(picked_dom_array[i].radius, 0.5) * 2,
				fill: top_point_color,
				stroke: "rgba(0,0,0,0.4)",
				"stroke-width": 1
			});

		}
		svg_dishes_array[i] = circle_dishes;
		circle_dishes.setAttribute('class', 'dishes_hover');
		svg.appendChild(circle_dishes);
	}
	for (var i = picked_dom_array.length-1; i >= 0; i--) {
		if (i < 5) {
			var text_picked = makeSVG('text', {
				x: form(picked_dom_array[i].x, 'x', 2) + 10,
				y: form(picked_dom_array[i].y, 'y', 2) - 10,
				stroke: "rgba(0,0,0,0.4)",
				"font-size": "1.3em",
				"font-weight": "bold",
				"stroke-width": 0.3,
				fill: most_point_color
			});
			text_picked.innerHTML = picked_dom_array[i].name;
		} else if (i >= 5 && i < 10) {
			var text_picked = makeSVG('text', {
				x: form(picked_dom_array[i].x, 'x', 2) + 10,
				y: form(picked_dom_array[i].y, 'y', 2) - 10,
				stroke: "rgba(0,0,0,0.4)",
				"font-size": "1.3em",
				"font-weight": "bold",
				"stroke-width": 0.3,
				fill: most_point_min_color
			});
			text_picked.innerHTML = picked_dom_array[i].name;
		} else {
			var text_picked = makeSVG('text', {
				x: form(picked_dom_array[i].x, 'x', 2) + 10,
				y: form(picked_dom_array[i].y, 'y', 2) - 10,
				stroke: "rgba(0,0,0,0.4)",
				"font-size": "1.3em",
				"font-weight": "bold",
				"stroke-width": 0.3,
				fill: top_point_color
			});
			text_picked.innerHTML = picked_dom_array[i].name;
		}
		svg_dishes_name_array[i] = text_picked;
		svg.appendChild(text_picked);
	}

	for (var i = 0; i < svg_dishes_array.length; i++) {
		create_circle_clicker(svg_dishes_array[i], i);
		create_picked_list_hover(picked_dom_array[i], i);
	}

	function create_picked_list_hover(picked_dom_circle_part, num) {
		picked_dom_circle_part.check = false;
		picked_dom_circle_part.onmouseover = function() {
			svg_dishes_name_array[num].style.opacity = 1;
			svg_dishes_array[num].style.stroke = "red";
			svg_dishes_array[num].style.strokeWidth = 3;
		}
		picked_dom_circle_part.onmouseout = function() {
			if (!this.check) {
				svg_dishes_name_array[num].style.opacity = 0;
				svg_dishes_array[num].style.stroke = "rgba(0,0,0,0.4)";
				svg_dishes_array[num].style.strokeWidth = 1;
			}
		}
	}

	function create_circle_clicker(circle, num) {
		// circle.check = false;

		circle.onclick = function() {
			if (num < 5) {
				score_avg_btn.onclick.apply();
			} else if (num >= 5 && num < 10) {
				score_min_btn.onclick.apply(score_min_btn);
			} else {
				frequent_btn.onclick.apply(frequent_btn);
			}
			picked_dom_array[num].onclick.apply(picked_dom_array[num]);
		}

		picked_dom_array[num].check = false;
		circle.onmouseover = function() {
			svg_dishes_name_array[num].style.opacity = 1;
			svg_dishes_array[num].style.stroke = "red";
			svg_dishes_array[num].style.strokeWidth = 3;
		}
		circle.onmouseout = function() {
			if (!picked_dom_array[num].check) {
				svg_dishes_name_array[num].style.opacity = 0;
				svg_dishes_array[num].style.stroke = "rgba(0,0,0,0.4)";
				svg_dishes_array[num].style.strokeWidth = 1;
			}
		}
	}

	return svg;
}

function draw_lines(svg, picked_number) {
	// good and bad points
	for (var i = 0; i < good_array.length; i++) {
		var line_good = makeSVG('path', {
			d: 'M' + form(picked_dom_array[picked_number].x, 'x', 2) + " " + form(picked_dom_array[picked_number].y, 'y', 2) + "L" + form(good_array[i].x, 'x', 2) + " " + form(good_array[i].y, 'y', 2),
			stroke: good_point_color,
			"stroke-width": 1
		});
/*		var line_bad = makeSVG('path', {
			d: 'M' + form(picked_dom_array[picked_number].x, 'x', 2) + " " + form(picked_dom_array[picked_number].y, 'y', 2) + "L" + form(bad_array[i].x, 'x', 2) + " " + form(bad_array[i].y, 'y', 2),
			// d: 'M' + form(picked_dom_array[picked_number].x, 'x', 2) + " " + form(picked_dom_array[picked_number].y, 'y', 2) + "L" + form(bad_array[i].x, 'x', 2) + " " + form(bad_array[i].y, 'y', 2),
			stroke: bad_point_color,
			"stroke-width": 2
		});*/
		var line_measure = line_good.getTotalLength();
		line_good.setAttribute("stroke-dasharray", line_measure);
		line_good.setAttribute("stroke-dashoffset", line_measure);
		line_good.setAttribute("class", "line_animation");

/*		var line_measure = line_bad.getTotalLength();
		line_bad.setAttribute("stroke-dasharray", line_measure);
		line_bad.setAttribute("stroke-dashoffset", line_measure);
		line_bad.setAttribute("class", "line_animation");*/

		// svg.appendChild(line_bad);
		// svg.appendChild(line_good);
	}
}

function makeSVG(item, attrs) {
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	var svgNS = svg.namespaceURI;
	el = document.createElementNS(svgNS, item);
	for (var k in attrs)
		el.setAttribute(k, attrs[k]);

	return el;
}

rest_num = -1, now_picked = null;

/*	setTimeout(	function whatever(argument) {
		var part = document.getElementById('reviews_move');
		part.style.transform = "translateY(100px)";
	}, 1000);*/
