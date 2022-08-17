import BaseScene from "./BaseScene";

class PauseScene extends BaseScene {
    constructor(config) {
        super('PauseScene',config);
        this.menu = [
            {scene:'playScene',text:'Resume'},
            {scene:'MenuScene',text:'Exit to Menu'},            
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
            if(menuItem.scene && menuItem.text === 'Resume')
            {
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            }else {
                this.scene.stop('playScene');
                this.scene.start(menuItem.scene);
            }
        })

    }

}

export default PauseScene;