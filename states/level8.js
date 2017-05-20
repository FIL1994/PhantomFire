/**
 * Created by Philip
 *              on 2016-04-26.
 */

var level8State = new Kiwi.State("level8");
level8State.create = function (){
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
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 20, "blue", myRotation.none, "up", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 60, "green", myRotation.down, "down", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 60, 100, "blue", myRotation.none, "up", 1.4));

    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 540, 20, "green", myRotation.none, "up", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 60, "red", myRotation.down, "down", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 600, 100, "blue", myRotation.none, "up", 1.4));

    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 50, "blue", myRotation.left, "left", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 70, "red", myRotation.left, "left", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 100, "green", myRotation.right, "right", 1.4));

    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 120, "blue", myRotation.left, "left", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 150, "blue", myRotation.left, "left", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 180, "blue", myRotation.right, "right", 1.4));

    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 390, 20, "blue", myRotation.left, "left", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 180, 40, "blue", myRotation.left, "left", 1.4));
    Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 220, "blue", myRotation.right, "right", 1.4));

    this.addChild(this.background);

    //ADD GROUPS TO GAME
    for (var i = 0; i < groups.length; i++) {
        this.addChild(groups[i]);
    }
};

level8State.init = function() {
    this.game.stage.width = 640;
    this.game.stage.height = 480;
};

level8State.update = function() {
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
                Groups.addToGroup(Groups.groupNames.PLAYER, this.player);
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 20, "blue", myRotation.none, "up", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 60, "red", myRotation.down, "down", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 60, 100, "green", myRotation.none, "up", 1.44));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 540, 20, "blue", myRotation.none, "up", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 60, "red", myRotation.down, "down", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 600, 100, "blue", myRotation.none, "up", 1.44));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 50, "red", myRotation.left, "left", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 70, "blue", myRotation.left, "left", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 100, "red", myRotation.right, "right", 1.44));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 120, "green", myRotation.left, "left", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 150, "blue", myRotation.left, "left", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 180, "green", myRotation.right, "right", 1.44));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 390, 20, "green", myRotation.left, "left", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 180, 40, "green", myRotation.left, "left", 1.44));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 220, "green", myRotation.right, "right", 1.44));
                break;
            case 2:
                Groups.addToGroup(Groups.groupNames.PLAYER, this.player);
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 20, "blue", myRotation.none, "up", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 60, "red", myRotation.down, "down", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 60, 100, "blue", myRotation.none, "up", 1.48));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 540, 20, "red", myRotation.none, "up", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 60, "green", myRotation.down, "down", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 600, 100, "red", myRotation.none, "up", 1.48));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 50, "red", myRotation.left, "left", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 70, "blue", myRotation.left, "left", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 100, "red", myRotation.right, "right", 1.48));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 120, "red", myRotation.left, "left", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 150, "red", myRotation.left, "left", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 180, "red", myRotation.right, "right", 1.48));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 390, 20, "red", myRotation.left, "left", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 180, 40, "green", myRotation.left, "left", 1.48));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 220, "red", myRotation.right, "right", 1.48));
                break;
            case 3:
                Groups.addToGroup(Groups.groupNames.PLAYER, this.player);
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 20, "blue", myRotation.none, "left", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 60, "green", myRotation.down, "right", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 60, 100, "blue", myRotation.none, "left", 1.5));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 540, 20, "green", myRotation.none, "left", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 60, "red", myRotation.down, "right", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 600, 100, "green", myRotation.none, "left", 1.5));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 50, "green", myRotation.left, "down", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 70, "red", myRotation.left, "down", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 100, "green", myRotation.right, "up", 1.5));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 120, "blue", myRotation.left, "down", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 150, "blue", myRotation.left, "down", 1.5));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 180, "blue", myRotation.right, "up", 1.5));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 390, 20, "blue", myRotation.left, "down", 1.4));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 180, 40, "blue", myRotation.left, "up", 1.4));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 220, "blue", myRotation.right, "down", 1.4));
                break;
            case 4:
                Groups.addToGroup(Groups.groupNames.PLAYER, this.player);
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 20, 20, "blue", myRotation.none, "up", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 40, 60, "green", myRotation.down, "down", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 60, 100, "blue", myRotation.none, "up", 1.6));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 540, 20, "green", myRotation.none, "up", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 60, "red", myRotation.down, "down", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 600, 100, "green", myRotation.none, "up", 1.6));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 50, "green", myRotation.left, "left", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 70, "red", myRotation.left, "left", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 100, "green", myRotation.right, "right", 1.6));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 340, 120, "blue", myRotation.left, "left", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 580, 150, "blue", myRotation.left, "left", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 100, 180, "blue", myRotation.right, "right", 1.6));

                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 390, 20, "blue", myRotation.left, "left", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 180, 40, "blue", myRotation.left, "left", 1.6));
                Groups.addToGroup(Groups.groupNames.ENEMY, new EnemyBlock(this, 500, 220, "blue", myRotation.right, "right", 1.6));
                break;
            default:
                levelComplete.level8 = true;
                NG.unlockMedal("Level 8");
                if(levelComplete.level1 && levelComplete.level2 && levelComplete.level3 && levelComplete.level4 &&
                    levelComplete.level5 && levelComplete.level6 && levelComplete.level7 && levelComplete.level8){
                    NG.unlockMedal("All Levels");
                }
                if(myScores.currScore > myScores.level8)
                    myScores.level8 = myScores.currScore;
                myScores.currScore = 0;
                levelSelect.game.states.switchState("level select");
                break;
        }

    }
};