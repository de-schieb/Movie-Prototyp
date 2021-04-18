
//Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function setElementInnerHtml(elementId,value){
      document.getElementById(elementId).innerHTML = value;
  }

  function setElementAttr(elementId,attr,value){
      document.getElementById(elementId).setAttribute(attr,value);
  }

  function setBtnClicked(id,clicked){
    if(clicked){
      document.getElementById(id).style.borderColor = "var(--first-main-color)";
      document.getElementById(id).style.color = "var(--accent-color)";
    } else{
      document.getElementById(id).style.borderColor = "var(--second-main-color";
      document.getElementById(id).style.color = "var(--first-main-color)";
    }
  }

//   function createElement(element){
//       var element = document.createElement(element);
//       for(var i = 1;i<arguments.length-1;i++){

//           element.setAttribute(arguments[i].)
//       }
//   }