const CROW_SIZE=140;
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
var img_crow = new Image();
img_crow.src='assets/crow-sprite-2.png'

function Crow() {
    this.x=100;
    this.y=100;
    this.angle=0;
    this.clockwise=true;
    this.up=true;
    this.draw=function(ctx){
        ctx.fillRect(this.x,this.y,30,30);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle*Math.PI/180);
        ctx.translate(-this.x,-this.y);
        ctx.drawImage(img_crow, 0,0,60,80,this.x,this.y,CROW_SIZE,CROW_SIZE);
        ctx.restore();

    }
    this.move=function(unit) {
        this.angle+=unit;
        var rad = Math.radians(this.angle % 360);
        if(this.clockwise) {
            if(this.up) {
                this.x -= unit*Math.sin(rad);
                this.y -= unit*Math.cos(rad);
            } else {
                this.x += unit*Math.sin(rad);
                this.y += unit*Math.cos(rad);
            }

        } else {
            this.x += unit*Math.cos(rad);
            this.y += unit*Math.sin(rad);
        }

      
        // return [x, y];
    }
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext ('2d');
last_time=Date.now();
function tick() {
    delta_time=Date.now()-last_time;
    last_time=Date.now();
    ctx.clearRect(0,0,1000,100000);
    ctx.fillStyle = 'red';
    for(let i=0;i<crows.length;i++) {
        crows[i].move(delta_time/10);
        crows[i].draw(ctx);
    }
    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);
// keyboard events
window.addEventListener('keydown',function(e){
    if(e.keyCode==65) {
        crows[0].clockwise=true;
    } else if(e.keyCode==68) {
        crows[0].clockwise=false;
    } else if(e.keyCode==87) {
        crows[0].up=false;
    } else if(e.keyCode==83) {
        crows[0].up=true;
    }
});
var crows=[new Crow()];