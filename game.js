var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; 
var x = true;
 

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + level);
    level++;

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
 
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$(".btn").click(function () {
    var userChosenColours = this.id;
    userClickedPattern.push(userChosenColours);
    playSound(userChosenColours);
    animatePress(userChosenColours); 
    checkAnswer(userClickedPattern.length-1);
})

function playSound(input) {
    var audio = new Audio("sounds/" + input + ".mp3");
    audio.play();
}

function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
        }, 100);
    }; 

$(document).keypress(function(){
    if(x === true){
        nextSequence();
        x = false; 
    }
}); 

function startOver(){
    level = 0; 
    gamePattern = [];
    userClickedPattern = [];
    x = true; 
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
           
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}