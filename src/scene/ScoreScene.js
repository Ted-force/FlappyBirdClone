import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {
    constructor(config) {
        super('ScoreScene',{...config, Goback: true});
    }

    create() {
        super.create();
        // this.scene.start('playScene'); 
        const BestScore = localStorage.getItem('bestScore');
        
        this.add.text(...this.screenCenter,`BestScore: ${BestScore}`, {fontSize: '50px', fill:'#fff'}).setOrigin(0.5);

    }
    //recieves meu item as argument and sets up event
    

}

export default ScoreScene;