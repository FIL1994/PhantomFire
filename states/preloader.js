/**
 * Created by Philip
 *              on 2016-04-25.
 */

var preloader = new Kiwi.State( "preloader" );

preloader.preload = function() {
    Kiwi.State.prototype.preload.call(this);
};

preloader.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;

    myKeys.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.LEFT);
    myKeys.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT);
    myKeys.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.DOWN);
    myKeys.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.UP);
    myKeys.W = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
    myKeys.A = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
    myKeys.S = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
    myKeys.D = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
    myKeys.M = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.M);
};

preloader.create = function() {
    Kiwi.State.prototype.create.call(this);
    this.game.states.switchState("loadingState");
};