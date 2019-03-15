const CROW_SIZE=140;
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
var img_crow = new Image();
img_crow.src='assets/crow-sprite-3.png'

function Crow() {
    this.x=100;
    this.y=100;
    this.angle=0;
    this.clockwise=false;
    this.strength=0;
    this.up=true;
    this.draw=function(ctx){
        let frame=0;
        if(this.force) frame=1;
        ctx.fillRect(this.x,this.y,30,30);
        ctx.save();
        ctx.translate(this.x, this.y);
        if(this.clockwise) {
            ctx.rotate(Math.radians(this.angle*-1 % 360));
        } else {
            ctx.rotate(Math.radians(this.angle+200 % 360));

        }
        ctx.translate(-this.x,-this.y);

        ctx.drawImage(img_crow, CROW_SIZE*frame,0,CROW_SIZE,CROW_SIZE,this.x-(CROW_SIZE/4),this.y-(CROW_SIZE/4),CROW_SIZE/2,CROW_SIZE/2);
        ctx.restore();

    }
    this.move=function(unit) {
        if(this.force) {
            this.angle+=unit/4;

        } else {
            this.angle+=unit;

        }
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
            let multi=1;
            if(this.force) multi=2
            this.x += unit*Math.cos(rad)*multi;
            this.y += unit*Math.sin(rad)*multi;
        }
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
        if(crows[0].force==true) {
            crows[i].move(delta_time/8);

        } else {
            crows[i].move(delta_time/10);

        }
        crows[i].draw(ctx);
    }
    
    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);
// keyboard events
window.addEventListener('keydown',function(e){
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
    }
});
window.addEventListener('keyup',function(e){
    if(e.keyCode==65) {
        // crows[0].clockwise=true;
    } else if(e.keyCode==68) {
        // crows[0].clockwise=false;
    } else if(e.keyCode==83) {
        // crows[0].up=false;
    } else if(e.keyCode==87) {
        // crows[0].up=true;
        crows[0].force=false;
        console.log(crows[0].force)
    }
});
var crows=[new Crow()];