const CROW_SIZE=140;
const SCREEN_WIDTH=800;
const SCREEN_HEIGHT=600;
var scene=0;
var start_game_pressed=false;
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
var img_crow = new Image();
img_crow.src='assets/crow-sprite-3.png'

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext ('2d');
last_time=Date.now();
var stealing=false;
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
            } else {
                crows[1].ball=false;
                crows[0].ball=true;
            }
            setTimeout(function(){
                stealing=false;
            },1000)
        } 
        delta_time=Date.now()-last_time;
        last_time=Date.now();
        ctx.fillStyle = 'red';
        
        for(let i=0;i<crows.length;i++) {
            if(crows[0].force==true) {
                crows[i].move(delta_time/8);
            } else {
                crows[i].move(delta_time/10);
            }
            crows[i].draw(ctx);
        }
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
            crows=[new Crow(200,300,true),new Crow(600,300,false)];
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