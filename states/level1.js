/**
 * Created by Philip
 *              on 2016-04-25.
 */
var level1State = new Kiwi.State("level1");
level1State.preload = function() {
    Kiwi.State.prototype.preload.call(this);
};

level1State.create = function() {
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

    //MAKE GROUPS
    groups = [];
    Groups.makeGroups(this);

    //ADD GAME OBJECTS
    Groups.addToGroup(Groups.groupNames.PLAYER, this.player);
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "red", myRotation.none, "left", 0.8));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "green", myRotation.none, "right", 0.78));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 280, 140, "blue", myRotation.left, "up", 0.75));

    this.addChild(this.background);

    //ADD GROUPS TO GAME
    for (var i = 0; i < groups.length; i++) {
        this.addChild(groups[i]);
    }

};

level1State.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

level1State.update = function() {
    Kiwi.State.prototype.update.call(this);

    if($('#myFrameDiv').html() == ""){
        var htmlCode = "<iframe src='levelSelectUI.html' width='640px' height='480px' frameBorder='0' id='frameLevelSelect' class='hidden'></iframe>";
        $('#myFrameDiv').html(htmlCode);
    }

    if(Groups.getEnemyGroup().numChildren() <= 0){
        this.phase++;
        this.player.beInvincible();
        switch(this.phase){
            case 1:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "green", myRotation.none, "left", 0.8));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "green", myRotation.none, "right", 0.78));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 280, 140, "green", myRotation.left, "up", 0.75));
                break;
            case 2:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "red", myRotation.none, "right", 0.8));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "blue", myRotation.none, "left", 0.8));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 280, 140, "red", myRotation.left, "down", 0.8));
                break;
            case 3:
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 240, "blue", myRotation.none, "left", 0.8));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 270, "blue", myRotation.none, "right", 0.78));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 280, 140, "blue", myRotation.left, "up", 0.75));
                break;
            default:
                levelComplete.level1 = true;
                NG.unlockMedal("Level 1");
                if(levelComplete.level1 && levelComplete.level2 && levelComplete.level3 && levelComplete.level4 &&
                    levelComplete.level5 && levelComplete.level6 && levelComplete.level7 && levelComplete.level8){
                    NG.unlockMedal("All Levels");
                }
                if(myScores.currScore > myScores.level1)
                    myScores.level1 = myScores.currScore;
                myScores.currScore = 0;
                levelSelect.game.states.switchState("level select");
                break;
        }

    }

};