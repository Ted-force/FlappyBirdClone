import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
    constructor(key,config) {
        super(key);
        this.config = config;

        this.screenCenter = [config.width/2,config.height/2]
    }

    create() {
        this.add.image(400, 300, 'sky');

        if(this.config.Goback) {
           const backButton =  this.add.image(this.config.width-10,this.config.height-10,'back')
           .setOrigin(1)
           .setInteractive();

           backButton.on('pointerup',() => {
               this.scene.start('MenuScene');
           })
            

        }
    }

    createMenu(menu,setupMenuEvents) {
        let SpacingBetweenMenu = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0],this.screenCenter[1] + SpacingBetweenMenu];
            menuItem.textGO =  this.add.text(...menuPosition,menuItem.text,{fontSize:'32px',fill:'#fff'}).setOrigin(0.5,1)
            SpacingBetweenMenu += 40;

            setupMenuEvents(menuItem);

        })

    }

}

export default BaseScene;