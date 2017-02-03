//********************************************************
//從這裡開始抓餐廳的名稱，我現在才覺得餐廳的名稱叫menu很詭異
//**********************************************************
var client = new XMLHttpRequest();
client.open('GET', '../data/website_word2vec/frontend_restaurant_dict_list.json'); // open的第二個參數放包含餐廳名稱的json
client.onload = function(argument) { // 這function是確認 get 這個method 結束、client已經抓到值後才執行
	after_get_json(client.responseText); // 測試過幾次，發現另外再包一個function 才可以把client的值傳出去，在 16 行
}
client.send(); //執行



/**********************************************************
抓到餐廳的json資料後，執行這個function
**********************************************************/
function after_get_json() {
	json = arguments[0]; // javascript 的functoin 可以不用設定arguments, 傳來的parameter 會依序存放到arguments 這個array 理面
	//json_string = "{\"restaurants\"\:" + json + "}"; // 把原本有很多object 的陣列前面加點東西、讓它變成json 格式
	json_restaurants = JSON.parse(json); // 但變成的json格式其實是個String, 這行把它parse 成json 的object



	// 這裡和之前用array 存放資料的方式差不多，我就不詳細打comment 了
	var content = document.getElementsByClassName('grid')[0];
	for (var i = 0; i < json_restaurants.length; i++) { // 這行for 中間那坨參考第 17 ~ 20 行會好很多
		var temp_li = document.createElement("li"), // 下三行都是創造 element
			temp_div = document.createElement("div"),
			temp_p = document.createElement("p");

		temp_li.business_id = json_restaurants[i].restaurant_id; // 我額外創了一個叫business_id 的attribute 給li 的DOM 實體，value 給一樣這樣
		temp_p.innerHTML = json_restaurants[i].restaurant_name; // 給值給要顯示的框框

		// 各種append
		content.appendChild(temp_li);
		temp_li.setAttribute("rest_num", i + 1);
		temp_li.appendChild(temp_div);
		temp_div.appendChild(temp_p);
	}


	/*    
	    這種functoin 的宣告、就我的認知和使用方式，就是個免洗的function
	    用完即丟、除了遞迴的形式以外其他地方都不能呼叫這個functoin,
	    此function 的目的是幫每個resturant 的框框(li) 加上點擊響應
	*/
	(function add_click_listener() {
		var grid_body = document.getElementsByClassName('grid')[0]; //取得column1 的DOM 實體
		li_list = grid_body.getElementsByTagName('li'); // 取得column1 實體底下的所有li 實體，並依序放到li_list 這個陣列理面


		for (var i = 0; i < li_list.length; i++) {
			var next_btn = document.createElement('div');
			next_btn.nowAt = 0;
			next_btn.setAttribute("class", "next_btn");
			next_btn.innerHTML = "More.."


			create_click_listener(li_list[i], i, next_btn);
			/*
			    十大javascript 之六：Incorrect use of function definitions inside for loops
			    資料來源：https://www.toptal.com/javascript/10-most-common-javascript-mistakes
			    由於這個機車的原因、在for-loop 裡設定響應function 的時候都要確保i 的值有確實傳入
			    所以要特別多寫一個function 來做onclick 的設定，在第 66 行
			*/
		}
	})();
	/*
	    免洗function 結束
	*/



	// 這個function 用來做每個li 的onclick 響應
	// 每個餐廳框框的onclick 宣告開始
	function create_click_listener() {
		/*
		arguments 的用法參考第 17 行
		不能值接用temp_array 去接arguments
		在java上因為是給到該array的記憶體位置、只要其中的某個值一變另外一邊的也會變
		我就去接它的值而不是它的記憶體位置。 我不知道javascript 上會不會有這個問題就是了
		*/
		var temp_array = [];
		temp_array[0] = arguments[0];
		temp_array[1] = arguments[1];
		temp_array[2] = arguments[2]; // next_btn's DOM

		// create next_btn
		temp_array[2].id = "next_btn_" + (parseInt(temp_array[1]) + 1);
		var content2 = document.getElementsByClassName('grid')[1];

		temp_array[2].onclick = function(argument) {
			// console.log(typeof this.nowAt);
			this.nowAt += 5;

			for (var i = this.nowAt; i < this.nowAt + 5; i++) {
				// for (var i = 0; i < (arguments[1].nowAt + 50) ; i++) {
				// for (var i = arguments[1].nowAt; i < arguments[1].nowAt + 50; i++) {
				var temp_li = document.createElement("li"),
					temp_div = document.createElement("div"),
					temp_p = document.createElement("p");

				//temp_li.review_id = json_comments.people[i].review_id; //雖然我不確定會不會用到，我加了個user_id的屬性給產生的column2 的li
				temp_p.innerHTML = json_comments[i];

				temp_li.appendChild(temp_div);
				temp_div.appendChild(temp_p);
				content2.insertBefore(temp_li, this);


				// console.log(i + "passed");
			}

		}


		// 此時的temp_array[0] 是li 的DOM實體，這個funciton會被呼叫和餐廳數目一樣多次所以每個li 都會依序設定到各自的onclick
		// 每個餐廳框框的onclick 設定開始
		temp_array[0].onclick = function() {
				temp_array[2].nowAt = 0;


				// clear block1/block2: canvas way
				/*				document.getElementsByClassName('popular_f')[0].innerHTML = "";
								document.getElementsByClassName('canvas_f')[0].innerHTML = "";
								var canvas_DOM = document.createElement('canvas');
								canvas_DOM.id = "c";
								document.getElementsByClassName('canvas_f')[0].appendChild(canvas_DOM);*/

				// clear block/block2: svg way
				document.getElementsByClassName('popular_f')[0].innerHTML = "";
				document.getElementsByClassName('most_f')[0].innerHTML = "";
				document.getElementById('svg_f').innerHTML = "";


				/*
				一點下去餐廳li 的時候，用最土的方式把loader 的框架做出來
				也就是直接修改column2 的innerHTML
				也透過這種方式把點擊過的上個餐廳的comments 資料清除
				loader 的資料來源: "http://codepen.io/martinvd/pen/xbQJom?editors=0100"
				*/
				document.getElementsByClassName('grid')[1].innerHTML = '<div class=\"loader\" id=\"loader_id\"> <div class=\"inner one\"></div> <div class=\"inner two\"></div> <div class=\"inner three\"></div> </div>';
				document.getElementById('loader_id').style.opacity = 1; // 一開始我把loader 的opacity 設定 0 , 現在要讓它出現所以設成 1

				// 這個for-loop 用來清除餐廳框框的樣式，主要是用在第二次點擊其他餐廳上會用到，不然大家都會有點擊過的樣式
				for (var i = 0; i < li_list.length; i++) {
					li_list[i].className = "";
				}
				temp_array[0].className = "onfocus"; //把大家的樣式都清光後、再把當下點擊的這個餐廳框框加上點擊過的樣式


				// 把每個餐廳框框的樣式取消、把正在選擇的框框加上點擊樣式後，開始抓該餐廳的comments

				// 在做每個餐廳框框的時候、當初加了個屬性是business_id ，現在用那個屬性的value 去comments 資料夾下抓對應檔名的comments json 檔

				//                var client = new XMLHttpRequest();
				//                client.open('GET', '1.json'); // open的第二個參數放包含餐廳名稱的json
				//                client.onload = function(argument) { // 這function是確認 get 這個method 結束、client已經抓到值後才執行
				//                    after_get_json(client.responseText); // 測試過幾次，發現另外再包一個function 才可以把client的值傳出去，在 16 行
				//                }
				//                client.send(); //執行

				// 這裡改成用新的json來源，並把檔名來源變成數字 (btw 沒有0)
				// client.open('GET', (parseInt(temp_array[1]) + 1) + ".json");

				var client = new XMLHttpRequest();
				client.onloadend = function(argument) {

					document.getElementById('loader_id').style.display = "none"; // 抓到commetns 檔後，把loader 消除
					show_comments(client.responseText, temp_array[2], temp_array[1]); // 和之前抓餐廳名稱的原因一樣，詳見第 7 行,temp_array[1]是餐廳編號0~72
					// temp_array[2] is next_btn's DOM

				}
				client.open('GET', "../data/frontend_reviews/restaurant_" + (parseInt(temp_array[1]) + 1) + ".json");
				client.send();


			} // 每個餐廳框框onclick 的設定結束
	} // 每個餐廳框框的onclick 宣告與設定結束
}

count_date = 0;
/* 已經抓到要顯示的comments、和產生餐廳框框差不多的製作方式，詳見第 24 ~ 37 行 */
function show_comments() {
	json = arguments[0];
	json_comments = JSON.parse(json);

	var rest_num = arguments[2];

	var content2 = document.getElementsByClassName('grid')[1];

	// console.log(json_comments.people.length);

	for (var i = arguments[1].nowAt; i < arguments[1].nowAt + 5; i++) {
		// for (var i = 0; i < (arguments[1].nowAt + 50) ; i++) {
		// for (var i = arguments[1].nowAt; i < arguments[1].nowAt + 50; i++) {
		var temp_li = document.createElement("li"),
			temp_div = document.createElement("div"),
			temp_p = document.createElement("p");

		//temp_li.review_id = json_comments.frontend_reviews[i].review_id; //雖然我不確定會不會用到，我加了個user_id的屬性給產生的column2 的li
		temp_p.innerHTML = json_comments.frontend_reviews[i];

		content2.appendChild(temp_li);
		temp_li.appendChild(temp_div);
		temp_div.appendChild(temp_p);

		// console.log(i + "passed");
	}
	content2.appendChild(arguments[1]);

	count_got_draw_date(rest_num);
}

(function() {
	/* 在restaurant_list 美麗化之前先不get json */
	var client_restaurant = new XMLHttpRequest();
	client_restaurant.open('GET', '../data/website_word2vec/frontend_restaurant_dict_list.json');
	client_restaurant.onload = function() {
		popular_array = JSON.parse(client_restaurant.responseText);

		// console.log(popular_array);
		count_got_draw_date();
	}
	client_restaurant.send();


	var client_seniment = new XMLHttpRequest();
	// client_seniment.open('GET', 'sentiment_words.json');
	client_seniment.open('GET', '../data/website_word2vec/frontend_sentiment_statistics.json');
	client_seniment.onload = function() {
		good_word_array = JSON.parse(client_seniment.responseText);

		count_got_draw_date();
	}
	client_seniment.send();
})();

function count_got_draw_date() {
	count_date++;
	if (count_date >= 3) {
		// count_date = 0;

		rest_num = arguments[0];
		visualization(rest_num);
	}
}

bad_word_array = [],
	good_word_array = [],
	popular_array = [],
	most_array = [],
	bad_group_array = [],
	good_group_array = [],
	popular_group_array = [],
	bad_point_array = [],
	good_point_array = [],
	popular_point_array = [];

// svg
function visualization() {
	console.log("svg way");
	rest_num = arguments[0];
	var check_onclick = false;
	var svg_f = document.getElementById('svg_f'),
		block2_DOM = document.getElementsByClassName('block2')[0]; // 0.95, 0.8
	var w = block2_DOM.offsetWidth * 0.95,
		h = block2_DOM.offsetHeight * 0.89;

	var svg = makeSVG('svg', {
		width: w,
		height: h
	});
	svg_f.appendChild(svg);

	// draw points and axis
	draw_point();


	// create_popular_blocks
	(function create_popular_blocks() {
		var popular_f = document.getElementsByClassName("popular_f")[0];
		for (var i = 0; i < 5; i++) { //Tom: 因為我們只要推五道菜，所以i給5
			var popular_block = document.createElement("div");

			popular_block.setAttribute("class", "popular");
			// popular_block.style.height = document.getElementsByClassName('block1')[0].offsetHeight * 0.3 + "px";
			//			popular_block.innerHTML = popular_array[i].name;
			popular_block.innerHTML = (i + 1) + ". " + popular_array[rest_num].top5_euclidean_avg[i].name + "";
			// popular_block.innerHTML = (i + 1) + ". " + popular_array[rest_num].top_dishes[i].name + " ( " + (popular_array[rest_num].top_dishes[i].score).toFixed(3) + " )";
			popular_f.appendChild(popular_block);
		} // create popular-block finished			
	})();

	// create_frequency_block
	(function create_frequency_blocks() {
		var most_f = document.getElementsByClassName("most_f")[0];
		for (var i = 0; i < 5; i++) { //Tom: 因為我們只要推五道菜，所以i給5
			var most_block = document.createElement("div");

			most_block.setAttribute("class", "most");
			// most_block.setAttribute("class", "most");
			// popular_block.style.height = document.getElementsByClassName('block1')[0].offsetHeight * 0.3 + "px";
			//			popular_block.innerHTML = popular_array[i].name;
			most_block.innerHTML = (i + 1) + ". " + popular_array[rest_num].top5_frequent[i].name + "";
			// most_block.innerHTML = (i + 1) + ". " + popular_array[rest_num].top_dishes[i].name + " ( " + popular_array[rest_num].top_dishes[i].count + " )";
			most_f.appendChild(most_block);
		} // create most-block finished			
	})();

	// create popular onlcick sensor
	(function create_popular_onclick() {
		// start to create popular_blocks' onclick sensor
		var p_block_array = document.getElementsByClassName('popular');
		for (var i = 0; i < p_block_array.length; i++) {
			p_block_onclick(p_block_array[i], i);
		}

		function p_block_onclick(p_block_DOM, number) {
			p_block_DOM.onclick = function() {
				check_onclick = true;
				for (var i = 0; i < p_block_array.length; i++) {
					p_block_array[i].className = "popular";
				}
				p_block_DOM.className += " onfocus";
			}
		}
	})();


	// create_popular_hover();
	(function create_popular_hover() {
		// start to create popular_blocks' hover sensor
		var p_block_array = document.getElementsByClassName('popular');
		for (var i = 0; i < p_block_array.length; i++) {
			p_block_onhover(p_block_array[i], i);
		}

		function p_block_onhover(p_block_DOM, number) {
			p_block_DOM.onmouseover = function() {
				if (check_onclick) {
					check_onclick = !check_onclick;
					clearRect_function();
				}

				// create good line
				// 這邊乘多少除多少是我亂弄的 基本上先這樣 之後再改 Denffer 4/2
				for (var i = 0; i < good_word_array.length; i++) {
					var good_line = makeSVG('path', {

						d: "M" + (((popular_array[rest_num].top5_euclidean_avg[number].x) + 2) / 2) * w/2 + " " + (((-popular_array[rest_num].top5_euclidean_avg[number].y) + 2) / 2) * h/2 + "L" + (((good_word_array[i].x) + 2) / 2) * w/2 + " " + (((-good_word_array[i].y) + 2) / 2) * h/2 + "",
						stroke: "#01ADFF",
						"stroke-width": 1
					});
					var line_measure = good_line.getTotalLength();
					good_line.setAttribute("stroke-dasharray", line_measure);
					good_line.setAttribute("stroke-dashoffset", line_measure);
					svg.appendChild(good_line);

					good_line.setAttribute("class", "line_animation");
				}

				// create bad line
				// 這邊乘多少除多少是我亂弄的 基本上先這樣 之後再改 Denffer 4/2
				for (var i = 0; i < bad_word_array.length; i++) {
					var bad_line = makeSVG('path', {
						d: "M" + (((popular_array[rest_num].top5_euclidean_avg[number].x) + 2) / 2) * w/2 + " " + (((-popular_array[rest_num].top5_euclidean_avg[number].y) + 2) / 2) * h/2 + "L" + (((bad_word_array[i].x) + 2) / 2) * w/2 + " " + (((-bad_word_array[i].y) + 2) / 2) * h/2 + "",
						stroke: "#E82F2F",
						"stroke-width": 1
					});
					var line_measure = bad_line.getTotalLength();
					bad_line.setAttribute("stroke-dasharray", line_measure);
					bad_line.setAttribute("stroke-dashoffset", line_measure);
					svg.appendChild(bad_line);

					bad_line.setAttribute("class", "line_animation");
				}

				draw_point();
			}

			p_block_DOM.onmouseout = function() {
				if (!check_onclick) {
					clearRect_function();
				}
			}

			function clearRect_function() {
				/*				var clearRect = makeSVG('rect', {
									x: 0,
									y: 0,
									fill: "white",
									width: w,
									height: h
								});
								svg.appendChild(clearRect);*/

				svg.innerHTML = "";


				// then draw axis and points back
				draw_point();
			}

		}
	})();

	function draw_point() {
		// draw axis first 
		var axis_svg = makeSVG('path', {
			d: "M" + w / 2 + " 0L" + w / 2 + " " + h + "M0 " + h / 2 + " L" + w + " " + h / 2,
			stroke: "black",
			// stroke: "#A1A1A1",
			"stroke-width": 1
		});
		svg.appendChild(axis_svg);



		// draw popular point
		// 這邊乘多少除多少是我亂弄的 基本上先這樣 之後再改  // Denffer 4/2
		for (var i = 0; i < 5; i++) { //五道菜，所以i給5
			var circle_popular = makeSVG('circle', {
				cx: (((popular_array[rest_num].top5_euclidean_avg[i].x) + 2) / 2) * w/2,
				cy: (((-popular_array[rest_num].top5_euclidean_avg[i].y) + 2) / 2) * h/2,
				r: 5,
				stroke: '#141414',
				'stroke-width': 2,
				fill: '#141414'
			});
			svg.appendChild(circle_popular);

			popular_point_array[i] = circle_popular;

		}

		// draw good point
		for (var i = 0; i < good_word_array.length; i++) {
			var circle_good = makeSVG('circle', {
				cx: (((good_word_array[i].x) + 2) / 2) * w/2,
				cy: (((-good_word_array[i].y) + 2) / 2) * h/2,
				r: 5,
				stroke: "#60A4FD",
				'stroke-width': 2,
				fill: "#60A4FD"
			});
			svg.appendChild(circle_good);

			good_point_array[i] = circle_good;
		}

		// draw bad point
		for (var i = 0; i < bad_word_array.length; i++) {
			var circle_bad = makeSVG('circle', {
				cx: (((bad_word_array[i].x) + 2) / 2) * w/2,
				cy: (((-bad_word_array[i].y) + 2) / 2) * h/2,
				r: 5,
				stroke: "#990216",
				'stroke-width': 2,
				fill: "#990216"
			});
			svg.appendChild(circle_bad);

			bad_point_array[i] = circle_bad;
		}


		// draw popular text
		for (var i = 0; i < 5; i++) {
			var group = makeSVG('g', {});
			svg.appendChild(group);
			popular_group_array[i] = group;

			var back_rect = makeSVG('rect', {
				x: (((popular_array[rest_num].top5_euclidean_avg[i].x) + 2) / 2) * w/2,
				y: (((-popular_array[rest_num].top5_euclidean_avg[i].y) + 2) / 2) * h/2 - 35,
				fill: "rgba(255,255,255,0.8)",
				width: 100,
				height: 30
			});
			group.appendChild(back_rect);

			var text_popular = makeSVG('text', {
				x: (((popular_array[rest_num].top5_euclidean_avg[i].x) + 2) / 2) * w/2,
				y: (((-popular_array[rest_num].top5_euclidean_avg[i].y) + 2) / 2) * h/2 - 35,
				"font-size": "240px",
				stroke: "black"
			});
			text_popular.innerHTML = popular_array[rest_num].top5_euclidean_avg[i].name;
			group.appendChild(text_popular);
		}

		// draw good text
		for (var i = 0; i < good_point_array.length; i++) {
			var group = makeSVG('g', {});
			svg.appendChild(group);
			good_group_array[i] = group;

			var back_rect = makeSVG('rect', {
				x: (((good_word_array[i].x) + 2) / 2) * w/2,
				y: (((-good_word_array[i].y) + 2) / 2) * h/2 - 20,
				fill: "rgba(255,255,255,0.8)",
				width: 100,
				height: 30
			});
			group.appendChild(back_rect);

			var text_popular = makeSVG('text', {
				x: (((good_word_array[i].x) + 2) / 2) * w/2,
				y: (((-good_word_array[i].y) + 2) / 2) * h/2 -20,
				"font-size": "240px",
				fill: "#60A4FD",
				stroke: "#60A4FD"
			});
			text_popular.innerHTML = good_word_array[i].word;
			group.appendChild(text_popular);
		}

		// draw bad text
		for (var i = 0; i < bad_point_array.length; i++) {
			var group = makeSVG('g', {});
			svg.appendChild(group);
			bad_group_array[i] = group;

			var back_rect = makeSVG('rect', {
				x: (((bad_word_array[i].x) + 2) / 2) * w/2,
				y: (((-bad_word_array[i].y) + 2) / 2) * h/2 -35,
				fill: "rgba(255,255,255,0.8)",
				width: 100,
				height: 30
			});
			group.appendChild(back_rect);

			var text_popular = makeSVG('text', {
				x: (((bad_word_array[i].x) + 2) / 2) * w/2,
				y: (((-bad_word_array[i].y) + 2) / 2) * h/2 -35,
				"font-size": "240px",
				fill: "#990216",
				stroke: "#990216"
			});
			text_popular.innerHTML = bad_word_array[i].word;
			group.appendChild(text_popular);
		}

		// crate popular points' hover
		for (var i = 0; i < popular_point_array.length; i++) {
			create_points_hover(popular_point_array[i], "popular", i);
		}
		// create good point's hover
		for (var i = 0; i < good_point_array.length; i++) {
			create_points_hover(good_point_array[i], "good", i);
		}
		// create bad point's hover
		for (var i = 0; i < bad_point_array.length; i++) {
			create_points_hover(bad_point_array[i], "bad", i);
		}

		function create_points_hover(point, type, number) {
			if (type == "popular") {
				point.onmouseover = function() {
					popular_group_array[number].setAttribute("class", "group_class");
				}
				point.onmouseout = function() {
					popular_group_array[number].setAttribute("class", "");
				}
			} else if (type == "good") {
				point.onmouseover = function() {
					good_group_array[number].setAttribute("class", "group_class");
				}
				point.onmouseout = function() {
					good_group_array[number].setAttribute("class", "");
				}
			} else if (type == "bad") {
				point.onmouseover = function() {
					bad_group_array[number].setAttribute("class", "group_class");
				}
				point.onmouseout = function() {
					bad_group_array[number].setAttribute("class", "");
				}
			}
		}

	}

	// example of create svg element
	function makeSVG(tag, attrs) {
		var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attrs)
			el.setAttribute(k, attrs[k]);
		return el;
	}
}


/*
    最後提醒，我用windows 在本機端要執行這個javascript 的時候
    要用 " 執行 > chrome.exe --disable-web-security " 這種方式才能關掉chrome的安全東東
    也才能從本機端這裡載file 進去這樣*/
