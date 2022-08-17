import Phaser from "phaser";
import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene',config);
        this.menu = [
            {scene:'playScene',text:'Play'},
            {scene:'ScoreScene',text:'Score'},
            {scene:null,text:'Exit'}
        ]
    }

    create() {
        super.create();
        // this.scene.start('playScene');
        //setupEvent is passed as function to base scene
        this.createMenu(this.menu,this.setupMenuEvents.bind(this))

    }
    //recieves meu item as argument and sets up event
    setupMenuEvents(menuItem) {
        const textGO = menuItem.textGO;

        textGO.setInteractive();

        textGO.on('pointerover',() => {
            textGO.setStyle({fill:'#ff0'})
        })
        textGO.on('pointerout',() => {
            textGO.setStyle({fill:'#fff'})
        })
        textGO.on('pointerup',() => {
            if(menuItem.scene != null)
            {
                // console.log(menuItem.scene);
                this.scene.start(menuItem.scene);
            } else {
                this.game.destroy(true);
            }
        })

    }

}

export default MenuScene;