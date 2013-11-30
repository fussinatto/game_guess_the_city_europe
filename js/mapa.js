var coords = [
    {
    "city": "Minsk",
    "x": "458",
    "y": "244"
    },
    {
    "city": "London",
    "x": "143",
    "y": "290"
    },
    {
    "city": "Rome",
    "x": "286",
    "y": "450"
    },
    {
    "city": "Athens",
    "x": "413",
    "y": "508"
    },
    {
    "city": "Lisbon",
    "x": "40",
    "y": "497"
    },
    {
    "city": "Berlin",
    "x": "297",
    "y": "270"
    },
    {
    "city": "Kiev",
    "x": "491",
    "y": "309"
    },
    {
    "city": "Olso",
    "x": "266",
    "y": "120"
    },
    {
    "city": "Belgrade",
    "x": "377",
    "y": "404"
    },
    {
    "city": "Paris",
    "x": "171",
    "y": "336"
    },
    {
    "city": "Madrid",
    "x": "102",
    "y": "472"
    },
    {
    "city": "Turin",
    "x": "232",
    "y": "400"
    },
    {
    "city": "Vienna",
    "x": "330",
    "y": "348"
    },
    {
    "city": "Helsinki",
    "x": "428",
    "y": "114"
    },
    {
    "city": "Moscow",
    "x": "572",
    "y": "209"
    },
    {
    "city": "Barcelona",
    "x": "169",
    "y": "458"
    },
    {
    "city": "Zagreb",
    "x": "326",
    "y": "388"
    },
    {
    "city": "Tallinn",
    "x": "426",
    "y": "130"
    },
    {
    "city": "Munich",
    "x": "276",
    "y": "350"
    },
    {
    "city": "Prague",
    "x": "308",
    "y": "316"
    },
    {
    "city": "Bucharest",
    "x": "441",
    "y": "411"
    },
    {
    "city": "Marseille",
    "x": "205",
    "y": "429"
    },
    {
    "city": "Vaduz",
    "x": "252",
    "y": "366"
    },
    {
    "city": "Vilnius",
    "x": "432",
    "y": "230"
    },
    {
    "city": "St.Petersburg",
    "x": "489",
    "y": "119"
    },

] 

$(function(){

var radar,pin_red,pin_green,result,distance,enableClick,nextbtn=document.getElementById('nextbtn'),totalResult,_i=0,time=5000,title = document.getElementById('title'),res=document.getElementById('res'),mapscale=6.44;
enableClick=true, resGraphic = $('.graph'), timer = $('#timerbg');

resGraphic.hide();
totalResult = 0;
var paper = new Raphael(document.getElementById('mapa'), 640 , 560);
var rect = paper.image("img/Europe_map.jpg", 0, 0, 640, 560);

radar = paper.circle(0, 0, 1);
radar.attr({fill:"#fff",stroke:"#000",opacity: 0.3});

pin_red = paper.image('img/pin_red.png',0,0,9,19);
pin_green = paper.image('img/pin_green.png',0,0,9,19);
pin_red.hide();
pin_green.hide();



rect.click(function (e, dx , dy){
    if(enableClick){
        timer.stop();
      enableClick = false;
      animateCirc(coords[_i].x,coords[_i].y,dx,dy);
     pin_red.attr({x:(coords[_i].x),y:(coords[_i].y-19)}).show();
     pin_green.attr({x:(dx-9),y:(dy-39)}).show().animate({'y':(dy-19)},200,'>');
    }
  
});

function animateCirc (x,y,dx,dy) {
	var r=Math.sqrt((x-dx)*(x-dx)+(y-dy)*(y-dy)).toFixed(2);
	r = Math.round(r*100)/100;

    (r<100)?result = (100-r)*10:result=0;
    distance = r*mapscale;
    totalResult+=result;
	radar.show().attr({cx:x,cy:y,r:1,fill:"#fff",stroke:"#000",opacity: 0.3});
	radar.animate({'r':r},500,'easeInOut',showResult);
    nextbtn.addEventListener("click", gotoNext, false);
};

function showResult () {
     resGraphic.fadeIn('fast');
    if (_i<coords.length-1) {
        $('.rezArrNo').html((_i+1) +'/'+coords.length);
        $('.rezCity').html(coords[_i].city);
        $('.rezDistance').html(distance.toFixed(2)+' km');
        $('.rezPoints').html(result.toFixed(0) +' pts');
    }
    else{
       $('#nextbtn').hide();
         $('.rezArrNo').html(coords.length +'/'+coords.length);
        $('.rezCity').html('Well Done!');
        $('.rezDistance').hide();
        $('.rezPoints').html(totalResult.toFixed(0) +' pts');
    }
};

function gotoNext () {
    enableClick = true;
    timer.css({width:0});
timer.animate({width:640+"px"},time,'linear',timesup);
    resGraphic.fadeOut('fast');

	 radar.hide();
     pin_green.hide();
     pin_red.hide();
	 (_i<coords.length-1) ? _i++ : _i=0;
	title.innerHTML = coords[_i].city;
    res.innerHTML = totalResult.toFixed(0)+ ' pts';
};

function timesup(){
    result=0;
    distance=0;
     $('.rezArrNo').html((_i+1) +'/'+coords.length);
        $('.rezCity').html(coords[_i].city);
        $('.rezDistance').html('0 km');
        $('.rezPoints').html('0 pts'); 
         showResult();
     nextbtn.addEventListener("click", gotoNext, false);
};


function startGame () {
   $('.startgraph').hide();
   title.innerHTML = coords[_i].city;
    res.innerHTML = totalResult;
    timer.css({width:0});
    timer.animate({width:640+"px"},time,'linear',timesup);
    
};

$('#startbtn').click(startGame);

})