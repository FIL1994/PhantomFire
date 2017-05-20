/**
 * Created by Philip
 *              on 2016-04-23.
 */

var gameOptions = {
    debug : Kiwi.DEBUG_OFF, //Or Kiwi.DEBUG_OFF
    deviceTarget : Kiwi.TARGET_BROWSER,
    width: 640,
    height: 480,
    scaleType : Kiwi.Stage.SCALE_NONE //Also accepts "SCALE_STRETCH" or "SCALE_FIT"
    //renderer : Kiwi.RENDERER_CANVAS OR Kiwi.RENDERER_WEBGL
};

myGame = new Kiwi.Game('game-container', 'Game Name', preloader, gameOptions);

myGame.states.addState(levelSelect);
myGame.states.addState(level1State);
myGame.states.addState(level2State);
myGame.states.addState(level3State);
myGame.states.addState(level4State);
myGame.states.addState(level5State);
myGame.states.addState(level6State);
myGame.states.addState(level7State);
myGame.states.addState(level8State);
myGame.states.addState(loadingState);

//myGame.states.addState(preloader);

//myGame.states.switchState("preloader");
