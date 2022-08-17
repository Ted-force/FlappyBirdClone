import Phaser from "phaser";
import BaseScene from "./BaseScene";

class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super('PreloadScene');
        this.config = config;        
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        //ht and width has to specified to break the sprites into frames
        this.load.spritesheet('bird', 'assets/birdSprite.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('pipe','assets/pipe.png');
        this.load.image('pause','assets/pause.png');
        this.load.image('back','assets/back.png');
    }

    create() {
        this.add.image(400, 300, 'sky');
        this.scene.start('MenuScene');
    }

}

export default PreloadScene;