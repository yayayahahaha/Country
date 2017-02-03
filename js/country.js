document.addEventListener("DOMContentLoaded", function() {

	rightVue = new Vue({
		el: "#rightVue",
		data: {
			computed_ranking: [],
			original_ranking: [],
			reranked_ranking: [],
			freq_ranking: []
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

				console.log(obj);
				console.log(obj.innerHTML);
				dom = obj.innerHTML ? obj : obj.target;
				console.log(dom);
				dom.querySelector(".picked").classList += " onfocus";
				dom.querySelector(".detail").style.height = "12vh";
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
					var countryName = ($(event.target)[0].innerHTML).split(".")[1].split(",")[0].trim().split(" ").join("_");
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
		console.clear();
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
			document.querySelectorAll(".pBasic")[0].querySelector(".title").onclick();
/*			setTimeout(function() {
				rightVue.pickedClick(document.querySelectorAll(".pBasic")[0].querySelector("span"));
			}, 0);*/

			function makePopularClick(obj, all) {
				obj.querySelector(".title").onclick = function() {
					for (var i = 0; i < all.length; i++) {
						all[i].style.height = "5.5vh";
						obj.style.opacity = 1;
					}
					obj.style.height = "75vh";
					obj.style.opacity = 1;

					setTimeout(function() {
						rightVue.pickedClick(obj.querySelector("span"));
					}, 0);
				}
			}
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
});