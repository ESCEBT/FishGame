var dataObj = function() {
    this.fruitNum = 0; //吃的果实的数量
    this.double = 1; //分值
    this.score = 0; //分数
    this.gamOver = false; //游戏状态
    this.alpha = 0;
}
dataObj.prototype.draw = function() {
    var w = can1.width();
    var h = can1.height();
    

    cxt1.save();
	cxt1.shadowBlur = 10;
	cxt1.shaowColor = "white";
    cxt1.fillStyle = "white";
    cxt1.fillText("SCORE:" + this.score, w * 0.5, h - 20);
    if (this.gameOver) {
        this.alpha += daltaTime * 0.0005;
       	
        if (this.alpha > 1){
            this.alpha = 1;
        }
        cxt1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
        cxt1.fillText("GAMEOVER", w * 0.5, h * 0.5);
    }
    cxt1.restore();
}
dataObj.prototype.addScore = function() {
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}
