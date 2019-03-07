var fruitObj = function() {
    this.alive = [];
    this.orange = new Image();
    this.blue = new Image();
    this.x = []; //果实x坐标
    this.y = []; //果实y坐标
    this.aneNO = [];//记录果实所生长的海葵
    this.fruitType = [];
    this.l = []; //果实生长过程的长度
    this.spd = []; //速度（成长和上浮）
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003;
        this.fruitType[i] = "";
        this.aneNO[i] = 0;

    }
    this.orange.src = "../images/fruit.png";
    this.blue.src = "../images/blue.png";

}
fruitObj.prototype.draw = function() {
    var pic;
    for (var i = 0; i < this.num; i++) {
        //绘制果实，找到果实然后生长，上浮
        //console.log("x:"+this.x[i]+" y:"+this.y[i]);
        /*逐渐生长,daltaTime是两帧间的时间间隔，
        在用到与时间变化相关的变量的时候，常用他使动画流畅*/
        if (this.alive[i]) {
            if (this.fruitType[i] == "blue") {
                pic = this.blue;
            } else {
                pic = this.orange;
            }
            if (this.l[i] <= 15) {
                var No = this.aneNO[i];
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                this.l[i] += this.spd[i] * daltaTime; //果实长大
            } else {
                this.y[i] -= this.spd[i] * 7 * daltaTime; //果实上浮
            }
            cxt2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }
    }
}
fruitObj.prototype.born = function(i) {
        //找到出生的位置
        this.aneNO[i] = Math.floor(Math.random() * ane.num);
        this.l[i] = 0;
        this.alive[i] = true;
        var ran = Math.random();
        if (ran < 0.2) {
            this.fruitType[i] = "blue"; //orange,blue	
        } else {
            this.fruitType[i] = "orange";
        }

    }
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

//限制果实数量
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++; //记下几个出生了
    }
    if (num < 15) {
        sendFruit();
        return;
    }
}

//使果实出生
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}
