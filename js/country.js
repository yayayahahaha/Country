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
			svg_emo_array: [],
			svg_title: {
				title: "",
				x: null,
				y: null
			},
			svg_icon: {
				com: {
					x: null,
					y: null
				},
				ori: {
					x: null,
					y: null
				},
				rer: {
					x: null,
					y: null
				},
				fre: {
					x: null,
					y: null
				},
				cross: {
					x: null,
					y: null,
					path: ""
				}
			},
			loading_cover: true,
			loading_process: 0
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
				/* 如果被呼叫了兩次、也就是情緒字讀取完畢和挑出來的景點排序完畢後開始畫, 或是resize 時也可以直接開始畫 */
				rightVue.svg_prepare++;
				if (rightVue.svg_prepare == 2 || resize == "resize") {
					/* 座標軸 */
					svg_axis = [
						[rightVue.svg_width / 2, 0],
						[rightVue.svg_width, rightVue.svg_height * 0.8 / 2],
						[rightVue.svg_width / 2, rightVue.svg_height * 0.8],
						[0, rightVue.svg_height * 0.8 / 2]
					];
					rightVue.svg_axis_element = "M" + svg_axis[0][0] + " " + svg_axis[0][1] + "L" + svg_axis[2][0] + " " + svg_axis[2][1] + "M" + svg_axis[3][0] + " " + svg_axis[3][1] + " L" + svg_axis[1][0] + " " + svg_axis[1][1];

					draw_height = rightVue.svg_height * 0.85;

					/* 情緒字 */
					for (var i = 0; i < rightVue.svg_emo_array.length; i++) {
						/* 正規劃 */
						rightVue.svg_emo_array[i].afterV[0] = (rightVue.svg_emo_array[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
						rightVue.svg_emo_array[i].afterV[1] = -((rightVue.svg_emo_array[i].vector2[1] * (draw_height / 2) / 100)) + (draw_height / 2);

						/* 十字 */
						s = 5;
						rightVue.svg_emo_array[i].cross = "M" + rightVue.svg_emo_array[i].afterV[0] + " " + (rightVue.svg_emo_array[i].afterV[1] - s) + " L" + rightVue.svg_emo_array[i].afterV[0] + " " + (rightVue.svg_emo_array[i].afterV[1] + s) + "M" + (rightVue.svg_emo_array[i].afterV[0] - s) + " " + rightVue.svg_emo_array[i].afterV[1] + "L" + (rightVue.svg_emo_array[i].afterV[0] + s) + " " + rightVue.svg_emo_array[i].afterV[1] + "";
					}


					/* 景點 */
					normalize = [];
					for (var i = 0; i < 5; i++) {
						rightVue.computed_ranking[i].afterV[0] = (rightVue.computed_ranking[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
						rightVue.computed_ranking[i].afterV[1] = -((rightVue.computed_ranking[i].vector2[1] * (draw_height / 2) / 100)) + (draw_height / 2);
						normalize.push(rightVue.computed_ranking[i].total_attraction_name_mentioned_count);

						rightVue.original_ranking[i].afterV[0] = (rightVue.original_ranking[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
						rightVue.original_ranking[i].afterV[1] = -((rightVue.original_ranking[i].vector2[1] * (draw_height / 2) / 100)) + (draw_height / 2);
						normalize.push(rightVue.original_ranking[i].total_attraction_name_mentioned_count);

						rightVue.reranked_ranking[i].afterV[0] = (rightVue.reranked_ranking[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
						rightVue.reranked_ranking[i].afterV[1] = -((rightVue.reranked_ranking[i].vector2[1] * (draw_height / 2) / 100)) + (draw_height / 2);
						normalize.push(rightVue.reranked_ranking[i].total_attraction_name_mentioned_count);

						rightVue.freq_ranking[i].afterV[0] = (rightVue.freq_ranking[i].vector2[0] * (rightVue.svg_width / 2) / 100) + (rightVue.svg_width / 2);
						rightVue.freq_ranking[i].afterV[1] = -((rightVue.freq_ranking[i].vector2[1] * (draw_height / 2) / 100)) + (draw_height / 2);
						normalize.push(rightVue.freq_ranking[i].total_attraction_name_mentioned_count);
					}
					normalize = normalize.sort(function(a, b) {
						return b - a;
					});

					/* 正規畫底下景點半徑 */
					max = normalize[0];
					min = normalize[normalize.length - 1];
					for (var i = 0; i < 5; i++) {
						x1 = rightVue.computed_ranking[i].total_attraction_name_mentioned_count;
						x1 = (x1 - min) / (max - min);
						rightVue.computed_ranking[i].radius = x1;

						x2 = rightVue.original_ranking[i].total_attraction_name_mentioned_count;
						x2 = (x2 - min) / (max - min);
						rightVue.original_ranking[i].radius = x2;

						x3 = rightVue.reranked_ranking[i].total_attraction_name_mentioned_count;
						x3 = (x3 - min) / (max - min);
						rightVue.reranked_ranking[i].radius = x3;

						x4 = rightVue.freq_ranking[i].total_attraction_name_mentioned_count;
						x4 = (x4 - min) / (max - min);
						rightVue.freq_ranking[i].radius = x4;
					}

					/* 標題 */
					rightVue.svg_title.title = countryName;
					rightVue.svg_title.x = rightVue.svg_width / 12;
					rightVue.svg_title.y = rightVue.svg_height / 12;

					/* 圖例 */
					rightVue.svg_icon.com.x = rightVue.svg_width / 20;
					rightVue.svg_icon.com.y = rightVue.svg_height * 0.9;

					rightVue.svg_icon.ori.x = rightVue.svg_width / 20;
					rightVue.svg_icon.ori.y = rightVue.svg_height * 0.95;

					rightVue.svg_icon.rer.x = rightVue.svg_width / 20;
					rightVue.svg_icon.rer.y = rightVue.svg_height;

					rightVue.svg_icon.fre.x = rightVue.svg_width / 2;
					rightVue.svg_icon.fre.y = rightVue.svg_height * 0.9;

					rightVue.svg_icon.cross.x = rightVue.svg_width / 2;
					rightVue.svg_icon.cross.y = rightVue.svg_height * 0.95;
					crossC = {};
					crossC.x = rightVue.svg_icon.cross.x - 7;
					crossC.y = rightVue.svg_icon.cross.y - 5;
					rightVue.svg_icon.cross.path = "M" + crossC.x + " " + (crossC.y - s) + " L" + crossC.x + " " + (crossC.y + s) + "M" + (crossC.x - s) + " " + crossC.y + "L" + (crossC.x + s) + " " + crossC.y;


					/* svg 上的點的click 和hover 響應等 */
					setTimeout(function() {
						circleList = document.querySelectorAll(".dishes_hover");
						nameList = document.querySelectorAll(".text_class");
						for (var i = 0; i < circleList.length; i++) {
							makeCircleEvent(circleList[i], i);
						}

						function makeCircleEvent(obj, number) {
							obj.onclick = function() {
								for (var i = 0; i < nameList.length; i++) {
									nameList[i].style.opacity = 0;
									circleList[i].style.stroke = "rgba(0,0,0,0.4)";
									circleList[i].style.strokeWidth = 1;
								}
								nameList[number].style.opacity = 1;
								circleList[number].style.stroke = "red";
								circleList[number].style.strokeWidth = 3;

								for (var i = 0; i < document.querySelectorAll(".pBasic").length; i++) {
									document.querySelectorAll(".pBasic")[i].style.height = "5.5vh";
								}
								if (number <= 4) {
									document.querySelectorAll(".pBasic")[0].style.height = "75vh";
								} else if (number >= 5 && number <= 9) {
									document.querySelectorAll(".pBasic")[1].style.height = "75vh";
								} else if (number >= 10 && number <= 14) {
									document.querySelectorAll(".pBasic")[2].style.height = "75vh";
								} else {
									document.querySelectorAll(".pBasic")[3].style.height = "75vh";
								}

								document.querySelectorAll(".picked")[number].onclick();

							}
							obj.onmouseover = function() {
								nameList[number].style.opacity = 1;
								circleList[number].style.stroke = "red";
								circleList[number].style.strokeWidth = 3;
							}
							obj.onmouseout = function() {
								if (number != nowWho) {
									nameList[number].style.opacity = 0;
									circleList[number].style.stroke = "rgba(0,0,0,0.4)";
									circleList[number].style.strokeWidth = 1;
								}
							}
						}
						/* 點擊第一個點 */
						circleList[0].onclick();
					}, 0);

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
				/* 顯示loading cover */
				firstClick = 0;
				$("#reviews_move").animate({
					opacity: 0
				}, 400, function() {
					$("#reviews_move")[0].style.transform = "translateY(100vh)";
				});
				$("svg").animate({
					opacity: 0
				}, 400);
				try {
					for (var i = 0; i < document.querySelectorAll(".detail").length; i++) {
						document.querySelectorAll(".detail")[i].style.height = 0;
					}
					for (var i = 0; i < document.querySelectorAll(".pBasic").length; i++) {
						document.querySelectorAll(".pBasic")[i].style.height = "5.5vh";
					}
				} catch (e) {
					console.log(e);
				}

				setTimeout(function() {
					$(".loading_cover").fadeIn();
				}, 400);


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
					// console.log($(event.target)[0].innerHTML);
					var tmpName = $(event.target)[0].innerHTML.split(",")[0];
					tmpArray = [];
					if (tmpName.split(".").length > 2) {
						for (var i = 1; i < tmpName.split(".").length; i++) {
							tmpArray.push(tmpName.split(".")[i].trim());
						}
						tmpName = tmpArray.join("_");
						countryName = tmpName;
					} else {
						countryName = ($(event.target)[0].innerHTML).split(".")[1].split(",")[0].trim().split(" ").join("_");
					}
					// console.log(countryName);


				} catch (e) {
					obj.setAttribute("class", "cBasic onfocus");

					countryName = (obj.innerHTML).split(".")[1].split(",")[0].trim().split(" ").join("_");
					// console.log(countryName);
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
						for (var i = 0; i < res.length; i++) {
							res[i].afterV = [];
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
		rightVue.loading_process = Math.floor((countAjax / 20) * 100);
		// console.log(countAjax);

		countryReviewList.push(res);
		/* 讀到被點到的國家的20個景點後，要生成popular list */
		if (countAjax == 20) {
			$(".loading_cover").fadeOut();
			// console.log("done!");
			countryReviewList = countryReviewList.sort(function(a, b) {
				return a["computed_ranking"] - b["computed_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				computed_ranking.push(countryReviewList[i]);
				computed_ranking[i].afterV = [];
			}
			rightVue.computed_ranking = computed_ranking;

			countryReviewList = countryReviewList.sort(function(a, b) {
				return a["original_ranking"] - b["original_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				original_ranking.push(countryReviewList[i]);
				original_ranking[i].afterV = [];
			}
			rightVue.original_ranking = original_ranking;

			countryReviewList = countryReviewList.sort(function(a, b) {
				return a["reranked_ranking"] - b["reranked_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				reranked_ranking.push(countryReviewList[i]);
				reranked_ranking[i].afterV = [];
			}
			rightVue.reranked_ranking = reranked_ranking;

			countryReviewList = countryReviewList.sort(function(a, b) {
				return b["freq_ranking"] - a["freq_ranking"];
			});
			for (var i = 0; i < 5; i++) {
				freq_ranking.push(countryReviewList[i]);
				freq_ranking[i].afterV = [];
			}
			rightVue.freq_ranking = freq_ranking;

			// console.log("sort done");

			for (var i = 0; i < document.querySelectorAll(".pBasic").length; i++) {
				makePopularClick(document.querySelectorAll(".pBasic")[i], document.querySelectorAll(".pBasic"));
			}

			function makePopularClick(obj, all) {
				/* 中間的title 被點到後要展開、同時要點裡面的第一個detail */
				obj.querySelector(".title").onclick = function() {
					for (var i = 0; i < all.length; i++) {
						all[i].style.height = "5.5vh";
					}
					obj.style.height = "75vh";
					obj.style.opacity = 1;

					setTimeout(function() {
						pickeds = document.querySelectorAll(".picked");
						for (var i = 0; i < pickeds.length; i++) {
							makePickedClick(pickeds[i], i);
						}

						function makePickedClick(obj, number) {
							obj.onclick = function() {
								nowWho = number;
								/* 消除其他的樣式 */
								for (var i = 0; i < document.querySelectorAll(".picked").length; i++) {
									document.querySelectorAll(".picked")[i].classList = "picked";
									document.querySelectorAll(".detail")[i].style.height = 0;
								}

								/* 消除其他circle 的樣式 */
								try {
									for (var i = 0; i < nameList.length; i++) {
										nameList[i].style.opacity = 0;
										circleList[i].style.stroke = "rgba(0,0,0,0.4)";
										circleList[i].style.strokeWidth = 1;
									}

									/* 幫被點到的circle 加上樣式*/
									nameList[number].style.opacity = 1;
									circleList[number].style.stroke = "red";
									circleList[number].style.strokeWidth = 3;
								} catch (e) {

								}



								dom = obj.innerHTML ? obj : obj.target; //這行用來檢查是不是自動點擊

								/* 幫被點到的景點加上樣式 */
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

								/* 結束loading */
								firstClick++;
								if (firstClick == 2) {
									/* load cover */
									$("#reviews_move").animate({
										opacity: 1
									}, 400);
									$("#reviews_move")[0].style.transform = "translateY(0)";
									$("svg").animate({
										opacity: 1
									}, 400);
								}
							}
							obj.onmouseover = function() {
								nameList[number].style.opacity = 1;
								circleList[number].style.stroke = "red";
								circleList[number].style.strokeWidth = 3;
							}
							obj.onmouseout = function() {
								if (number != nowWho) {
									nameList[number].style.opacity = 0;
									circleList[number].style.stroke = "rgba(0,0,0,0.4)";
									circleList[number].style.strokeWidth = 1;
								}
							}

						}
						/* 點擊被點到的國家的Computed的第一個景點 */
						obj.querySelector(".picked").onclick();
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
			document.querySelector(".right_side").style.opacity = 0.2;
			document.querySelector(".right_side").style.pointerEvents = "none";
		} else {
			btnToggle = true;
			document.querySelector(".rest_list").style.left = "-20vw";
			document.querySelector(".right_side").style.opacity = 1;
			document.querySelector(".right_side").style.pointerEvents = "auto";
		}
	}

	/* review 捲動到底時的auto load, 一次10筆 */
	$("#reviews_move").scroll(function(event) {
		if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
			rightVue.autoLoad();
		}
	});

	/* 標頭按鈕事件 */
	$("#system_id")[0].onclick = function() {
		$("#overview_page_id")[0].style.opacity = 0;
		$("#overview_page_id")[0].style.zIndex = -1;

		$("#about_page_id")[0].style.opacity = 0;
		$("#about_page_id")[0].style.zIndex = -1;

	}
	$("#overview_id")[0].onclick = function() {
		$("#overview_page_id")[0].style.zIndex = 10;
		$("#overview_page_id")[0].style.opacity = 1;

		$("#about_page_id")[0].style.zIndex = -1;
		$("#about_page_id")[0].style.opacity = 0;
	}
	$("#about_id")[0].onclick = function() {
		$("#about_page_id")[0].style.zIndex = 10;
		$("#about_page_id")[0].style.opacity = 1;

		$("#overview_page_id")[0].style.zIndex = -1;
		$("#overview_page_id")[0].style.opacity = 0;
	}
});

window.addEventListener("resize", function() {
	rightVue.svg_width = parseInt(document.querySelector(".draw_place").offsetWidth) * 0.9;
	rightVue.svg_height = parseInt(document.querySelector(".draw_place").offsetHeight) * 0.9;
	rightVue.svg_size_change("resize");
});