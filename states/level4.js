/**
 * Created by Philip
 *              on 2016-04-26.
 */

var level4State = new Kiwi.State("level4");
level4State.create = function (){
    this.phase = 0;

    Combo.comboNum = 0;
    Combo.lastColour = "none";

    $('#divScore p').html("Score: " + myScores.currScore);
    $('#divCombo p').html("Combo: " + Combo.comboNum);

    $('.levelUI').removeClass("hidden");
    myScores.currScore = 0;
    $('#divScore p').html("Score: " + myScores.currScore);
    this.background = new Kiwi.GameObjects.StaticImage(
        this, this.textures.background, 0, 0, true
    );

    this.player = new Player(this, 300, 400, 0);

    Kiwi.State.prototype.create.call(this);

    groups = [];
    Groups.makeGroups(this);

    //ADD GAME OBJECTS
    Groups.addToGroup(Groups.groupNames.PLAYER, this.player);
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 440, 140, "green", myRotation.left, "left", 0.86));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 100, 80, 180, 100));

    this.addChild(this.background);

    //ADD GROUPS TO GAME
    for (var i = 0; i < groups.length; i++) {
        this.addChild(groups[i]);
    }
};

level4State.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

level4State.update = function() {
    Kiwi.State.prototype.update.call(this);

    if($('#myFrameDiv').html() == ""){
        var htmlCode = "<iframe src='levelSelectUI.html' width='640px' height='480px' frameBorder='0' id='frameLevelSelect' class='hidden'></iframe>";
        $('#myFrameDiv').html(htmlCode);
    }

    $('#divScore p').html("Score: " + myScores.currScore);

    if(Groups.getEnemyGroup().numChildren() <= 0){
        this.phase++;
        this.player.beInvincible();
        switch(this.phase){
            case 1:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "blue", myRotation.none, "up", 0.85));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "green", myRotation.none, "down", 0.85));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100));
                break;
            case 2:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 250, 70, "blue", myRotation.none, "up", 0.86));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 180, 380, 100));
                break;
            case 3:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 30, 40, 380, 100));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 0.85));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 30, 120, 380, 100));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 180, 150, 430, 100));
                break;
            case 4:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "red", myRotation.none, "left", 0.88));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "red", myRotation.none, "right", 0.88));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 140, "red", myRotation.left, "up", 0.88));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 270, "blue", myRotation.none, "right", 0.88));
                break;
            default:
                levelComplete.level4 = true;
                NG.unlockMedal("Level 4");
                if(levelComplete.level1 && levelComplete.level2 && levelComplete.level3 && levelComplete.level4 &&
                    levelComplete.level5 && levelComplete.level6 && levelComplete.level7 && levelComplete.level8){
                    NG.unlockMedal("All Levels");
                }
                if(myScores.currScore > myScores.level4)
                    myScores.level4 = myScores.currScore;
                myScores.currScore = 0;
                levelSelect.game.states.switchState("level select");
                break;
        }

    }
};