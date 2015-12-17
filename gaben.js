document.addEventListener("DOMContentLoaded", (function(){
	var gameWindow = document.getElementById("game");
		factoryButton = document.querySelector(".panelDiv .factoryButton"),
		factoryArr = document.querySelectorAll(".factoryDiv .factory"),
		fabricButton = document.querySelector(".panelDiv .fabricButton"),
		fabricArr = document.querySelectorAll(".fabricDiv .fabric"),
		coinsDiv  = document.querySelector(".panelDiv .coinAmount"),
		startBtn  = document.querySelector(".carpet .start"),
		carpet = document.querySelector(".carpet"),
		events = {},
		timer = null,
		coins = 10;

startBtn.onclick = function(){
	start();
	carpet.style.display = 'none';
}

factoryButton.onclick = (function(){
	var count = 0;
	return function(){
		if(count>4 || coins<70 )return;
		factoryArr[count].style.opacity = 1;
		factoryArr.initCount = count;
		factoryArr[count].initTime = new Date();
		count++;
		coins -= 70;
		coinsDiv.innerHTML = CoinAmounCool(coins);
	};

})();

fabricButton.onclick = (function(){
	var count = 0;
	return function(){
		if(count>9 || coins<20)return;
		fabricArr[count].style.opacity = 1;
		fabricArr.initCount = count;
		fabricArr[count].initTime = new Date();
		count++;
		coins -= 20;
		coinsDiv.innerHTML = CoinAmounCool(coins);
	};

})();

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

function CoinAmounCool(amount){
	return (amount>=10 ? amount>=100 ? amount : '0'+amount : '00'+amount)
}

function DropCoin(cords){
	var el = document.createElement("img");
	el.src = "images/coin.png";
	el.style.top = cords.y+"px";
	el.style.left = cords.x+"px";
	el.style.position = "absolute";
	el.onclick = function(){
		coins++;
		coinsDiv.innerHTML = CoinAmounCool(coins);
		gameWindow.removeChild(this);
		if(coins >= 500){
			stop();
			carpet.style.display = '';
			startBtn.src = "images/win.png";
			startBtn.onclick = null;
			startBtn.style.cursor = "default";

		}
	};
	gameWindow.appendChild(el);
};

function EventRuler(){
	DropCoin({x:randomInteger(0,967),y:randomInteger(0,558)});
	var t = new Date();

	for(var i = fabricArr.initCount; i >= 0 ; i--){
		var delta = t - fabricArr[i].initTime;
		if(delta<5000) return; 
		var pos = fabricArr[i].getBoundingClientRect();
		if(!((Math.floor(delta/1000))%5)) 
			{
				DropCoin({x:pos.left, y:pos.top});
			}
	}

	for(var i = factoryArr.initCount; i >= 0 ; i--){
		var delta = t - factoryArr[i].initTime; 
		if(delta<5000) return;
		var pos = factoryArr[i].getBoundingClientRect();
		if(!((Math.floor(delta/1000))%5)) 
			{
				DropCoin({x:pos.left, y:pos.top});
				DropCoin({x:pos.left+69, y:pos.top+25});

			}
	}
};
function start(){
	timer = setInterval(EventRuler, 1000);
};
function stop(){
	clearInterval(timer);
};

}));