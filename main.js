song = ""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;

function preload() {

    song = loadSound("music.mp3")



}


function setup() {

    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();


    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)

}



function modelLoaded() {

    console.log("Model is Initialized")


}



function gotPoses(results) {

    if (results.length > 0) {

        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX= " + leftWristX + "leftWristY= " + leftWristY);

        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);


        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX= " + rightWristX + "rightWristY= " + rightWristY);

    }

}


function draw() {

    image(video, 0, 0, 400, 400)

    fill("#0d25ff")
    stroke("#ff0000")




    if(scoreRightWrist > 0.2)  {

      if(rightWristY > 0 && rightWristY <= 80) {

      document.getElementById("speed").innerHTML= "Speed = 0.5";
      song.rate(0.5)


      }


      
     else if(rightWristY > 80 && rightWristY <= 160) {

        document.getElementById("speed").innerHTML= "Speed = 1";
        song.rate(1)
  
  
        }
  
        else if(rightWristY > 160 && rightWristY <= 240) {

            document.getElementById("speed").innerHTML= "Speed = 1.5";
            song.rate(1.5);
      
      
            }



            else if(rightWristY > 240 && rightWristY <= 320) {

                document.getElementById("speed").innerHTML= "Speed = 2";
                song.rate(2);
          
          
                }



                else if(rightWristY > 320 && rightWristY <= 400) {

                    document.getElementById("speed").innerHTML= "Speed = 2.5";
                    song.rate(2.5);
              
              
                    }
              
          
      








    }


    if (scoreLeftWrist > 0.2) {

    circle(leftWristX , leftWristY , 20)


    num=Number(leftWristY);

    remove_demicals= floor(num);


    volume= remove_decimals / 400;

    document.getElementById("volume").innerHTML= "Volume = "+ volume;
    song.setVolume(volume)
    console.log("Volume=" + volume)





    }

}

function play() {

    song.play();
    song.rate(2.5);
    song.setVolume(1);

}



function stop() {

    song.stop();


}