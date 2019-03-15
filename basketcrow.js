const CROW_SIZE=140;
const SCREEN_WIDTH=800;
const SCREEN_HEIGHT=600;
const BASKET_DISTANCE=50;
var scene=0;
var scores=[0,0];
var start_game_pressed=false;
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
// load images
var img_crow = new Image();
img_crow.src='assets/crow-sprite-3.png'
var img_court = new Image();
img_court.src='assets/crow-court.png'
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
function tick() {
    // scene 1
    ctx.clearRect(0,0,1000000,100000);
    if(scene==0) {
        ctx.font = '100px fantasy';
        ctx.fillText ("BASKET CROWS", 100, 100);
        ctx.font = '20px fantasy';
        if(!start_game_pressed)
        ctx.fillText ("PRESS ANY KEY", 100, 150);

    } else if(scene==1) {
        var dist = Math.sqrt( Math.pow((crows[0].x-crows[1].x), 2) + Math.pow((crows[0].y-crows[1].y),2));
        if(dist<(CROW_SIZE/2)&&stealing==false) {
            stealing=true;
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
        delta_time=Date.now()-last_time;
        last_time=Date.now();
        // draw court
        ctx.drawImage(img_court, 0,0,800,600);

        // draw baskets
        ctx.fillStyle = 'blue';

        ctx.fillRect(BASKET_DISTANCE,300,30,30);
        ctx.fillRect(SCREEN_WIDTH-BASKET_DISTANCE,300,30,30);
        // draw crows
        for(let i=0;i<crows.length;i++) {
            if(crows[0].force==true) {
                crows[i].move(delta_time/8);
            } else {
                crows[i].move(delta_time/10);
            }
            if(crows[i].ball) {
                // distance to basket
                let basket_y=SCREEN_HEIGHT/2;
                let basket_x=BASKET_DISTANCE;
                if(i==0) basket_x=SCREEN_WIDTH-BASKET_DISTANCE;
                var distance_to_basket = Math.sqrt( Math.pow((crows[i].x-basket_x), 2) + Math.pow((crows[i].y-SCREEN_HEIGHT/2),2));
                if(distance_to_basket<(CROW_SIZE/8)) {
                    crows[0].ball=false;
                    crows[1].ball=false;
                    point=i;                
                    scores[i]+=2;
                    setTimeout(function(){
                        reset_crow_position();
                    },1000)
                }
            }
            crows[i].draw(ctx);
        }
        // draw scores
        ctx.font = '20px fantasy';
        ctx.fillText ("CHICAGO       "+scores[0], 100, 540);
        ctx.fillText ("SAN FRANCISCO    "+scores[1], 100, 560);

    }
    
    
    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);
// keyboard events
window.addEventListener('keydown',function(e){
    if(scene==0&&start_game_pressed==false) {
        start_game_pressed=true;
        setTimeout(function(){
            scene=1;
            reset_crow_position();
        },1000)
    } else if(scene==1) {
        if(e.keyCode==65) {
            // crows[0].clockwise=true;
        } else if(e.keyCode==68) {
            // crows[0].clockwise=false;
        } else if(e.keyCode==83) {
            // crows[0].up=false;
        } else if(e.keyCode==87) {
            // crows[0].up=true;
            crows[0].force=true;
            console.log(crows[0].force)
        } else if(e.keyCode==38) {
            crows[1].force=true;
        }
    }
  
});
window.addEventListener('keyup',function(e){
    if(scene==1) {
        if(e.keyCode==65) {
            // crows[0].clockwise=true;
        } else if(e.keyCode==68) {
            // crows[0].clockwise=false;
        } else if(e.keyCode==83) {
            // crows[0].up=false;
        } else if(e.keyCode==87) {
            // crows[0].up=true;
            crows[0].force=false;
        } else if(e.keyCode==38) {
            crows[1].force=false;
        }
    }
 
});
var crows=[];