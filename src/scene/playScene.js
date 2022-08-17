import Phaser from "phaser";
import BaseScene from "./BaseScene";

class playScene extends BaseScene {

    constructor(config) {
        super('playScene',config); 

        this.initialPos = {
            x: 80,
            y: 300
        }
        
        this.bird = null;
        this.pipes = null;
        this.score = 0;
        this.scoreText = '';
        this.isPaused = false;
        this.horizontalRange = [450,500];
        this.flapVelo = 350;

    }

    // preload() {
    //     this.load.image('sky', 'assets/sky.png');
    //    this.load.image('bird', 'assets/bird.png');
    //    this.load.image('pipe','assets/pipe.png');
    //    this.load.image('pause','assets/pause.png');

    // }

    create() {
        super.create();        
        
        //create bird
        this.bird = this.physics.add.sprite(this.config.startPos.x,this.config.startPos.y,'bird')
        .setFlipX(true)
        .setScale(3);
        
        this.bird.setBodySize(this.bird.width,this.bird.height-7)
        this.bird.body.gravity.y = 400;
        this.bird.setCollideWorldBounds(true);

       //adding pipes
        this.pipes = this.physics.add.group();

     for(let i = 0;i<4;i++)
    {

       let upperPipe = this.pipes.create(0,0,'pipe')
       .setImmovable(true)
       .setOrigin(0,1);
       let lowerPipe = this.pipes.create(0,0,'pipe')
       .setImmovable(true)
       .setOrigin(0,0);

        this.placePipe(upperPipe,lowerPipe);

     }

     this.pipes.setVelocityX(-200);

     //creating animation
     this.anims.create({
       key:'fly',
       frames:this.anims.generateFrameNumbers('bird',{start: 8, end: 15}),
       frameRate: 8,
       //infinite loop
       repeat: -1
     })

     this.bird.play('fly')



     //creating collider
     this.CreateCollider();

     
     

      //adding controls
      // this.input.on('pointerdown', this.flap, this);
      this.input.keyboard.on('keydown-W', this.flap, this);

      //create Score
      this.createScore();
      //add pause button

      this.addPauseButton();
      

      //listen to events
      this.listenToEvents();

    }

    update() {
      //checkGameStatus
        if(this.bird.getBounds().bottom >= this.config.height || this.bird.getBounds().top <= 0)
     {
      //  alert('you have lost');
       this.restartPosPlayer();
     }
 
     this.recyclePipes();

    }

    listenToEvents() {
      if(this.pauseEvent) {
        return;
      }
      
      this.pauseEvent =  this.events.on('resume', () => {
        this.initialTime = 3;
        this.countDownText = this.add.text(...this.screenCenter,'Fly in:' + this.initialTime,this.fontOptions).setOrigin(0.5);
        this.timedEvent = this.time.addEvent({
          delay: 1000,
          callback: this.countDown,
          callbackScope:this,
          loop:true

        })
      })
    }

    countDown() {
      this.initialTime--;
      this.countDownText.setText('Fly in:' + this.initialTime);
      if(this.initialTime <= 0)
      {
        
        this.countDownText.setText('');
        this.physics.resume();
        this.isPaused = false;
        this.timedEvent.remove();
      }
    }

    createScore() {
      this.score = 0;
      const bestScore = localStorage.getItem('bestScore');
      this.scoreText = this.add.text(16,16,`Score ${0}`,{fontSize: '25px', fill: '#000'})

       this.add.text(16,52,`Best score ${bestScore || 0}`,{fontSize: '15px', fill: '#000'})

    }

    saveBestScore() {
      const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = bestScoreText && parseInt(bestScoreText,10);

        if(!bestScore || this.score > bestScore)
        {
          localStorage.setItem('bestScore', this.score);
        }
    }

    addPauseButton() {
      this.isPaused = false;
      const pauseButton = this.add.image(this.config.width - 10,40,'pause')
      .setInteractive()
      .setScale(3)
      .setOrigin(1);

      pauseButton.on('pointerdown',() => {
        this.physics.pause();
        this.scene.pause();
        this.isPaused = true;

        this.scene.launch('PauseScene');
      })

    }

    restartPosPlayer() {
        this.physics.pause();
        this.bird.setTint(0xEE4824);

        this.saveBestScore();

        this.time.addEvent({
          delay: 1000,
          callback: () => {
            this.scene.restart();
          },
          loop: false
        });

        

        // this.bird.body.position.x = this.initialPos.x;
        // this.bird.body.position.y = this.initialPos.y;
        // this.bird.body.velocity.y = 0;
      }
      
      placePipe(uPipe,lPipe) {
          let rightMostX = this.getRightMostPipe();
          // HZD += 400;
          let pipeVerticalDistance = Phaser.Math.Between(150,250);
          let pipeVerticalPosition = Phaser.Math.Between(0+20,this.config.height-20-pipeVerticalDistance);
          let pipeHorizontalPosition = Phaser.Math.Between(...this.horizontalRange);  
      
          // let upperPipe = this.physics.add.sprite(pipeHorizontalPosition,pipeVerticalPosition,'pipe').setOrigin(0,1);
          // let lowerPipe = this.physics.add.sprite(pipeHorizontalPosition,upperPipe.y + pipeVerticalDistance,'pipe').setOrigin(0,0);
      
          uPipe.x = rightMostX + pipeHorizontalPosition;
          uPipe.y = pipeVerticalPosition;
      
          lPipe.x = rightMostX + pipeHorizontalPosition;
          lPipe.y = uPipe.y + pipeVerticalDistance;
      
      }

      CreateCollider() {
        this.physics.add.collider(this.bird,this.pipes,this.restartPosPlayer,null, this);
      }

       getRightMostPipe() {
        let rightX = 0;
        
        this.pipes.getChildren().forEach(pipe => {
          rightX = Math.max(pipe.x,rightX);
        })
        return rightX;
      
      }

      
      
     recyclePipes() {
        let tempPipes = [];
        this.pipes.getChildren().forEach(pipe => {
          if(pipe.getBounds().right <= 0)
          {
            tempPipes.push(pipe);
            if(tempPipes.length === 2)
            {
              this.placePipe(...tempPipes);
              //score Increase as upper and lower pipes moves out of screen
              this.increaseScore();
              this.saveBestScore();
            }
          }
      
        })
      }
      
     flap() {
       if(this.isPaused) {
         return;
       }
       
        this.bird.body.velocity.y = -this.flapVelo;
      }

      increaseScore() {
        this.score ++;
        this.scoreText.setText(`Score ${this.score}`)
      }

}

export default playScene;