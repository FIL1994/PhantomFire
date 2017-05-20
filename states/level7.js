/**
 * Created by Philip
 *              on 2016-04-26.
 */

var level7State = new Kiwi.State("level7");
level7State.create = function (){
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
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 240, 20, "red", myRotation.right, "right", 1.3));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 120, 60, "red", myRotation.right, "right", 1.3));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 460, 100, "red", myRotation.left, "left", 1.3));

    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 20, "green", myRotation.right, "up", 1.3));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 60, 60, "green", myRotation.none, "down", 1.3));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 410, 100, "green", myRotation.down, "up", 1.3));

    this.addChild(this.background);

    //ADD GROUPS TO GAME
    for (var i = 0; i < groups.length; i++) {
        this.addChild(groups[i]);
    }
};

level7State.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

level7State.update = function() {
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
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "red", myRotation.none, "up", 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "red", myRotation.none, "down", 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 1.2));
                break;
            case 2:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 250, 70, "blue", myRotation.none, "up", 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 180, 380, 100, 1.2));
                break;
            case 3:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 30, 40, 380, 100, 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 120, 80, 380, 100, 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 30, 120, 380, 100, 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemySpin(this, 180, 150, 430, 100, 1.2));
                break;
            case 4:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "red", myRotation.none, "left", 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "red", myRotation.none, "right", 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 140, "red", myRotation.left, "up", 1.2));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 270, "blue", myRotation.none, "right", 1.2));
                break;
            default:
                levelComplete.level7 = true;
                NG.unlockMedal("Level 7");
                if(levelComplete.level1 && levelComplete.level2 && levelComplete.level3 && levelComplete.level4 &&
                    levelComplete.level5 && levelComplete.level6 && levelComplete.level7 && levelComplete.level8){
                    NG.unlockMedal("All Levels");
                }
                if(myScores.currScore > myScores.level7)
                    myScores.level7 = myScores.currScore;
                myScores.currScore = 0;
                levelSelect.game.states.switchState("level select");
                break;
        }

    }
};