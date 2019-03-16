
function Crow(x,y,ball) {
    this.x=x;
    this.y=y;
    this.angle=0;
    this.ball=ball;
    this.clockwise=false;
    this.strength=0;
    this.up=true;
    this.draw=function(ctx){
        ctx.fillStyle = 'red';
        let frame=0;
        if(this.force) frame=1;

        ctx.save();
        ctx.translate(this.x, this.y);
        if(this.clockwise) {
            ctx.rotate(Math.radians(this.angle*-1 % 360));
        } else {
            ctx.rotate(Math.radians(this.angle+100 % 360));

        }
        
        ctx.translate(-this.x,-this.y);
        if(this.ball) ctx.drawImage(img_ball, this.x-60,this.y-60,120,120);

        ctx.drawImage(img_crow, CROW_SIZE*frame,0,CROW_SIZE,CROW_SIZE,this.x-(CROW_SIZE/4),this.y-(CROW_SIZE/4),CROW_SIZE/2,CROW_SIZE/2);
        ctx.restore();

    }
    this.in_screen=function() {
        if(this.x>0&&this.y>0&&this.x<SCREEN_WIDTH&&this.y<SCREEN_HEIGHT) return true;
        return false;
    }
    this.move=function(unit) {
        if(!this.in_screen()) {
            this.angle+=unit*2;
        } else if(this.force) {
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
            if(this.force||!this.in_screen()) multi=2
            this.x += unit*Math.cos(rad)*multi;
            this.y += unit*Math.sin(rad)*multi;
        }
    }
}