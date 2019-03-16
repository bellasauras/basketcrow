const CROW_SIZE=140;
const SCREEN_WIDTH=800;
const SCREEN_HEIGHT=600;
const BASKET_DISTANCE=70;
const MATCH_TIME=60000;
var scene=0;
var winner=0;
var game=false;
var scores=[0,0];
var start_game_pressed=false;
var time_remaining=MATCH_TIME;
var blink=true;
var feathers=[];
setInterval(function(){
    if(blink) {
        blink=false
    } else {
        blink=true;
    }
},100)
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
// load images
var img_crow = new Image();
img_crow.src='assets/crow-sprite-3.png'
var img_court = new Image();
img_court.src='assets/crow-court.png'

var img_basket = new Image();
img_basket.src='assets/basket.png'

var img_basket_r = new Image();
img_basket_r.src = 'assets/basketr.png'

var img_bclogo = new Image();
img_bclogo.src='assets/bclogo.png'

var img_press_any_key = new Image();
img_press_any_key.src='assets/press-any-key.png'

var img_ball=new Image();
img_ball.src='assets/crow-ball.png'

var img_crow_closeup_red=new Image();
img_crow_closeup_red.src='assets/crow-closeup-red.png'

var img_crow_closeup_orange=new Image();
img_crow_closeup_orange.src='assets/crow-closeup-orange.png'

var img_team_chicago=new Image();
img_team_chicago.src='assets/logo-worm.png'

var img_team_sfo=new Image();
img_team_sfo.src='assets/logo-corn.png'

//ui elements
//p1 p2
var img_p1 = new Image();
img_p1.src='assets/p1p2p1.png'

var img_p2 = new Image();
img_p2.src='assets/p1p2p2.png'
//score board assets
//score 0 2 4 6 8 10 sprite
var img_score = new Image();
img_score.src = 'assets/sprite-numbers.png'
//teams
var img_team_chicago_ui = new Image();
img_team_chicago_ui.src='assets/table-chicago.png'

var img_team_sfo_ui = new Image();
img_team_sfo_ui.src='assets/table-sf.png'

//feather
var img_feather=new Image();
img_feather.src='assets/feather-grey.png'

var img_vs=new Image();
img_vs.src='assets/vs.png'

var img_cba=new Image();
img_cba.src='assets/logo-crow-association.png'

// canvas stuff
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext ('2d');
last_time=Date.now();
var stealing=false;
var point=null;
function reset_crow_position() {
    if(point==1) {
        crows=[new Crow(200,300,true),new Crow(600,300,false)];
        
    } else {
        crows=[new Crow(200,300,false),new Crow(600,300,true)];
    }
 
    point=null;
}
function draw_gradient() {
    // Create gradient
    var grd = ctx.createLinearGradient(0, SCREEN_HEIGHT, SCREEN_WIDTH, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "blue");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
}
function tick() {
    ctx.resetTransform();

    ctx.clearRect(0,0,1000000,100000);

    if(scene==0) {
        draw_gradient();
  
        ctx.drawImage(img_cba, 160,50,480,480);
        ctx.fillStyle = "white";
        ctx.font = '20px fantasy';
        ctx.fillText("AN OFFICIAL CBA LICENSED PRODUCT",255,490);
    } else if(scene==1) {
        draw_gradient();
        ctx.drawImage(img_bclogo, 60,80,720,336);
        if(!start_game_pressed&&blink) ctx.drawImage(img_press_any_key, 0,0,480,480,250,350,240,240);

    } else if(scene==2) {
        // scene 2: vs.
        draw_gradient();
        ctx.drawImage(img_crow_closeup_orange, 12,50,364,364);
        ctx.drawImage(img_crow_closeup_red, 420,50,364,364);
        ctx.drawImage(img_team_sfo, 60,300,256,256);
        ctx.drawImage(img_team_chicago, 480,300,256,256);
        ctx.drawImage(img_vs,120,120,120,120);

        // if(blink) {

        // } else {
            // ctx.drawImage(img_vs,0,0,120,120,340,250,120,120);

        

    } else if(scene==3) {
        // scene 3: game
        // check crow distance to baskets
        if(crows.length==2) {
            var dist = Math.sqrt( Math.pow((crows[0].x-crows[1].x), 2) + Math.pow((crows[0].y-crows[1].y),2));
            if(dist<(CROW_SIZE/2)&&stealing==false) {
                stealing=true;
                audio_crow1.play(); 
                feathers.push(new Feather(crows[0].x,crows[0].y))
                feathers.push(new Feather(crows[1].x,crows[1].y))
                feathers.push(new Feather(crows[0].x-Math.random()*2,crows[0].y+Math.random()*5))
                feathers.push(new Feather(crows[1].x+Math.random()*3,crows[1].y-Math.random()*4))
                feathers.push(new Feather(crows[0].x-Math.random()*4,crows[0].y+Math.random()*3))
                feathers.push(new Feather(crows[1].x+Math.random()*5,crows[1].y-Math.random()*2))
                if(crows[0].ball) {
                    crows[1].ball=true;
                    crows[0].ball=false;
                    
                } else if(crows[1].ball) {
                    crows[1].ball=false;
                    crows[0].ball=true;
                }
                setTimeout(function(){
                    stealing=false;
                },1000)
            } 
        }

        delta_time=Date.now()-last_time;
        if(time_remaining>0) {
            time_remaining=time_remaining-delta_time;
        } else if(game==false) {
            game=true;
            audio_horn.currentTime = 0;
            audio_horn.play();

            setTimeout(function(){
                scene=0;
                audio_ambient0.pause();
                audio_ambient1.pause();
                audio_ambient2.pause();

            },6000)
        }
        last_time=Date.now();
        // draw court
        ctx.drawImage(img_court, 0,0,800,600);

        // draw baskets
        ctx.fillStyle = 'blue';
        ctx.drawImage(img_basket, BASKET_DISTANCE-36,250,125,108);
        ctx.drawImage(img_basket_r, SCREEN_WIDTH-BASKET_DISTANCE-90,250,125,108);
        //draw p1 n p2
        ctx.drawImage(img_p1, 100,500,38,38);
        ctx.drawImage(img_p2,100,550,38,38);
        //draw team names
        ctx.drawImage(img_team_chicago_ui,90,470,145,145);
        ctx.drawImage(img_team_sfo_ui,68,520,145,145);      
        //draw score 0 2 4 6 8 10
        ctx.drawImage(img_score,200,550,145,145)        


        // img_basket.scale (-1,1);

        // ctx.fillRect(BASKET_DISTANCE,300,30,30);
        // ctx.fillRect(SCREEN_WIDTH-BASKET_DISTANCE,300,30,30);
        // draw feathers
        for(let i=0;i<feathers.length;i++) {
            feathers[i].life+=delta_time;
            if(feathers[i].life<600) {
                feathers[i].draw(ctx);
            }
        }
        
        // draw crows
        for(let i=0;i<crows.length;i++) {
            if(time_remaining>0) {
                if(crows[0].force==true) {
                    crows[i].move(delta_time/8);
                } else {
                    crows[i].move(delta_time/10);
                }
                if(crows[i].ball) {
                    // distance to basket
                    let basket_x=BASKET_DISTANCE;
                    if(i==0) basket_x=SCREEN_WIDTH-BASKET_DISTANCE;
                    var distance_to_basket = Math.sqrt( Math.pow((crows[i].x-basket_x), 2) + Math.pow((crows[i].y-SCREEN_HEIGHT/2),2));
                    if(distance_to_basket<(CROW_SIZE/8)) {
                        crows[0].ball=false;
                        crows[1].ball=false;
                        point=i;                
                        scores[i]+=2;
                        audio_point_cheer.currentTime = 0;
                        audio_swish.currentTime=0;
                        audio_swish.play();
                        audio_point_cheer.play();
                        setTimeout(function(){
                            reset_crow_position();
                        },1000)
                    }
                }
            }
           
            crows[i].draw(ctx);
        }
        // draw scores
        ctx.font = '20px fantasy';
        ctx.fillText ("CHICAGO       "+scores[0], 100, 540);
        ctx.fillText ("SAN FRANCISCO    "+scores[1], 100, 560);
        ctx.fillText ("TIME REMAINING:  "+Math.round(time_remaining/1000), 100, 100);
        
    }

    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);
// keyboard events
window.addEventListener('keydown',function(e){
    if(scene==0) {
        // 0: official cba product
        scene=1;
        audio_music0.currentTime=0;
        audio_music0.play();

    } else if(scene==1&&start_game_pressed==false) {
        // 1: title screen
        start_game_pressed=true;
        
        setTimeout(function(){
            scene=2;
            start_game_pressed=false;

        },2000)
    } else if(scene==2) {
        scene=3;
        audio_music0.pause();
        audio_ambient0.play();
        audio_ambient1.play();
        audio_ambient2.play();

        setTimeout(function(){
            reset_crow_position();
            time_remaining=MATCH_TIME;

        },100);
    } else if(scene==3) {
        if(e.keyCode==87) {
            crows[0].force=true;
        } else if(e.keyCode==38) {
            crows[1].force=true;
        }
    }
  
});
window.addEventListener('keyup',function(e){
    if(scene==3) {
        if(e.keyCode==87) {
            crows[0].force=false;
        } else if(e.keyCode==38) {
            crows[1].force=false;
        }
    }
 
});
var crows=[];