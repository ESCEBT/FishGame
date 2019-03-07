var bgPic = new Image();
var can1, can2; //场景
var ctx1, ctx2; //画笔
var canWidth, canHeight;
var lastTime;
var daltaTime = 100;
var ane;
var fruit;
var mom;
var mx, my; //鼠标的位置

var babyTail = []; //存小鱼尾巴图片
var babyEye = []; //存小鱼眼睛图片
var babyBody = [] //存放小鱼身体的图
var momTail = []; //存大鱼尾巴图片

var momEye = []; //存大鱼眼睛图片
var momTail = [] //存放大鱼尾巴的图
var momBody = [] //存放大鱼身体的图
var momBodyOra = [];
var momBodyBlue = [];

var data;//分值
var dust;//漂浮物
var dustPic = [];
$(function() {


    function game() {
        init();
        lastTime = Date.now(); //上次时间
        daltaTime = 0; //时间差
        gameloop();
    }
    game();

    function init() {
        can1 = $("#canvas1");
        can2 = $("#canvas2");
        cxt1 = can1.get(0).getContext("2d");
        cxt2 = can2.get(0).getContext("2d");
        //绑定鼠标移动事件
        can1.on("mousemove", onMouseMove);
        //can1.get(0).addEventListener("mousemove",onMouseMove,false);
        bgPic.src = "../images/background.jpg";
        canWidth = can1.width();
        canHeight = can1.height();
        //海葵
        ane = new aneObj();
        ane.init();
        //果实
        fruit = new fruitObj();
        fruit.init();
        mom = new momObj();
        mom.init();
        mx = canWidth * 0.5;
        my = canHeight * 0.5;
        baby = new babyObj();
        baby.init();
        data = new dataObj();
        wave = new waveObj();
        wave.init();
        halo = new haloObj();
        halo.init();
        
        dust = new dustObj();
        dust.init();

    }

    function gameloop() {
        window.requestAnimFrame(gameloop);
        var now = Date.now(); //现在的时间
        daltaTime = now - lastTime;
        lastTime = now;
        if (daltaTime > 40) {
            daltaTime = 40;
        }
        drawBackground();
        ane.draw(); //画海葵
        fruitMonitor();
        fruit.draw(); //画果实
        cxt1.clearRect(0, 0, canWidth, canHeight);
        mom.draw(); //画大鱼
        baby.draw(); //画小鱼
        momFruitCollision(); //吃果实
        momBabyCollision(); //喂果实
    	data.draw();
    	wave.draw();
        halo.draw();
        dust.draw();
    }

    function onMouseMove(e) {
    	if(!data.gameOver){
	        /*用offsetX与offsetY,相对于当前盒模型的左上角为参考点，
	        不能用pageX,pageY。因为是以浏览器的页面左上角为参考点，会受到css的影响*/
	        mx = e.offsetX;
	        my = e.offsetY;
	    }
    }
});
