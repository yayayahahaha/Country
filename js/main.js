window.onload = function(argument) {
	/* btn_setting, include btn of subtitle */
	btn_setting();

	/* get restaurant on left side */
	var client_rest = new XMLHttpRequest();
	client_rest.open('GET', 'website_word2vec/frontend_restaurant_dict_list.json');
	client_rest.onload = function() {
		/* after preload and get restaurant list's json, start to create restaurant list */
		after_get_rest_json(client_rest.responseText);

		/* preload every top and most dishes */
/*		var client_picked = new XMLHttpRequest();
		client_picked.open('GET', 'website_word2vec/frontend_restaurant_dict_list.json');
		client_picked.onload = function() {*/
			picked_json_array = JSON.parse(client_rest.responseText);

			/* first click of restaurant list */
			rest_list_array[0].onclick.apply(rest_list_array[0]);
/*		}
		client_picked.send();*/

		/* preload every positive and negative words */
		var client_word = new XMLHttpRequest();
		client_word.open('GET', 'website_word2vec/frontend_sentiment_statistics.json');
		client_word.onload = function() {
			good_array = JSON.parse(client_word.responseText);
		}
		client_word.send();

	}
	client_rest.send();


	// create toggle btn
	create_toggle_btn();

	function after_get_rest_json() {
		rest_json = JSON.parse(arguments[0]);

		var rest_table_DOM = document.getElementsByTagName('tbody')[0];
		for (var i = 0; i < rest_json.length; i++) {
			var temp_tr = document.createElement("tr");
			var temp_td = document.createElement("td");
			var temp_div = document.createElement("div");

			temp_div.innerHTML = (i + 1) + ". " + rest_json[i].restaurant_name;

			rest_table_DOM.appendChild(temp_tr);
			temp_tr.appendChild(temp_td);
			temp_td.appendChild(temp_div);

			rest_list_array.push(temp_div);

			/* which also create picked_list here */
			create_restaurant_list_click_listener(temp_div, i);
		}
	}

	function create_restaurant_list_click_listener(rest_DOM, number) {
		rest_DOM.onclick = function() {
			setting_back(page_arary, 1);

			/* handle the second click */
			remove_onfocus_class(rest_list_array);

			/* toggle part */
			toggle_check = false;
			rest_list_DOM.style.left = "-20vw";
			right_side_DOM.style.opacity = 1;
			right_side_DOM.style.pointerEvents = "auto";

			/*style part*/
			this.setAttribute('class', 'onfocus');

			/* animation start here */
			reviews_body.style.opacity = 0;
			reviews_body.style.transform = "translateY(" + (document.body.offsetHeight * 0.94) + "px)";
			reviews_body.classList.remove("fade_in_class");

			for (var i = 0; i < picked_dom_array.length; i++) {
				picked_dom_array[i].style.opacity = 0;
			}

			draw_place.style.opacity = 0;

			setTimeout(function() {
				draw_place.innerHTML = '';
				reviews_body.setAttribute('class', 'fade_in_class');
				create_picked_list_after_animation();
			}, 250);

			// picked list animation
			setTimeout(function() {
				for (var i = 0; i < picked_dom_array.length; i++) {
					delay_animation(picked_dom_array[i], i);
				}
			}, 700);

			function delay_animation(obj, number) {
				setTimeout(function() {
					obj.style.opacity = 1
				}, number * 50);
			}

			function create_picked_list_after_animation(argument) {
				/* create picked list and load its restaurant comment to dish_text_array*/
				create_picked_list(number);
				/* create picked list click listener and also create reviews_list and draw*/
				for (var i = 0; i < picked_dom_array.length; i++) {
					create_picked_list_click_listener(picked_dom_array[i], i, number);
				}
			}

			function create_picked_list_click_listener(picked_DOM, number, rest_num) {
				picked_DOM.onclick = function() {

					/* handle the second click */
					remove_onfocus_class(picked_dom_array);

					/*style part*/
					this.className = this.className + ' onfocus';

					/* create reviews */
					var reviews_table_DOM = document.getElementsByTagName('tbody')[1];
					reviews_table_DOM.innerHTML = "";
					for (var i = 0; i < dish_text_array.length; i++) {
						if (dish_text_array[i].dish_name == this.name) {
							console.log(dish_text_array[i].dish_name, this.name);
							for (var j = 0; j < dish_text_array[i].reviews.length; j++) {
								// dish_text_array[i].text[i]
								var temp_tr = document.createElement("tr");
								var temp_td = document.createElement("td");
								var temp_div = document.createElement("div");

								temp_div.innerHTML = "__" + dish_text_array[i].reviews[j];
								// temp_div.innerHTML = "__" + dish_text_array[i].text[j];

								reviews_table_DOM.appendChild(temp_tr);
								temp_tr.appendChild(temp_td);
								temp_td.appendChild(temp_div);
							}
							break;
						}
					}

					// update picked array, for draw purpose
					if (consine_or_euclidean == "euclidean") {
						picked_dom_array = update_picked_array();
					}else{
						picked_dom_array = update_picked_array_cosine();
						
					}

					/* start draw */
					w = draw_place.offsetWidth * 0.95,
						h = draw_place.offsetHeight * 1;
					view_h = h * 0.8;

					draw_place.innerHTML = '';


					var svg = makeSVG('svg', {
						width: w,
						height: h
					});

					// draw axis and legend first
					draw_axis(svg);

					// draw lines
					draw_lines(svg, number);

					// draw points
					draw_points(svg);

					draw_place.appendChild(svg);
					draw_place.style.opacity = 1;

					/* handle circle part */
					for (var i = 0; i < svg_dishes_array.length; i++) {
						svg_dishes_array[i].check = false;
					}
					for (var i = 0; i < svg_dishes_name_array.length; i++) {
						svg_dishes_name_array[i].style.opacity = 0;
						// svg_dishes_array[number].className = "dishes_hover";
					}
					svg_dishes_array[number].className = "";
					svg_dishes_name_array[number].style.opacity = 1;
					this.check = true;
					svg_dishes_array[number].style.stroke = "red";
					svg_dishes_array[number].style.strokeWidth = 3;



					/* handle small toggle part */
					for (var i = 0; i < detail_dom_array.length; i++) {
						detail_dom_array[i].style.height = "0px";
					}
					detail_dom_array[number].style.height = "10vh";
					info_dom_array[number * 3].innerHTML = "Score (avg):" + picked_dom_array[number].avg;
					info_dom_array[number * 3 + 1].innerHTML = "Score (min):" + picked_dom_array[number].min;
					info_dom_array[number * 3 + 2].innerHTML = "Frequency:" + picked_dom_array[number].freq;
					if (number < 5) {
						info_dom_array[number * 3].style.color = "red";
					} else if (number >= 5 && number < 10) {
						info_dom_array[number * 3 + 1].style.color = "red";
					} else {
						info_dom_array[number * 3 + 2].style.color = "red";
					}
				}
			}
		}
	}


	btn = document.getElementById('btn'),
		rest_list_DOM = document.getElementsByClassName('rest_list')[0],
		right_side_DOM = document.getElementsByClassName('right_side')[0],
		w = 0,
		h = 0,
		view_h = 0,
		extreme_value = 2,
		good_point_color = "rgba(84,153,199,0.8)",
		bad_point_color = "rgba(153,2,22,0.8)",
		top_point_color = "rgba(247,220,111,0.8)",
		most_point_color = "rgba(236,112,99,0.8)",
		most_point_min_color = "rgba(22,160,133,0.8)";

	rest_list_array = [],
		picked_json_array = [],
		top_array = [],
		most_array = [],
		bad_array = [],
		good_array = [],
		dish_text_array = [],
		picked_dom_array = document.getElementsByClassName('picked'),
		detail_dom_array = document.getElementsByClassName('detail'),
		info_dom_array = document.getElementsByClassName('info'),
		reviews_body = document.getElementById('reviews_move'),
		draw_place = document.getElementsByClassName('draw_place')[0],

		svg_dishes_array = [],
		svg_dishes_name_array = [];

	overview_btn = document.getElementById('overview_id'),
		overview_page = document.getElementById('overview_page_id');

	//data_btn = document.getElementById('data_id'),
	//data_page = document.getElementById('data_page_id');

	about_btn = document.getElementById('about_id'),
		about_page = document.getElementById('about_page_id');

	system_btn = document.getElementById('system_id');

	//page_arary = [overview_page, data_page, about_page];
	page_arary = [overview_page, about_page];

	consine_or_euclidean = "euclidean";
}

/*top (avg) : #052ae1
top (min) : #06ec44
most frequent : #c311e5
*/
