
import Phaser from "phaser";
import playScene from './scene/playScene';
import MenuScene from './scene/MenuScene';
import PreloadScene from './scene/PreloadScene';
import ScoreScene from './scene/ScoreScene';
import BaseScene from "./scene/BaseScene";
import PauseScene from "./scene/PauseScene";

const HEIGHT = 600;
const WIDTH = 800;
const START_POS  = {
  x: WIDTH/10,
  y: HEIGHT/2
}
const sharedConfig = {
  width: WIDTH,
  height:HEIGHT,
  startPos: START_POS
}

const Scenes = [PreloadScene, MenuScene,ScoreScene, playScene, PauseScene];
function initScenes() {
  const newScenes = Scenes.map((Scene) => new Scene(sharedConfig));
  //this is returning this
  // [new PreloadScene(sharedConfig), new MenuScene(sharedConfig), new playScene(sharedConfig)]
  return newScenes;
}  


const config = {
  type: Phaser.AUTO,
  ...sharedConfig,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);


//useless code!!!
