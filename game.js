var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function() {
  if (!started) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
    started=true;
  }
});

$(".btn").click(function() {
  var audio = new Audio("sounds/" + this.id + ".mp3");
  audio.play();
  userClickedPattern.push(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + (level+1));
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColours = ["red", "blue", "green", "yellow"];

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

  level++;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");;
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("fail");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
