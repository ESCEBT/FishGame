var momObj = function() {
    this.x;
    this.y;
    this.angle; //鱼的角度
    this.momTailTimer = 0;
    this.momTailCount = 0;

    this.momEyeTimer = 0;
    this.momEyeCount = 0;
    this.momEyeInterval = 1000;
    this.momBodyCount = 0; //序列帧（第几帧）
}
momObj.prototype.init = function() {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    //设置分数的样式
    cxt1.font = "30px Verdana";
    cxt1.textAlign = "center";//是字体居中
    for (var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "../images/bigTail" + i + ".png";
    }

    for (var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "../images/babyEye" + i + ".png";
    }
    for (var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "../images/bigSwim" + i + ".png";
        momBodyBlue[i].src = "../images/bigSwimBlue" + i + ".png";
    }
}
momObj.prototype.draw = function() {
    //鱼的坐标不断趋向于鼠标的
    this.x = lerpDistance(mx, this.x, 0.95);
    this.y = lerpDistance(my, this.y, 0.95);


    //计算出鱼旋转的角度,用tan()--正切;
    var deltaX = -(mx - this.x);
    var deltaY = -(my - this.y);

    //Math.atan2(y,x)得出正切值，tan@ = x/y;
    var beta = Math.atan2(deltaY, deltaX); //得到角度
    //角度一直取向于鼠标的角度
    this.angle = lerpAngle(beta, this.angle, 0.9);

    //鱼尾变化
    this.momTailTimer += daltaTime;
    if (this.momTailTimer > 50) {
        this.momTailCount = (this.momTailCount + 1) % 8;
        this.momTailTimer = this.momTailTimer % 50;
    }
    //鱼眼变化
    this.momEyeTimer += daltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
        //进行下一帧
        this.momEyeCount = (this.momEyeCount + 1) % 2;
        this.momEyeTimer = this.momEyeTimer % this.momEyeInterval;
        if (this.momEyeCount == 0) {
            this.momEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.momEyeInterval = 200;
        }
    }


    cxt1.save();
    cxt1.translate(this.x, this.y);
    cxt1.rotate(this.angle);

    var momTailCount = this.momTailCount;
    var momEyeCount = this.momEyeCount;
    var momBodyCount = this.momBodyCount;
    if (data.double == 1) {
        cxt1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    } else {
        cxt1.drawImage(momBodyBlue[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
    }
    //使鱼的眼睛身体和尾巴偏移0.5倍自己的宽度
    cxt1.drawImage(momTail[momTailCount], -momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
    cxt1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
    cxt1.restore();
}
