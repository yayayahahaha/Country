document.addEventListener("DOMContentLoaded", function() {

	rightVue = new Vue({
		el: "#rightVue",
		data: {
			computed_ranking: [],
			original_ranking: [],
			reranked_ranking: [],
			freq_ranking: [],
			computed_reviews_total: [],
			original_reviews_total: [],
			reranked_reviews_total: [],
			freq_reviews_total: [],
			current_review_array: [],
			svg_width: parseInt(document.querySelector(".draw_place").offsetWidth) * 0.9,
			svg_height: parseInt(document.querySelector(".draw_place").offsetHeight) * 0.9,
			svg_prepare: 0,
			svg_axis_element: "",
			svg_emo_array: []
		},
		watch: {
			svg_width: function() {
				rightVue.svg_size_change();
			},
			svg_height: function() {
				rightVue.svg_size_change();
			}
		},
		methods: {
			popurClick: function() {
				$(event.target)[0].style.height = "300px";
				$(event.target)[0].style.opacity = 1;
				console.log($(event));
			},
			pickedClick: function(obj) {
				for (var i = 0; i < document.querySelectorAll(".picked").length; i++) {
					document.querySelectorAll(".picked")[i].classList = "picked";
					document.querySelectorAll(".detail")[i].style.height = 0;
				}

				dom = obj.innerHTML ? obj : obj.target; //這行用來檢查是不是自動點擊
				// console.log(dom);
				$(dom).next()[0].style.height = "12vh";
				dom.classList += " onfocus";

				pickedKey = dom.innerHTML.split(".")[0];
				pickedCate = $(dom).next().next()[0].innerHTML;
				nowAt = 0;
				rightVue.current_review_array = [];
				switch (pickedCate) {
					case "computed":
						tmp_review_array = rightVue.computed_reviews_total[pickedKey].slice(0);
						break;

					case "original":
						tmp_review_array = rightVue.original_reviews_total[pickedKey].slice(0);
						break;

					case "reranked":
						tmp_review_array = rightVue.reranked_reviews_total[pickedKey].slice(0);
						break;

					case "freq":
						tmp_review_array = rightVue.freq_reviews_total[pickedKey].slice(0);
						break;
				}
				rightVue.autoLoad();
				$("#reviews_move").scrollTop(0);
			},
			saveReview: function(res, cate, key) {
				switch (cate) {
					case "computed":
						rightVue.computed_reviews_total[key] = res;
						break;

					case "original":
						rightVue.original_reviews_total[key] = res;
						break;

					case "reranked":
						rightVue.reranked_reviews_total[key] = res;
						break;

					case "freq":
						rightVue.freq_reviews_total[key] = res;
						break;
				}
			},
			autoLoad: function() {
				/* 底下if 裡的數字為一次載入的筆數 */
				for (var i = nowAt; i < tmp_review_array.length; i++) {
					rightVue.current_review_array.push(tmp_review_array[i]);
					nowAt++;
					if (nowAt % 10 == 0) {
						break;
					}
				}
			},
			svg_size_change: function(resize) {
				/* 如果被呼叫了兩次、也就是情緒字讀取完畢和挑出來的景點排序完畢後開始畫 */
				rightVue.svg_prepare++;
				if (rightVue.svg_prepare == 2 || resize == "resize") {
					/* 座標軸 */
					svg_axis = [
						[rightVue.svg_width / 2, 0],
						[rightVue.svg_width, rightVue.svg_height / 2],
						[rightVue.svg_width / 2, rightVue.svg_height],
						[0, rightVue.svg_height / 2]
					];
					rightVue.svg_axis_element = "M" + svg_axis[0][0] + " " + svg_axis[0][1] + "L" + svg_axis[2][0] + " " + svg_axis[2][1] + "M" + svg_axis[3][0] + " " + svg_axis[3][1] + " L" + svg_axis[1][0] + " " + svg_axis[1][1];

					/* 情緒字 */
					for (var i = 0; i < rightVue.svg_emo_array.length; i++) {
						rightVue.svg_emo_array[i].afterV[0] = (rightVue.svg_emo_array[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
						rightVue.svg_emo_array[i].afterV[1] = (rightVue.svg_emo_array[i].vector2[1] * (rightVue.svg_height / 2) / 100) + (rightVue.svg_height / 2);
					}


				}
			}
		}
	});

	leftVue = new Vue({
		el: "#vueId",
		data: {
			string: "hello",
			country_list: [],
			reviews_list: []
		},
		methods: {
			counClick: function(obj) {
				/* 這行用來關閉左邊的toggle */
				document.all.btn.onclick();

				/* 用來重畫svg */
				rightVue.svg_prepare = 0;

				countAjax = 0;
				countryReviewList = [];

				computed_ranking = [];
				original_ranking = [];
				reranked_ranking = [];
				freq_ranking = [];
				for (var i = 0; i < document.getElementsByClassName("cBasic").length; i++) {
					document.getElementsByClassName("cBasic")[i].setAttribute("class", "cBasic");
				}
				try {
					$(event.target)[0].setAttribute("class", "cBasic onfocus");
					console.log($(event.target)[0].innerHTML);
					var tmpName = $(event.target)[0].innerHTML.split(",")[0];
					tmpArray = [];
					if (tmpName.split(".").length > 2) {
						for (var i = 1; i < tmpName.split(".").length; i++) {
							tmpArray.push(tmpName.split(".")[i].trim());
						}
						tmpName = tmpArray.join("_");
						var countryName = tmpName;
					} else {
						var countryName = ($(event.target)[0].innerHTML).split(".")[1].split(",")[0].trim().split(" ").join("_");
					}
					console.log(countryName);


				} catch (e) {
					obj.setAttribute("class", "cBasic onfocus");

					var countryName = (obj.innerHTML).split(".")[1].split(",")[0].trim().split(" ").join("_");
					console.log(countryName);
				}
				for (var i = 1; i <= 20; i++) {
					if (i <= 9) {
						countryCallAjax('/data/frontend_reviews/' + countryName + '/' + countryName + '_0' + i + '.json');
					} else {
						countryCallAjax('/data/frontend_reviews/' + countryName + '/' + countryName + '_' + i + '.json');
					}
				}

				/* 取得國家的情緒字 */
				rightVue.getCountryEmotionDone = false;
				$.ajax({
						url: 'data/lexicon/' + countryName + ".json",
					})
					.done(function(res) {
						/* 情緒字 */
						for (var i = 0; i < res.length; i++) {
							res[i].afterV = [];
							res[i].afterV[0] = (res[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
							res[i].afterV[1] = (res[i].vector2[1] * (rightVue.svg_height / 2) / 100) + (rightVue.svg_height / 2);

							s = 5;
							res[i].cross = "M"+res[i].afterV[0]+" "+(res[i].afterV[1]-s)+" L"+res[i].afterV[0]+" "+(res[i].afterV[1]+s)+"M"+(res[i].afterV[0]-s)+" "+res[i].afterV[1]+"L"+(res[i].afterV[0]+s)+" "+res[i].afterV[1]+"";
						}
						rightVue.svg_emo_array = res;
						rightVue.svg_size_change();
					})
					.fail(function(res) {});


			}
		}
	});


	function countryCallAjax(path) {
		$.ajax({
				url: path,
			})
			.done(function(res) {
				countryAjaxCount(res);
			})
			.fail(function(res) {
				console.log(res);
			});
	}

	function countryAjaxCount(res) {
		countAjax++;
		// console.clear();
		console.log(countAjax);

		countryReviewList.push(res);
		/* 讀到被點到的國家的20個景點後，要生成popular list */
		if (countAjax == 20) {
			console.log("done!");
			countryReviewList = countryReviewList.sort(function(a, b) {
				return a["computed_ranking"] - b["computed_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				computed_ranking.push(countryReviewList[i]);
			}
			rightVue.computed_ranking = computed_ranking;

			countryReviewList = countryReviewList.sort(function(a, b) {
				return a["original_ranking"] - b["original_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				original_ranking.push(countryReviewList[i]);
			}
			rightVue.original_ranking = original_ranking;

			countryReviewList = countryReviewList.sort(function(a, b) {
				return a["reranked_ranking"] - b["reranked_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				reranked_ranking.push(countryReviewList[i]);
			}
			rightVue.reranked_ranking = reranked_ranking;

			countryReviewList = countryReviewList.sort(function(a, b) {
				return b["freq_ranking"] - a["freq_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				freq_ranking.push(countryReviewList[i]);
			}
			rightVue.freq_ranking = freq_ranking;

			console.log("sort done");

			for (var i = 0; i < document.querySelectorAll(".pBasic").length; i++) {
				makePopularClick(document.querySelectorAll(".pBasic")[i], document.querySelectorAll(".pBasic"));
			}

			function makePopularClick(obj, all) {
				/* 中間的title 被點到後要展開、同時要點裡面的第一個detail */
				obj.querySelector(".title").onclick = function() {
					for (var i = 0; i < all.length; i++) {
						all[i].style.height = "5.5vh";
						obj.style.opacity = 1;
					}
					obj.style.height = "75vh";
					obj.style.opacity = 1;

					/* 點理面的第一個detail */
					setTimeout(function() {
						rightVue.pickedClick(obj.querySelector(".picked"));
					}, 0);
				}
			}

			/* 點擊第一個popular list 的 title, 也就是Computed */
			document.querySelectorAll(".pBasic")[0].querySelector(".title").onclick();

			/* 開始畫svg */
			rightVue.svg_size_change();
		}
	}



	/* 程式從這裡開始 */

	/* 取得所有國家的名稱 */
	$.ajax({
			url: 'data/locations.json',
		})
		.done(function(res) {
			afterGetCountryList(res);
		})
		.fail(function(res) {
			console.log("Ajax Fail!!!");
		});

	function afterGetCountryList(countryList) {
		leftVue.country_list = countryList;

		setTimeout(function() {
			document.all.btn.onclick();
			leftVue.counClick(document.querySelector(".cBasic"));
		}, 0);
	}


	/* More 的按鈕 */
	btnToggle = true;
	document.all.btn.onclick = function() {
		if (btnToggle) {
			btnToggle = false;
			document.querySelector(".rest_list").style.left = "0px";
		} else {
			btnToggle = true;
			document.querySelector(".rest_list").style.left = "-20vw";
		}
	}

	/* review 捲動到底時的auto load, 一次10筆 */
	$("#reviews_move").scroll(function(event) {
		if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			rightVue.autoLoad();
		}
	});
});

window.addEventListener("resize", function() {
	rightVue.svg_width = parseInt(document.querySelector(".draw_place").offsetWidth) * 0.9;
	rightVue.svg_height = parseInt(document.querySelector(".draw_place").offsetHeight) * 0.9;
	rightVue.svg_size_change("resize");
});