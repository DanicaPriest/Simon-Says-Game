var started= false;
var on = false;
var strict = false;
var isWrong = false;
var position = 0;
var setLength = 1;
var playerArr =[];
var simonArr = [];
var colors = ['red', 'green', 'blue', 'yellow']
$('document').ready(function(){
  $('#onBtn').click(function(){
    if (!on){
      on= true
      $('#onBtn').css({'margin-left':'15px', 'margin-right':'0px'})
      $('#countText').html(' ---');
      $('#countText').css('color','red');
    }
    else{
      on=false;
      $('#onBtn').css({'margin-left':'0px', 'margin-right':'15px'})
            $('#countText').html('888');
      $('#countText').css('color','rgb(99,0,0)');
      strict = false;
         started = false;
     position = 0;
     playerArr = [];
     simonArr = [];
      setLength = 1;
      $('#strictLight').css('background', 'rgb(77, 0, 0)')
    }
  })
  $('#strict').click(function(){
 if (on){ if (!strict) { strict = true; $('#strictLight').css('background', 'red')}
        else{strict = false;
          $('#strictLight').css('background', 'rgb(77, 0, 0)')
        }}
  })
  $('#start').click(function(){
    if(on){
      started = true;
     setLength = 1; $('#countText').html(setLength);
   simonArr=[];           playerArr=[]; 
      simonAdd();
      setTimeout(function(){simonPlay()}, 1000)         
    }
  })
  $('#red').mousedown(function(){
    if (started){
      $('#red').addClass('redLight');  playerArr.push('red');
      checkPlay();
      if(!isWrong){
      $('#redSound')[0].play();}
    }
  })
  $('#red').mouseup(function(){     $('#red').removeClass('redLight');
  })
  $('#green').mousedown(function(){
    if (started){
      $('#green').addClass('greenLight'); playerArr.push('green');
      checkPlay();
      if(!isWrong){
      $('#greenSound')[0].play();}
    }
  })
  $('#green').mouseup(function(){     $('#green').removeClass('greenLight');
    
  })
  $('#yellow').mousedown(function(){
    if (started){
      $('#yellow').addClass('yellowLight');     playerArr.push('yellow');
      checkPlay();  
      if (!isWrong){
 $('#yellowSound')[0].play();}
    }
  })
  $('#yellow').mouseup(function(){  $('#yellow').removeClass('yellowLight');
        
  })
  $('#blue').mousedown(function(){
    if (started){     $('#blue').addClass('blueLight');    playerArr.push('blue');
      checkPlay();
                 if (!isWrong){$('#blueSound')[0].play();}

    }
  })
  $('#blue').mouseup(function(){     $('#blue').removeClass('blueLight');                             
    
  })
})
function simonAdd(){
  var rN = Math.floor(Math.random()*4);
  simonArr.push(colors[rN]);
  
}
function simonPlay(){
  var i = 0; 
  function repeat(){
    var color= '#'+ simonArr[i]; 
  
    var light= simonArr[i] + 'Light';
    var sound= '#' + simonArr[i] + 'Sound';
    $(color).addClass(light); 
$(sound)[0].play();
   setTimeout(function(){
      $(color).removeClass(light)
    }, 500);
  
  if( i < simonArr.length ){i++;
        setTimeout(function(){ repeat()}, 1000 );
    }}
    repeat()
}

  
function checkLength(){
  if (playerArr.length == simonArr.length){
    setLength++;    $('#countText').html(setLength);
    playerArr = [];
    position= 0;
    if(strict && setLength > 20){
      alert("You Won!");
      simonArr=[];
      setLength = 1;
      $('#countText').html(setLength)
    }
    simonAdd();     setTimeout(function(){simonPlay()}, 1000)
  }
}
function checkPlay(){
  if(playerArr[position] == simonArr[position]){
    position++;
    isWrong = false;
    checkLength();
  }
  else{
    isWrong = true;
    wrong();
  }
}
function wrong(){
  $('#error')[0].play(); $('#countText').html("!!!");
  playerArr = [];
  position = 0;
  if (strict){
    simonArr = [];
   setLength = 1; 
    simonAdd();
  }
  setTimeout(function(){
      $('#countText').html(setLength);
    }, 1500);
  setTimeout(function(){
      simonPlay()
    }, 2000)
}