var waveObj = function() {
    this.x = [];
    this.y = [];
    this.alive = []; //状态
    this.r = []; //半径
}
waveObj.prototype.num = 10;
waveObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false; //限制
        this.r[i] = 0;
    }
}

waveObj.prototype.draw = function() {
    cxt1.save();
    cxt1.lineWidth = 2;
    cxt1.shadowBlur = 10;
    for (var i = 0; i < this.num; i++) {
        //在当前是存在的
        if (this.alive[i]) {
            this.r[i] += daltaTime * 0.04;
            if (this.r[i] > 60) {
                this.alive[i] = false;
            	break;
            }
            var alpha = 1 - this.r[i] / 50;

            cxt1.beginPath();
            cxt1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
            cxt1.closePath();
            cxt1.strokeStyle = "rgba(255,255,255," + alpha + ")";
            cxt1.stroke();
        }
       cxt1.restore();
    }
}

waveObj.prototype.born = function(x, y) {
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.r[i] = 20;
            this.x[i] = x;
            this.y[i] = y;
            //出生
            return;
        }
    }
}
