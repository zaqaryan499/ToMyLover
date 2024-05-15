const heartBtn = document.getElementsByClassName('heart')[0];
const TOTAL = 300;
let hearts = [];

const Heart = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.speed = 1;
    this.angle = 0;

    this.div = document.createElement('div');
    this.div.classList.add('hearts');
};

Heart.prototype.move = function () {
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
    this.z += this.vz * this.speed;
    this.div.style.transform = this.div.style.webkitTransform = this.getTransform();
};

Heart.prototype.setSize = function (width, height) {
    this.div.style.width = width + 'px';
    this.div.style.height = height + 'px';
};

Heart.prototype.getTransform = function () {
    return 'translate3d(' + this.x + 'px' + ',' + this.y + 'px,' + this.z + 'px) rotateZ(' + this.angle + 'deg)';
};

function addHeart(g) {
    document.body.appendChild(g.div);
    hearts.push(g);
}

function removeHearts() {
    for (let i = hearts.length; i--;) {
        document.body.removeChild(hearts[i].div);
    }
    hearts = [];
}

function createHearts(total, x, y) {
    for (var i = total; i--;) {
        var b = new Heart();
        b.x = x || window.innerWidth / 2;
        b.y = y || window.innerHeight / 2;
        var v = Math.random() * Math.PI * 2;
        b.vx = Math.cos(v);
        b.vy = Math.sin(v);
        b.vz = Math.random() * 4 - 2;
        var speed = Math.random() * 2 + 0.1;
        b.speed = speed * speed;
        b.angle = Math.random() * 360;
        b.setSize(Math.random() * 23 + 2, Math.random() * 13 + 2);
        addHeart(b);
    }
}

function update() {
    updateID = requestAnimationFrame(update);

    for (var i = hearts.length; i--;) {
        hearts[i].move();
    }
}

function init(count, x, y) {
    removeHearts();
    createHearts(count, x, y);
}

heartBtn.addEventListener('click', function (event) {
    createHearts(TOTAL, event.clientX, event.clientY);
});

let i = 0,
    lastTime = 0,
    vendors = ['ms', 'moz', 'webkit', 'o'];

while (i < vendors.length && !window.requestAnimationFrame) {
    window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
    i++;
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 1000 / 60 - currTime + lastTime),
            id = setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);

        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}

setTimeout(function () {
    var centerX = document.documentElement.clientWidth / 10;
    var centerY = document.documentElement.clientHeight;

    update();
    init(500, centerX, centerY);
}, 200);