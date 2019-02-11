let w = a.width / 2;
let h = a.height / 2;
let m = Math.min(w, h) * 2 / 3;
let r = Math.random;

c.translate(w, h);
c.strokeStyle = 'Snow';
c.fillStyle = 'Tan';
c.fillRect(-w, -h, w * 2, h * 2);
c.rotate(.8);

let plotter = {
    x: 0,
    y: 0,
    e: 0, // control point 1 x
    f: 0, // control point 1 y
    g: 0, // control point 2 x
    h: 0, // control point 2 y
    a: 0, // alpha
    d: false //down
};

plotter.g = plotter.x - 20;
plotter.h = plotter.y - 40;

let u = () => {

    c.beginPath();
    c.moveTo(plotter.x, plotter.y);

    var newX = plotter.x + 80 - r() * 160;
    if (newX > m) {
        newX = m;
    }
    if (newX < -m) {
        newX = -m;
    }
    var newY = plotter.y + 80 - r() * 160;
    if (newY > m) {
        newY = m;
    }
    if (newY < -m) {
        newY = -m;
    }

    if (newX > m / 6) {
        if (newY > m / 6) {
            if (r() > .5) {
                newY = m / 6;
            } else {
                newX = m / 6;
            }
        }
        if (newY < -m / 6) {
            if (r() > .5) {
                newY = -m / 6;
            } else {
                newX = m / 6;
            }
        }
    }

    if (newX < -m / 6) {
        if (newY > m / 6) {
            if (r() > .5) {
                newY = m / 6;
            } else {
                newX = -m / 6;
            }
        }
        if (newY < -m / 6) {
            if (r() > .5) {
                newY = -m / 6;
            } else {
                newX = -m / 6;
            }
        }
    }

    plotter.e = plotter.x + plotter.x - plotter.g;
    plotter.f = plotter.y + plotter.y - plotter.h;

    plotter.g = newX + plotter.y - plotter.f;
    plotter.h = newY + plotter.x - plotter.e;

    plotter.x = newX;
    plotter.y = newY;

    c.bezierCurveTo(plotter.e, plotter.f, plotter.g, plotter.h, plotter.x, plotter.y);
    c.stroke();

    if (plotter.d) {
        plotter.a -= 0.005;
        if (plotter.a < 0) {
            plotter.a = 0;
            plotter.d = false;
        }
    } else {
        plotter.a += 0.005;
        if (plotter.a > 0.5) {
            plotter.a = 0.5;
            plotter.d = true;
        }
    }

    c.globalAlpha = plotter.a;

    //c.fillStyle = 'rgba(210, 180, 140, .01)';
    //c.fillRect(-w, -h, w * 2, h * 2);

    requestAnimationFrame(u);
}

requestAnimationFrame(u);
