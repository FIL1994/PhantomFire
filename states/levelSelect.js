/**
 * Created by Philip
 *              on 2016-04-25.
 */

var levelSelect = new Kiwi.State("level select");

levelSelect.create = function (){
    this.game.stage.color = "#0c216f";

    this.background = new Kiwi.GameObjects.StaticImage(
        this, this.textures.selectBackground, 0, 0, true
    );

    Kiwi.State.prototype.create.call(this);

    this.addChild(this.background);

    $('.levelUI').addClass("hidden");

    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.removeClass("hidden");

    frameLevelSelect.contents().find("#btnLvl1").on('click', goToLevel1);
    frameLevelSelect.contents().find("#btnLvl2").on('click', goToLevel2);
    frameLevelSelect.contents().find("#btnLvl3").on('click', goToLevel3);
    frameLevelSelect.contents().find("#btnLvl4").on('click', goToLevel4);
    frameLevelSelect.contents().find("#btnLvl5").on('click', goToLevel5);
    frameLevelSelect.contents().find("#btnLvl6").on('click', goToLevel6);
    frameLevelSelect.contents().find("#btnLvl7").on('click', goToLevel7);
    frameLevelSelect.contents().find("#btnLvl8").on('click', goToLevel8);

    frameLevelSelect.contents().find("#btnLvl1").hover(btn1Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl2").hover(btn2Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl3").hover(btn3Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl4").hover(btn4Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl5").hover(btn5Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl6").hover(btn6Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl7").hover(btn7Enter, btnExit);
    frameLevelSelect.contents().find("#btnLvl8").hover(btn8Enter, btnExit);

    var totalScore = myScores.level1 + myScores.level2 + myScores.level3 + myScores.level4 + myScores.level5 +
            myScores.level6 + myScores.level7 + myScores.level8;
    frameLevelSelect.contents().find("#txtTotalScore p").html("Total Score: " + totalScore);
    delete totalScore;
    if(mySettings.musicOn){
        frameLevelSelect.contents().find("#btnMusic").html("Music On");
    }
    else{
        frameLevelSelect.contents().find("#btnMusic").html("Music Off");
    }

    frameLevelSelect.contents().find("#btnMusic").on('click', function (){
        mySettings.musicOn = !mySettings.musicOn;

        if(mySettings.musicOn){
            frameLevelSelect.contents().find("#btnMusic").html("Music On");
            mySounds.electricFire.unmute();
        }
        else{
            frameLevelSelect.contents().find("#btnMusic").html("Music Off");
            mySounds.electricFire.mute();
        }
    });

    if(mySettings.sfxOn){
        frameLevelSelect.contents().find("#btnSfx").html("Sfx On");
    }
    else{
        frameLevelSelect.contents().find("#btnSfx").html("Sfx Off");
    }

    frameLevelSelect.contents().find("#btnSfx").on('click', function (){
        mySettings.sfxOn = !mySettings.sfxOn;

        if(mySettings.sfxOn){
            frameLevelSelect.contents().find("#btnSfx").html("Sfx On");
        }
        else{
            frameLevelSelect.contents().find("#btnSfx").html("Sfx Off");
        }

    });

    if(mySettings.mouseControls){
        frameLevelSelect.contents().find("#btnControls").html("Mouse Controls On");
    }
    else{
        frameLevelSelect.contents().find("#btnControls").html("Mouse Controls Off");
    }

    frameLevelSelect.contents().find("#btnControls").on('click', function (){
        mySettings.mouseControls = !mySettings.mouseControls;

        if(mySettings.mouseControls){
            frameLevelSelect.contents().find("#btnControls").html("Mouse Controls On");
        }
        else{
            frameLevelSelect.contents().find("#btnControls").html("Mouse Controls Off");
        }
    });
};

levelSelect.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

levelSelect.update = function() {
    Kiwi.State.prototype.update.call(this);
};

function goToLevel1() {
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl1').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    //alert(document.activeElement);
    levelSelect.game.states.switchState("level1");
}

function goToLevel2() {
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl2').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level2");
}

function goToLevel3() {
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl3').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level3");
}

function goToLevel4(){
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl4').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level4");
}

function goToLevel5(){
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl5').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level5");
}

function goToLevel6(){
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl6').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level6");
}

function goToLevel7(){
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl7').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level7");
}

function goToLevel8(){
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.addClass("hidden");

    frameLevelSelect.contents().find('#btnLvl8').off();

    $('#myFrameDiv').html("");
    $('#btnFocus').focus();
    levelSelect.game.states.switchState("level8");
}

function btn1Enter(){
    if(levelComplete.level1) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btnExit(){
    var frameLevelSelect = $('#frameLevelSelect');
    frameLevelSelect.contents().find("#txtLvlComplete p").html("");
}

function btn2Enter(){
    if(levelComplete.level2) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btn3Enter(){
    if(levelComplete.level3) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btn4Enter(){
    if(levelComplete.level4) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btn5Enter(){
    if(levelComplete.level5) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btn6Enter(){
    if(levelComplete.level6) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btn7Enter(){
    if(levelComplete.level7) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}

function btn8Enter(){
    if(levelComplete.level8) {
        var frameLevelSelect = $('#frameLevelSelect');
        frameLevelSelect.contents().find("#txtLvlComplete p").html("Level Complete");
    }
}