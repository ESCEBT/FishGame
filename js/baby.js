var babyObj = function() {
    this.x;
    this.y;
    this.angle;
    this.babyEye = new Image();
    this.babyBody = new Image();
    this.babyTail = new Image();
    this.babyTailTimer = 0; //计数器
    this.babyTailCount = 0; //鱼尾动画执行到第几帧

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000; //时间间隔

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;

}
babyObj.prototype.init = function() {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    //this.babyEye.src = "../images/babyEye0.png";
    //this.babyBody.src = "../images/babyFade0.png";
    //this.babyTail.src="../images/bigTail0.png";
    for (var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        //存下尾巴的图
        babyTail[i].src = "../images/babyTail" + i + ".png";
    }
    for (var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "../images/babyEye" + i + ".png";
    }
    for (var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "../images/babyFade" + i + ".png";
    }
}
babyObj.prototype.draw = function() {

    //
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);

    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.6);


    //鱼尾变化
    /*如果动画执行了一帧，则babyTailTimer会为40，
    两帧时则要变化鱼尾，所以babyTailCount+1*/
    this.babyTailTimer += daltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer = this.babyTailTimer % 50;
    }

    //鱼眼变化
    this.babyEyeTimer += daltaTime;
    /*超过时间间隔则走向下一帧，加1，
    	即小鱼眼睛的图变化*/
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer = this.babyEyeTimer % this.babyEyeInterval;
        //0为睁着眼的图
        if (this.babyEyeCount == 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 200;
        }
    }


    //鱼身变化
    this.babyBodyTimer += daltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount += 1;
        this.babyBodyTimer = this.babyBodyTimer % 300;
        if (this.babyBodyCount > 19) {
            //身体变白，游戏结束
            this.babyBodyCount = 19;
            data.gameOver = true;
        }
    }
    cxt1.save();
    cxt1.translate(this.x, this.y);
    cxt1.rotate(this.angle);

    //
    var babyTailCount = this.babyTailCount;
    cxt1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    cxt1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    cxt1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);



    cxt1.restore();
}
