let tagEle = document.querySelectorAll(".tagcloud a"),
            paper = document.querySelector(".tagcloud .entry")
            RADIUS =150,
            fallLength = 500,
            tags=[],
            angleX = Math.PI/500,
            angleY = Math.PI/500,
            CX = paper.offsetWidth/2,
            CY = paper.offsetHeight/2,
            EX = paper.offsetLeft + document.body.scrollLeft || document.documentElement.scrollLeft,
            EY = paper.offsetTop + document.body.scrollTop || document.documentElement.scrollTop

function init(){
    for(var i=0;i<tagEle.length;i++){
        var a , b;
        var k = (2*(i+1)-1)/tagEle.length - 1;
        var a = Math.acos(k);
        var b = a*Math.sqrt(tagEle.length*Math.PI)
        var x = RADIUS * Math.sin(a) * Math.cos(b);
        var y = RADIUS * Math.sin(a) * Math.sin(b); 
        var z = RADIUS * Math.cos(a);
        var t = new tag(tagEle[i] , x , y , z);
        // tagEle[i].style.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Ma     th.random()*255)+","+parseInt(Math.random()*255)+")";
        tags.push(t);
        t.move();
    }
}

Array.prototype.forEach = function(callback){
    for(var i=0;i<this.length;i++){
        callback.call(this[i]);
    }
}

let animated
function animate(){
    animated = setInterval(function(){
        rotateX();
        rotateY();
        tags.forEach(function(){
            this.move();
        })
    } , 17)
    
    // console.log('start animate ', animated)
}

function clearAnimate() {
    if(animated) {
        // console.log('clear animate ', animated)
        clearInterval(animated)
        animated = undefined
    }
}

if("addEventListener" in window){
    paper.addEventListener("mouseover" , function(event){
        let target = event.target
        if(target.nodeName.toLowerCase() === 'a') {
            // console.log(target)
            // console.log('move over')
            clearAnimate()
        } else {
            var x = event.clientX - EX - CX;
            var y = event.clientY - EY - CY;
            angleY = x*0.00001;
            angleX = y*0.00001;
            clearAnimate()
            animate()
        }
    }, false);
    paper.addEventListener('mouseenter', function(event) {
        // console.log(event)
        clearAnimate()
    })
}


function rotateX(){
    var cos = Math.cos(angleX);
    var sin = Math.sin(angleX);
    tags.forEach(function(){
        var y1 = this.y * cos - this.z * sin;
        var z1 = this.z * cos + this.y * sin;
        this.y = y1;
        this.z = z1;
    })
}

function rotateY(){
    var cos = Math.cos(angleY);
    var sin = Math.sin(angleY);
    tags.forEach(function(){
        var x1 = this.x * cos - this.z * sin;
        var z1 = this.z * cos + this.x * sin;
        this.x = x1;
        this.z = z1;
    })
}

var tag = function(ele , x , y , z){
    this.ele = ele;
    this.x = x;
    this.y = y;
    this.z = z;
}

tag.prototype = {
    move:function(){
        var scale = fallLength/(fallLength-this.z);
        var alpha = (this.z+RADIUS)/(2*RADIUS);
        this.ele.style.opacity = alpha+0.5;
        this.ele.style.filter = "alpha(opacity = "+(alpha+0.5)*100+")";
        this.ele.style.zIndex = parseInt(scale*100);
        this.ele.style.left = this.x + CX - this.ele.offsetWidth/2 +"px";
        this.ele.style.top = this.y + CY - this.ele.offsetHeight/2 +"px";
    }
}
init();