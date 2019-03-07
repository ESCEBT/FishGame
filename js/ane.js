//海葵
var aneObj = function() {
    this.rootx = []; //位移
    this.headx = [];
    this.heady = [];
    this.alpha = 0; //角度
    this.amp = [];//振幅
}
aneObj.prototype.num = 50;
//确定位置
aneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}

//绘制海葵
aneObj.prototype.draw = function() {
    this.alpha += daltaTime * 0.0008;
    var l = Math.sin(this.alpha);//正弦值

    var h = canHeight;
    cxt2.save();
    cxt2.globalAlpha = 0.8; //设置透明度
    cxt2.lineWidth = 20;
    cxt2.lineCap = "round";
    cxt2.strokeStyle = "#3B154E";
    for (var i = 0; i < this.num; i++) {
        cxt2.beginPath();
        cxt2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        cxt2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
        cxt2.stroke();
    }
    cxt2.restore();
}
