/**
 * Created by Philip
 *              on 2016-04-26.
 */

var level6State = new Kiwi.State("level6");
level6State.create = function (){
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
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 240, 80, "green", myRotation.down, "up", 0.95));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 120, 60, "red", myRotation.right, "down", 0.95));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 460, 100, "green", myRotation.left, "up", 0.95));

    this.addChild(this.background);

    //ADD GROUPS TO GAME
    for (var i = 0; i < groups.length; i++) {
        this.addChild(groups[i]);
    }
};

level6State.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

level6State.update = function() {
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
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "green", myRotation.none, "up", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 520, 200, "red", myRotation.right, "right", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 1));
                break;
            case 2:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 250, 70, "green", myRotation.none, "up", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 180, 380, 100, 1));
                break;
            case 3:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 30, 40, 380, 100, 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 180, 150, 430, 100, 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 140, "green", myRotation.left, "left", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 270, "green", myRotation.none, "down", 1));
                break;
            case 4:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "blue", myRotation.left, "left", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "green", myRotation.right, "right", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 140, "red", myRotation.left, "right", 1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 270, "red", myRotation.none, "down", 1));
                break;
            case 5:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "red", myRotation.none, "left", 1.1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "green", myRotation.none, "right", 1.1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 140, "green", myRotation.left, "up", 1.1));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 270, "blue", myRotation.none, "right", 1.1));
                break;
            default:
                levelComplete.level6 = true;
                NG.unlockMedal("Level 6");
                if(levelComplete.level1 && levelComplete.level2 && levelComplete.level3 && levelComplete.level4 &&
                    levelComplete.level5 && levelComplete.level6 && levelComplete.level7 && levelComplete.level8){
                    NG.unlockMedal("All Levels");
                }
                if(myScores.currScore > myScores.level6)
                    myScores.level6 = myScores.currScore;
                myScores.currScore = 0;
                levelSelect.game.states.switchState("level select");
                break;
        }

    }
};