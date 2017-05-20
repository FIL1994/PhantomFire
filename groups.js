/**
 * Created by Philip
 *              on 2016-04-25.
 */

var groups = [];

var Groups = {
    makeGroups: function(state) {
        groups.push(new Kiwi.Group(state)); //bullets
        groups.push(new Kiwi.Group(state)); //enemy
        groups.push(new Kiwi.Group(state)); //player
    },
    "groupNames" : {
        "PLAYER" : "player",
        "PLAYER_BULLETS" : "playerBullets",
        "ENEMY" : "enemy"
    },
    addToGroup: function(group, object){
        if(group == "playerBullets"){
            this.getPlayerBulletGroup().addChild(object);
        }
        else if(group == "enemy"){
            this.getEnemyGroup().addChild(object);
        }
        else if(group == "player"){
            this.getPlayerGroup().addChild(object);
        }
    },
    getPlayerGroup: function () {
        return groups[groups.length-1];
    },
    getEnemyGroup: function() {
        return groups[groups.length-2];
    },
    getPlayerBulletGroup: function(){
        return groups[groups.length-3];
    }
};