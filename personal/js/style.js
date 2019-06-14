window.onload = function() {
	var htmlNode = document.documentElement;
	var imgList = document.getElementById("toImg");
	var liList = document.getElementById("tosidebar").getElementsByTagName("li");
	var buttonList = document.getElementById("toButton");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var about = document.getElementById("about");
	var understand = document.getElementById("understand");
	var peak = document.getElementById("peak");
	var top = document.getElementById("uptop");
	var divsList = document.getElementById("tofont").getElementsByTagName("div")
	var zontalNode = document.getElementById("toHori");
	var imgNode = document.getElementsByName("miniImg");
	var hzlNode = document.querySelector(".horizontal img");
	var zonNode = document.querySelectorAll(".horizontal .horizontal_font");
	var timer;
	var timer1;
	var moving = false;
	var index = 0;
	var timer2;
	var timer3;
	var timer4;
	var change;

	wheel(); //调用轮播函数
	jump(); //调用跳转函数 
	clickMiniImg();   //调用小图切换大图函数

	//轮播函数
	function wheel() {
		//上一张图片
		prev.onclick = function() {
			nextPage(false);
		}
		//下一张图片
		next.onclick = function() {
			nextPage(true);
		}
		autoNextPage();
		//自动循环下一页
		function autoNextPage() {
			timer1 = setInterval(function() {
				nextPage(true);
			}, 3000)
		}

		//鼠标移入按钮停止自动轮播
		buttonList.onmouseover = function() {
			clearInterval(timer1);
		}
		buttonList.onmouseout = function() {
			autoNextPage();
		}
		/*
		 * true:下一张
		 * false:上一张
		 */
		function nextPage(next) {

			//是否正在翻页
			if(moving) {
				return
			}

			moving = true;

			//总时间
			var time = 300;
			//间隔时间
			var invertime = 10;
			//总偏移量
			var offset;
			if(typeof next == "boolean") {
				offset = next ? -1350 : 1350;
			} else {
				offset = -1350 * (next - index)
			}

			//计算单位移动的偏移量
			var itemOffset = offset / (time / invertime);
			//切换完成时的left
			var targetLeft = imgList.offsetLeft + offset;

			timer = setInterval(function() {

				var left = imgList.offsetLeft + itemOffset;
				if(left == targetLeft) {
					clearInterval(timer)
					moving = false; //翻页结束
					if(left == -6750) {
						left = -1350;
					} else if(left == 0) {
						left = -5400;
					}

				}

				imgList.style.left = left + "px";
			}, invertime)

			updateButtons(next);
		}

		//更新圆点
		function updateButtons(next) {
			liList[index].removeAttribute("class");
			var targetIndex;
			if(typeof next == "boolean") {
				if(next) {
					targetIndex = index + 1
					if(targetIndex == 4) {
						targetIndex = 0;
					}
				} else {
					targetIndex = index - 1
					if(targetIndex == -1) {
						targetIndex = 3;
					}
				}
			} else {
				targetIndex = next
			}
			liList[targetIndex].className = 'on';
			index = targetIndex;
			//调用文字轮播函数
			moveFont(index);
		}

		//文字轮播
		function moveFont(index) {
			for(var i = 0; i < divsList.length; i++) {
				divsList[i].style.display = "none";
			}
			divsList[index].style.display = "block";
		}

		seoverButtons()
		//给所有的圆点加监听
		function seoverButtons() {
			for(var i = 0; i < liList.length; i++) {
				liList[i].index = i;
				liList[i].onmouseover = function() {
					clearInterval(timer1)
					if(this.index != index) {
						nextPage(this.index);
					}
				}
				liList[i].onmouseout = function() {
					autoNextPage()
				}
			}
		}
	}
	//点击小图切换大图,大图获得焦点弹出内容
	function clickMiniImg() {
		for(var i = 0; i < imgNode.length; i++) {
			imgNode[i].onclick = function() {
				change = true; //进入点击事件,证明正在变化
				hzlNode.style.opacity = "0";
				hzlNode.style.transition = "1s";
				var src = this.src.replace(".jpg", "-s.jpg");
				setTimeout(function() {
					hzlNode.src = src;
					hzlNode.style.opacity = "1";
					change = false; //变化结束
				}, 1000)
			}
		}
		zontalNode.onmouseenter = function() {
			if(hzlNode.src.match(/12-s/) && !change) {
				gradullyMove(zonNode[0]);
			} else if(hzlNode.src.match(/13-s/) && !change) {
				gradullyMove(zonNode[1]);
			} else if(hzlNode.src.match(/14-s/) && !change) {
				gradullyMove(zonNode[2]);
			} else if(hzlNode.src.match(/15-s/) && !change) {
				gradullyMove(zonNode[3]);
			}
		}
		zontalNode.onmouseleave = function() {
			if(hzlNode.src.match(/12-s/)) {
				gradullyRemove(zonNode[0]);
			} else if(hzlNode.src.match(/13-s/)) {
				gradullyRemove(zonNode[1]);
			} else if(hzlNode.src.match(/14-s/)) {
				gradullyRemove(zonNode[2]);
			} else {
				gradullyRemove(zonNode[3])
			}
		}
	}
	//移入函数
	function gradullyMove(zon) {
		clearInterval(timer3);
		var left = -300;
		var i = 0;
		timer3 = setInterval(function() {
			i += 15;
			if(i >= 300) {
				clearInterval(timer3)
			} else {
				zon.style.left = left + i + "px";
			}
		}, 10)
	}
	//移出函数
	function gradullyRemove(zon) {
		clearInterval(timer4);
		var left = 0;
		var i = 0;
		timer4 = setInterval(function() {
			i -= 15;
			if(i <= -300) {
				clearInterval(timer4)
			} else {
				zon.style.left = left + i + "px";
			}
		}, 10)
	}

	//跳转函数
	function jump() {
		about.onclick = function() {
			var indis = 0;
			const distance = 1013; //总距离
			const time = 300; //总时间
			const invertime = 10; //间隔时间
			const inverdistance = distance / (time / invertime); //间隔距离

			timer2 = setInterval(function() {
				indis += inverdistance;
				if(indis >= distance) {
					indis = distance;
					clearInterval(timer2);
				}
				htmlNode.scrollTop = indis;
			}, invertime)

		}
		understand.onclick = function() {
			var indis = 0;
			var distance = 2020; //总距离
			var time = 300; //总时间
			var invertime = 10; //间隔时间
			var inverdistance = distance / (time / invertime); //间隔距离

			timer2 = setInterval(function() {
				indis += inverdistance;
				if(indis >= distance) {
					indis = distance;
					clearInterval(timer2);
				}
				htmlNode.scrollTop = indis;
			}, invertime)

		}
		peak.onclick = function() {
			var indis = 0;
			var distance = 2550; //总距离
			var time = 300; //总时间
			var invertime = 10; //间隔时间
			var inverdistance = distance / (time / invertime); //间隔距离

			timer2 = setInterval(function() {
				indis += inverdistance;
				if(indis >= distance) {
					indis = distance;
					clearInterval(timer2);
				}
				htmlNode.scrollTop = indis;
			}, invertime)
		}
		top.onclick = function() {
			var indis = htmlNode.scrollTop;
			var time = 300; //总时间
			var invertime = 10; //间隔时间
			var inverdistance = indis / (time / invertime); //间隔距离

			timer2 = setInterval(function() {
				indis -= inverdistance
				if(indis <= 0) {
					clearInterval(timer2);
				}
				htmlNode.scrollTop = indis;
			}, invertime)
		}
	}
}