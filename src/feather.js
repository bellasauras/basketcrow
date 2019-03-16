
function Feather(x,y) {
    this.x=x;
    this.y=y;
    this.life=0;
    this.angle=Math.round(Math.random()*360)
    this.draw=function(ctx){
        this.angle=this.angle+1;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.radians(this.angle % 360));
        ctx.translate(-this.x,-this.y);
        ctx.drawImage(img_feather, this.x,this.y,30,40);

        ctx.restore();

    }
}