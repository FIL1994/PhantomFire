/**
 * Created by Philip
 *              on 2016-04-23.
 */

/*
state.active
sprite.active
sprite.destroy()
game.frameRate //gets frameRate
state.scale
stage.onBlur
stage.onFocus

Kiwi.Utils.GameMath

ROTATION
 0 or 6.3 - no rotation
 1.58 - right
 3.15 - upside-down
 -1.6 - left
 */

//http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
//https://jsfiddle.net/9atsffau/
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var isIE = false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
var isChrome = !!window.chrome && !!window.chrome.webstore;

if(isIE){
    alert("A MESSAGE FROM THE DEVELOPER\n\nIE is not a supported browser for this game.\nYou may experience some issues with audio in this browser.");
}

var myGame;

var mySettings = {
    "mouseControls" : false,
    "gameActive" : true,
    "musicOn" : true,
    "sfxOn" : true
};

var myRotation = {
    "none" : 0,
    "right" : 1.57,
    "left" : -1.57,
    "down" : 3.14,
    "up" : 0
};

var myScores = {
    "currScore" : 0,
    "level1" : 0,
    "level2" : 0,
    "level3" : 0,
    "level4" : 0,
    "level5" : 0,
    "level6" : 0,
    "level7" : 0,
    "level8" : 0
};

var levelComplete = {
    "level1" : false,
    "level2" : false,
    "level3" : false,
    "level4" : false,
    "level5" : false,
    "level6" : false,
    "level7" : false,
    "level8" : false
};

//used for combo
var Combo = {
    "lastColour" : "none",
    "comboNum" : 0
};

//js no libs - does not work on IE
var myAudio = {
    "hitBlock" : new Audio('sounds/hitBlock.wav'),
    "hitPlayer" : new Audio('sounds/playerHit.wav')
};

//howler.js - does not work on IE
var mySounds = {
    "electricFire" :
    new Howl({
        urls: ['sounds/electricFire.wav'],
        volume: 1,
        loop: true
        /* onend: function() {
            console.log("played hit block");
        } */
    })
};

if(mySettings.musicOn) {
    mySounds.electricFire.play();
}

//added in preloader
var myKeys = {
    "leftKey" : "",
    "rightKey" : "",
    "downKey" : "",
    "upKey" : "",
    "W" : "",
    "A" : "",
    "S" : "",
    "D" : "",
    "M" : "" //go to menu
};

setInterval(function(){
    if(groups.length > 1){
        for (var i = 0; i < groups[0].numChildren(); i++) {
            var bulletAt = groups[0].getChildAt(i);
            if(bulletAt.x > 640 || bulletAt.x < 0 || bulletAt.y < 0 || bulletAt.y > 480) {
                groups[0].removeChild(groups[0].getChildAt(i), true);
            }
        }
    }
}, 1600);

/*
Mousetrap.bind(['p', 'P'], function() {
    mySettings.mouseControls = !mySettings.mouseControls;
});
*/

var Player = function( state, x, y, angle ){

    Kiwi.GameObjects.Sprite.call( this, state, state.textures.player, x, y, false );

    this.centerAnchorPoint();
    this.health = 3;
    this.angle = 0;
    this.speed = 1.8;
    this.rotation = this.angle;
    this.active = true;

    this.leftShootPressed = false;
    this.rightShootPressed = false;
    this.upShootPressed = false;
    this.downShootPressed = false;

    this.frames = 0;
    this.shootOnFrame = 15;

    this.invincible = false;
    this.frameInvincible = 0;
    this.invincibleForFrames = 90;

    Player.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);

        if(myKeys.M.isDown){
            state.game.states.switchState("level select");
        }

        if(this.leftShootPressed){
            this.leftShootPressed = !myKeys.A.isUp;
        }
        if(this.rightShootPressed){
            this.rightShootPressed = !myKeys.D.isUp;
        }
        if(this.upShootPressed){
            this.upShootPressed = !myKeys.W.isUp;
        }
        if(this.downShootPressed){
            this.downShootPressed = !myKeys.S.isUp;
        }

        if (mySettings.mouseControls) {
            var mouseX = Math.round(this.game.input.x * 10) / 10;
            var mouseY = Math.round(this.game.input.y * 10) / 10;

            if (!(this.x + (this.width / 2) >= mouseX - 2 && this.x + (this.width / 2) <= mouseX + 2)) {
                if (this.x + (this.width / 2) + 4 > mouseX && this.x + (this.width / 2) > mouseX) {
                    this.x -= this.speed;
                }
                else if (this.x + (this.width / 2) - 4 < mouseX) {
                    this.x += this.speed;
                }
            }

            if (!(this.y + (this.height / 2) >= mouseY - 1.5 && this.y + (this.height / 2) <= mouseY + 1.5)) {
                if (this.y + (this.height / 2) + 4 > mouseY && this.y + (this.height / 2)) {
                    this.y -= this.speed;
                }
                if (this.y + (this.height / 2) - 4 < mouseY) {
                    this.y += this.speed;
                }
            }
        }
        else {
            //console.log(myKeys.downKey.isUp);
            if (myKeys.downKey.isDown && this.y + (this.height / 2) < 480) {
                this.y += this.speed;
            }
            if (myKeys.upKey.isDown && this.y + (this.height / 2) > 0) {
                this.y -= this.speed;
            }
            if (myKeys.leftKey.isDown && this.x + (this.width / 2) > 0) {
                this.x -= this.speed;
            }
            if (myKeys.rightKey.isDown && this.x + (this.width / 2) < 640) {
                this.x += this.speed;
            }
        }
        if (myKeys.W.isDown) {
            if(!this.upShootPressed || this.frames % this.shootOnFrame == 0) {
                Groups.addToGroup(Groups.groupNames.PLAYER_BULLETS,
                    new PlayerBullet(state, calcMid(this.x, this.width) - 2, calcMid(this.y, this.height) - 20, "up"));
            }
            this.upShootPressed = true;
        }
        if (myKeys.S.isDown) {
            if(!this.downShootPressed || this.frames % this.shootOnFrame == 0) {
                Groups.addToGroup(Groups.groupNames.PLAYER_BULLETS,
                    new PlayerBullet(state, calcMid(this.x, this.width) - 2, calcMid(this.y, this.height) - 20, "down"));
            }
            this.downShootPressed = true;
        }
        if (myKeys.A.isDown) {
            if(!this.leftShootPressed || this.frames % this.shootOnFrame == 0) {
                Groups.addToGroup(Groups.groupNames.PLAYER_BULLETS,
                    new PlayerBullet(state, calcMid(this.x, this.width) - 20, calcMid(this.y, this.height) - 2, "left"));
            }
            this.leftShootPressed = true;
        }
        if (myKeys.D.isDown) {
            if(!this.rightShootPressed || this.frames % this.shootOnFrame == 0) {
                Groups.addToGroup(Groups.groupNames.PLAYER_BULLETS,
                    new PlayerBullet(state, calcMid(this.x, this.width) - 20, calcMid(this.y, this.height) - 2, "right"));
            }
            this.rightShootPressed = true;
        }

        function calcMid(cXorY, cWidth) {
            return cXorY + (cWidth / 2);
        }

        if(this.invincible){
            if(this.frameInvincible + this.invincibleForFrames < this.frames){
                this.alpha = 1;
                this.invincible = false;
            }
        }


        this.frames++;
    }

    Player.prototype.gotHit = function(){
        if(!this.invincible) {
            if(mySettings.sfxOn)
                myAudio.hitPlayer.play();
            this.frameInvincible = this.frames;
            this.health--;
            this.invincible = true;
            console.log("PLAYER HIT: " + this.health);
            this.alpha = 0.3;

            myScores.currScore -= 3;
            if(myScores.currScore < 0)
                myScores.currScore = 0;
            Combo.comboNum = 0;
            $('#divCombo p').html("Combo: " + Combo.comboNum);
            $('#divScore p').html("Score: " + myScores.currScore);
        }
    }

    Player.prototype.beInvincible = function(){
        this.frameInvincible = this.frames;
        this.invincible = true;
    }

};
Kiwi.extend(Player, Kiwi.GameObjects.Sprite );

var PlayerBullet = function( state, x, y, direction ){

    Kiwi.GameObjects.Sprite.call( this, state, state.textures.playerBullet, x, y, false );

    this.direction = direction || "right";
    this.speed = 2;

    PlayerBullet.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);

        if (this.direction == "right") {
            this.x += this.speed;
        }
        else if (this.direction == "left") {
            this.x -= this.speed;
        }
        else if (this.direction == "down") {
            this.y += this.speed;
        }
        else if (this.direction == "up") {
            this.y -= this.speed;
        }
    }
};
Kiwi.extend( PlayerBullet, Kiwi.GameObjects.Sprite );


var EnemyBlock = function( state, x, y, colour, angle, direction, speed){
    angle = angle || 0;
    this.colour = colour || "red";
    this.speed = speed || 0.75;
    this.direction = direction || "right";

    this.xIncrease = 0;
    this.yIncrease = 0;

    if(this.direction == "right") {
        this.xIncrease = this.speed;
    }
    else if(this.direction == "left"){
        this.xIncrease = -this.speed;
    }
    else if(this.direction == "down"){
        this.yIncrease = this.speed;
    }
    else if(this.direction == "up"){
        this.yIncrease = -this.speed;
    }

    var image;
    if(this.colour == "red") {
        image = state.textures.redBlock;
    }
    else if(this.colour == "green") {
        image = state.textures.greenBlock;
    }
    else if(this.colour == "blue") {
        image = state.textures.blueBlock;
    }
    else{
        image = state.textures.redBlock;
    }

    Kiwi.GameObjects.Sprite.call( this, state, image, x, y, false );

    this.centerAnchorPoint();

    delete image;

    this.angle = angle;
    this.rotation = this.angle;

    //MY COLLISION DETECTION
    this.myBounds = [[0,0], [0,1]];
    this.myHitBox = [];

    this.box.hitbox = new Kiwi.Geom.Rectangle( 0, 0, this.width, this.height );
    //this.box.hitbox = new Kiwi.Geom.Circle(0, 0, 20);
    this.physics = this.components.add( new Kiwi.Components.ArcadePhysics( this, this.box ) );

    EnemyBlock.prototype.update = function(){
        Kiwi.GameObjects.Sprite.prototype.update.call(this);

        checkCollision(this);
        updateMovement(this);

        function updateMovement(object){

            if(object.direction == "right"){
                if(object.x > 640){
                    object.x = 0;
                }
            }
            else if(object.direction == "left"){
                if(object.x < 0){
                    object.x = 640;
                }
            }
            else if(object.direction == "up"){
                if(object.y < 0){
                    object.y = 480;
                }
            }
            else if(object.direction == "down"){
                if(object.y > 480){
                    object.y = 0;
                }
            }

            object.x += object.xIncrease;
            object.y += object.yIncrease;
        }

        function checkCollision(object) {
            if(object.physics.overlaps(state.player)){
                state.player.gotHit();
            }

            var hitObject = object.physics.overlapsArrayAndReturnObject(Groups.getPlayerBulletGroup().getAllChildren());
            if(hitObject.hit == true){
                if(mySettings.sfxOn)
                    myAudio.hitBlock.play();
                Groups.getPlayerBulletGroup().removeChild(hitObject.object);

                if(object.colour == Combo.lastColour){
                    Combo.comboNum++;
                    if(Combo.comboNum >= 10){
                        NG.unlockMedal("Combo 10");
                    }
                    else if(Combo.comboNum >= 8){
                        NG.unlockMedal("Combo 8");
                    }
                    else if(Combo.comboNum >= 5){
                        NG.unlockMedal("Combo 5");
                        if(Combo.lastColour == "red"){
                            NG.unlockMedal("Red Combo 5");
                        }
                        else if(Combo.lastColour == "green"){
                            NG.unlockMedal("Green Combo 5");
                        }
                        else if(Combo.lastColour == "blue"){
                            NG.unlockMedal("Blue Combo 5");
                        }
                    }
                    else if(Combo.comboNum >= 3){
                        NG.unlockMedal("Combo 3");
                        if(Combo.lastColour == "red"){
                            NG.unlockMedal("Red Combo 3");
                        }
                        else if(Combo.lastColour == "green"){
                            NG.unlockMedal("Green Combo 3");
                        }
                        else if(Combo.lastColour == "blue"){
                            NG.unlockMedal("Blue Combo 3");
                        }
                    }
                }
                else {
                    Combo.comboNum = 1;
                    Combo.lastColour = object.colour;
                }
                myScores.currScore += 1 * (Combo.comboNum + 1);
                $('#divScore p').html("Score: " + myScores.currScore);
                $('#divCombo p').html("Combo: " + Combo.comboNum);
                object.destroy();
            }

            object.updateMyHitBox();
        }

    }

    //MY COLLISION DETECTION
    EnemyBlock.prototype.updateMyHitBox = function(){
        this.myHitBox = this.myBounds;
        for (var i = 0; i < this.myHitBox; i++) {
            this.myHitBox[i][0] += this.x;
            this.myHitBox[i][1] += this.y;
        }
    }

};
Kiwi.extend( EnemyBlock, Kiwi.GameObjects.Sprite );

var EnemySpin = function( state, x, y, goX, goY, speed ){

    Kiwi.GameObjects.Sprite.call( this, state, state.textures.spin, x, y, false );

    this.centerAnchorPoint();
    this.box.hitbox = new Kiwi.Geom.Rectangle( 0, 0, this.width, this.height );
    this.physics = this.components.add( new Kiwi.Components.ArcadePhysics( this, this.box ) );

    this.goX = goX;
    this.goY = goY;
    this.startX = x;
    this.startY = y;
    this.reverse = false;
    this.angle = myRotation.none;
    this.speed = speed || 0.7;
    this.rotation = this.angle;
    this.health = 4;

    EnemySpin.prototype.update = function(){
        if(mySettings.gameActive) {
            Kiwi.GameObjects.Sprite.prototype.update.call(this);

            this.rotation += 0.6;
            if(this.rotation > 3.14){
                this.rotation -= 3.14;
            }

            if(!this.reverse) {
                if (this.goX < this.x) {
                    this.reverse = true;
                }
                this.x += this.speed;
            }
            else{
                if (this.startX > this.x) {
                    this.reverse = false;
                }
                this.x -= this.speed;
            }
            checkCollision(this);

        }

        function checkCollision(object) {
            if(object.physics.overlaps(state.player)){
                state.player.gotHit();
            }

            var hitObject = object.physics.overlapsArrayAndReturnObject(Groups.getPlayerBulletGroup().getAllChildren());
            if(hitObject.hit == true){
                object.health--;
                if(mySettings.sfxOn)
                    myAudio.hitBlock.play();
                Groups.getPlayerBulletGroup().removeChild(hitObject.object);

                if(object.health <= 0) {
                    myScores.currScore += 3;
                    $('#divScore p').html("Score: " + myScores.currScore);
                    object.destroy();
                }
            }
        }
    }


};
Kiwi.extend( EnemySpin, Kiwi.GameObjects.Sprite );

/*
// First - the subclass constructor
var CannonBall = function( state, x, y, angle ){

    //call the superclass constructor
    Kiwi.GameObjects.Sprite.call( this, state, state.textures.cannonBall, x, y, false );

    this.angle = angle;
    this.speed = 12;
    this.rotation = this.angle;
    CannonBall.prototype.update = function(){
        if(mySettings.gameActive) {
            Kiwi.GameObjects.Sprite.prototype.update.call(this);
            this.x += ( Math.cos( this.angle ) * this.speed );
            this.y += ( Math.sin( this.angle ) * this.speed );
        }
    }
};
//Second - extend the class
Kiwi.extend( CannonBall, Kiwi.GameObjects.Sprite );
*/