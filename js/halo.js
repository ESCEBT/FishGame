var haloObj = function() {
    this.x = [];
    this.y = [];
    this.alive = []; //状态.true为在执行任务
    this.r = [];
}
haloObj.prototype.num = 5;
haloObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.x[i] = 0;
        this.y[i] = 0;
        this.alive[i] = false;
        this.r[i] = 0;
    }
}
haloObj.prototype.draw = function() {
    cxt1.save();
    cxt1.lineWidth = 2;
    cxt1.shadowBlur = 10;
    cxt1.shadowColor = "rgba(134,45,145,1)";
    for (var i = 0; i < this.num; i++) {
        //在执行则绘制它。
        if (this.alive[i]) {
            this.r[i] += daltaTime * 0.05;
            if (this.r[i] > 100) {
                this.alive[i] = false;
                break;
            }
            var alpha = 1 - this.r[i] / 100;
            cxt1.beginPath();
            cxt1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            cxt1.closePath();
            cxt1.strokeStyle = "rgba(203,91,0," + alpha + ")";
            cxt1.stroke();

        }
    }
    cxt1.restore();
}
haloObj.prototype.born = function(x, y) {
    for (var i = 0; i < this.num; i++) {
        //闲置
        if (!this.alive[i]) {
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 10;
            this.alive[i] = true;
        }
    }
}
