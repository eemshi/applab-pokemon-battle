var myHealth = 300;
var computerHealth = 300;
var potions = 3;

onEvent("potionBtn", "click", function() {
  potion();
});
onEvent("punchBtn", "click", function() {
  punch();
});
onEvent("screen1", "keypress", function(event) {
  if (event.key === "a" && getProperty("punchBtn", "hidden") === false) {
    punch();
  } else if ((event.key === "l")) {
    potion();
  }
});

// functions

function potion() {
  if (potions > 0) {
    myHealth += randomNumber(20, 40);
    if (myHealth > 300) {
      myHealth = 300;
    }
    setProperty("healthMe", "width", myHealth);
    if (myHealth >= 150) {
      setProperty("healthMe", "background-color", "#16ff00");
    }
    potions--; 
    setText("potionCount", potions + "x");
  }
  if (potions === 0) {
    hideElement("potionBtn");
    hideElement("potionCount");
    hideElement("potionLabel");
  }
}
function punch() {
  computerHealth -= randomNumber(30, 60);
  setProperty("healthComp", "width", computerHealth);
  if (computerHealth < 150) {
    setProperty("healthComp", "background-color", "red");
  }
  if (computerHealth <= 0) {
    setScreen("winScreen");
  }
  hideElement("punchBtn");
  hideElement("punchLabel");
  setTimeout(function() {
    setText("turnLabel", "ODDISH ATTACK!");
    setProperty("turnLabel", "y", 75);
    setProperty("turnLabel", "background-color", "black");
    setTimeout(function() {
      showElement("oddishLabel");
      setTimeout(function() {
        myHealth -= randomNumber(40,100);
        setProperty("healthMe", "width", myHealth);
        if (myHealth < 150) {
          setProperty("healthMe", "background-color", "red");
        }
        if (myHealth > 150) {
          setProperty("healthMe", "background-color", "#16ff00");
        }
        if (myHealth <= 0) {
          setScreen("loseScreen");
        }
        setTimeout(function() {
          hideElement("oddishLabel");
          showElement("punchBtn");
          showElement("punchLabel");
          setProperty("turnLabel", "y", 135);
          setText("turnLabel", "GEODUDE ATTACK!");
          setProperty("turnLabel", "background-color", "#2f1abc");
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}
