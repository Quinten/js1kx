console.log(a);
c.fillStyle = 'Tan';
c.fillRect(0, 0, a.width, a.height);

var plotter = {
        x: a.width / 2,
        y: a.height / 2,
        cp1x: 0,
        cp1y: 0,
        cp2x: 0,
        cp2y: 0,
        alpha: 0, down: false
    };

    plotter.cp2x = plotter.x - 20;
    plotter.cp2y = plotter.y - 40;

let u = () => {

        c.beginPath();
        c.moveTo(plotter.x, plotter.y);

        var newX = plotter.x + 80 - Math.random() * 160;
        if (newX > a.width) {
            newX = a.width;
        }
        if (newX < 0) {
            newX = 0;
        }
        var newY = plotter.y + 80 - Math.random() * 160;
        if (newY > a.height) {
            newY = a.height;
        }
        if (newY < 0) {
            newY = 0;
        }

        plotter.cp1x = plotter.x + plotter.x - plotter.cp2x;
        plotter.cp1y = plotter.y + plotter.y - plotter.cp2y;

        plotter.cp2x = newX + plotter.y - plotter.cp1y;
        plotter.cp2y = newY + plotter.x - plotter.cp1x;

        plotter.x = newX;
        plotter.y = newY;

        c.bezierCurveTo(plotter.cp1x, plotter.cp1y, plotter.cp2x, plotter.cp2y, plotter.x, plotter.y);

        if (plotter.down) {
            plotter.alpha -= 0.01;
            if (plotter.alpha < 0) {
                plotter.alpha = 0;
                plotter.down = false;
            }
        } else {
            plotter.alpha += 0.01;
            if (plotter.alpha > 1) {
                plotter.alpha = 1;
                plotter.down = true;
            }
        }

        c.strokeStyle = "rgba(35,33,23," + plotter.alpha + ")";
        c.stroke();

    requestAnimationFrame(u);
}

requestAnimationFrame(u);
