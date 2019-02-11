c.fillStyle = 'Tan';
c.fillRect(0, 0, a.width, a.height);

let r = Math.random;

let plotter = {
    x: a.width / 2,
    y: a.height / 2,
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
    if (newX > a.width) {
        newX = a.width;
    }
    if (newX < 0) {
        newX = 0;
    }
    var newY = plotter.y + 80 - r() * 160;
    if (newY > a.height) {
        newY = a.height;
    }
    if (newY < 0) {
        newY = 0;
    }

    plotter.e = plotter.x + plotter.x - plotter.g;
    plotter.f = plotter.y + plotter.y - plotter.h;

    plotter.g = newX + plotter.y - plotter.f;
    plotter.h = newY + plotter.x - plotter.e;

    plotter.x = newX;
    plotter.y = newY;

    c.bezierCurveTo(plotter.e, plotter.f, plotter.g, plotter.h, plotter.x, plotter.y);

    if (plotter.d) {
        plotter.a -= 0.01;
        if (plotter.a < 0) {
            plotter.a = 0;
            plotter.d = false;
        }
    } else {
        plotter.a += 0.01;
        if (plotter.a > 1) {
            plotter.a = 1;
            plotter.d = true;
        }
    }

    c.strokeStyle = "rgba(35,33,23," + plotter.a + ")";
    c.stroke();

    requestAnimationFrame(u);
}

requestAnimationFrame(u);
