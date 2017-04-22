
function Point() {
        this.x,
        this.y,
        this.connNumb = 0,
        this.speedX = Math.floor(Math.random() * 4) - 2;
        this.speedY = Math.floor(Math.random() * 4) - 2;
        
                
        this.lengthSpeed = function() {
            return Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        }
        
        this.normaliseSpeed = function() {
            this.speedX = this.speedX / this.lengthSpeed();
            this.speedY = this.speedY / this.lengthSpeed();
        }
        
        this.setPoint = function(x, y) {
            this.x = x;
            this.y = y;
            this.normaliseSpeed();
        }
        
        this.addSpeed = function() {
            this.checkSpeed();
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
        }
        
        this.checkSpeed = function() {
            var treshold = 20;
            if(this.x < -treshold || this.x > window.innerWidth + treshold) {
                this.speedX = -this.speedX;
            }
            if(this.y < -treshold || this.x > window.innerHeight + treshold) {
                this.speedY = -this.speedY;
            }
        }
};

function Curve() {
    this.points = [],
    this.pointNum = 10,

    this.addPoint = function (p) {
        if (this.points.length <= this.pointNum) {
            this.points.push(p);
        }
    }
}

function Circle() {
    this.x,
    this.y,
    this.centerX,
    this.centerY,
    this.radius,
    this.strokeLine,
    this.color,

    this.setCircle = function(cx, cy, r, sl, clr) {
        this.centerX = cx;
        this.centerY = cy;
        this.x = cx;
        this.y = cy;
        this.radius = r;
        this.strokeLine = sl;
        this.color = clr;   
    }

    this.drawCircle = function(context) {
        context.beginPath();
        context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        /*context.lineWidth = this.strokeLine;
        context.strokeStyle = '#F5F5F5';
        context.stroke();*/
    }

    this.incRadius = function() {
        this.radius = this.radius + 1;
    }

    this.decStrokeWidth = function() {
        this.strokeLine = this.strokeLine - 0.05;
    }
}

function drawCanvas() {
    
    var curves = [];
    var startCurve = new Curve();
    var endCurve = new Curve();
    var canvasWidth = 600;
    var canvasHeigth = 590;

    for (var i = 0; i < startCurve.pointNum; ++i) {
        //for (var j = 0; j < pointNum; ++j) {
            var point = new Circle();
            var point2 = new Circle(); 
            //point.setCircle( canvasWidth / pointNum * i + 25, canvasHeigth / pointNum * j + 25, 1, 0, '#666');
            point.setCircle( canvasWidth / startCurve.pointNum * i, (Math.random() * 300) - 300, 1, 0, '#666');
            startCurve.addPoint(point);

            point2.setCircle( canvasWidth / startCurve.pointNum * i, (Math.random() * 300 + 100) + canvasHeigth - 100, 1, 0, '#666');
            endCurve.addPoint(point2);
       // }
    }

    for (var i = 0; i < 10; i++) {
        curves.push()
    }


/*
    var circles = [];
    
    for (var i = 0; i < 10; ++i) {
        var circle = new Circle();
        circle.setCircle(Math.floor(Math.random() * window.innerWidth + 100) - 100, (Math.random() * window.innerHeight + 100) - 100, 5, 10, '#F5F5F5');
        circles.push(circle);
    }*/
    
    // Create a canvas that extends the entire screen
    // and it will draw right over the other html elements, like buttons, etc
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeigth);
    canvas.setAttribute("style", "position: absolute; x:0; y:0;");
    document.getElementById('sds-canvas').appendChild(canvas);
    //Then you can draw a point at (10,10) like this:

    var ctx = canvas.getContext("2d");
    /*
    for(var i = 0; i < circles.length; i++) {
        circles[i].drawCircle(ctx);
    }
*/
    
    for (var i = 0; i < 50; i++) {
        drawQuadCurve(ctx, innerCurve(startCurve, endCurve, 50, i));
    }


    // start animation
    //animate(startCurve, ctx, canvas);
}

function pointDist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

window.onload = function() {
    drawCanvas();
};

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
      
    function animate(circles, ctx, canvas) {
        // update
        for(var i = 0; i < circles.length; i++) {
            if (circles[i].radius > 500) {
                circles[i].setCircle(Math.floor(Math.random() * window.innerWidth + 100) - 100, (Math.random() * window.innerHeight + 100) - 100, 5, 10, '#a71930');
            }
            circles[i].incRadius();
        }
      
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // draw
        for(var i = 0; i < circles.length; i++) {
            circles[i].drawCircle(ctx);
        }

        // request new frame
        requestAnimFrame(function() {
            animate(circles, ctx, canvas);
        });
    }
 

function drawQuadCurve(ctx, curve) {
    var points = curve.points;
    // move to the first point
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (i = 1; i < points.length - 2; i ++)
    {
       var xc = (points[i].x + points[i + 1].x) / 2;
       var yc = (points[i].y + points[i + 1].y) / 2;
       ctx.strokeStyle = points[i].color;
       ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    // curve through the last two points
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
    
    ctx.lineWidth = 1;
    // set line color
    ctx.strokeStyle = points[points.length - 1].color;
    ctx.stroke();
}

function innerCurve(c1, c2, num, index) {
    var p1 = c1.points;
    var p2 = c2.points;
    var c = new Curve();
    for (var i = 0; i < p1.length; i++) {
        var newY = Math.floor(Math.random() * 30) + (((p1[i].y * index) + (p2[i].y * (num - index))) / num);
        var newP = new Circle();
      /*  var R = Math.floor(Math.random() * 100) - 50 + 167;
        var G = Math.floor(Math.random() * 100) - 50 + 25;
        var B = Math.floor(Math.random() * 100) - 50 + 48;*/
        var rand = Math.floor(Math.random() * 50) - 25;
        var R = rand + 225;
        var G = rand + 225;
        var B = rand + 225;
        var color = '#' + R.toString(16) + G.toString(16) + B.toString(16);
        newP.setCircle( p1[i].x, newY, 1, 0, color);
        c.addPoint(newP);
    }
    return c;
}