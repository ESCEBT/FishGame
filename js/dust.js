var dustObj = function() {
    this.x = [];
    this.y = [];
    this.amp = [];
    this.NO = [];
    this.alpha;
}
dustObj.prototype.num = 30; //漂浮物数量
dustObj.prototype.init = function() {

    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "../images/dust" + i + ".png";
    }
    for (var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = 20 + Math.random() * 25;
        this.NO[i] = Math.floor(Math.random() * 7);
    }
    this.alpha = 0;
}

dustObj.prototype.draw = function(){
	this.alpha  += daltaTime*0.0008;
	var l = Math.sin(this.alpha);
	for (var i = 0; i < this.num; i++) {
		var no = this.NO[i];
		cxt1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);

	}
}	