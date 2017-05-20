/**
 * Created by Philip
 *              on 2016-04-25.
 */

var loadingState = new Kiwi.State( "loadingState" );

loadingState.preload = function() {
    Kiwi.State.prototype.preload.call(this);
    this.game.states.rebuildLibraries();
    this.game.stage.color = "#060115";
    this.game.stage._width = 640;
    this.game.stage._height = 480;

    this.addImage("loadingImage", "loadingImage.png");

    this.logo = new Kiwi.GameObjects.StaticImage(
        this, this.textures.loadingImage, 150, 50
    );

    this.addChild(this.logo);

    this.logo.alpha = 0;

    this.tweenIn = this.game.tweens.create(this.logo);

    this.tweenIn.to(
        {alpha: 1}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false
    );

    this.tweenIn.start();

    this.addImage("background", "images/background.png");
    this.addImage("selectBackground", "images/selectBackground.png");
    this.addImage("player", "images/Player.png");
    this.addImage("playerBullet", "images/playerBullet.png");
    this.addImage("redBlock", "images/redBlock.png");
    this.addImage("greenBlock", "images/greenBlock.png");
    this.addImage("blueBlock", "images/blueBlock.png");
    this.addImage("spin", "images/spin.png");
};

loadingState.update = function(){
    Kiwi.State.prototype.update.call(this);
};

loadingState.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

loadingState.create = function() {
    Kiwi.State.prototype.create.call(this);

    this.tweenOut = this.game.tweens.create(this.logo);
    this.tweenOut.to(
        {alpha: 0}, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false
    );

    this.tweenOut.onComplete(this.switchToMain, this);
    this.tweenOut.start();
};

loadingState.switchToMain = function() {
    $('#txtLoading').html("");
    $('#imgKiwiLogo').addClass("hidden");
    this.game.states.switchState("level select");
};