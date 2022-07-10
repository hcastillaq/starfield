"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const scale = (value, low1, high1, low2, high2) => {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};
class Particle {
    constructor(x, y, dz, speed, maxSize) {
        this.x = x;
        this.y = y;
        this.dz = dz;
        this.r = 1;
        this.speed = speed;
        this.maxSize = maxSize;
    }
    update(canvasW, canvasH) {
        this.dz -= this.speed;
        if (this.dz > 0) {
            this.x += this.x / this.dz;
            this.y += this.y / this.dz;
        }
        else {
            this.x = random(-canvasW, canvasW);
            this.y = random(-canvasH, canvasH);
            this.dz = random(0, canvasW);
        }
        this.r = scale(this.dz, 0, canvasW, this.maxSize, 0);
    }
}
const starfield = (options) => {
    options.speed = options.speed || 1;
    options.maxParticleSize = options.maxParticleSize || 5;
    if (typeof window === 'object') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let particles = [];
        const setCanvas = () => {
            var _a;
            canvas.width = options.parent.offsetWidth || 0;
            canvas.height = options.parent.offsetHeight || 0;
            (_a = options.parent) === null || _a === void 0 ? void 0 : _a.appendChild(canvas);
        };
        const createParticles = () => {
            for (let i = 0; i < options.numParticles; i++) {
                particles.push(new Particle(random(-canvas.width, canvas.width), random(-canvas.height, canvas.height), random(0, canvas.width), options.speed || 1, options.maxParticleSize || 5));
            }
        };
        const drawPartcile = (x, y, r) => {
            if (context) {
                context.beginPath();
                context.arc(canvas.width / 2 - x, canvas.height / 2 - y, r, 0, 2 * Math.PI, false);
                context.fillStyle = options.particleColor;
                context.fill();
                context.lineWidth = 0;
                context.strokeStyle = options.particleColor;
                context.stroke();
            }
        };
        const draw = () => {
            if (context) {
                context.fillStyle = options.background;
                context.fillRect(0, 0, canvas.width, canvas.height);
                particles.forEach((particle) => {
                    drawPartcile(particle.x, particle.y, particle.r);
                    particle.update(canvas.width, canvas.height);
                });
                window.requestAnimationFrame(draw);
            }
        };
        let wReizeId;
        const wResize = () => {
            particles = [];
            canvas.width = options.parent.offsetWidth;
            canvas.height = options.parent.offsetHeight;
            createParticles();
        };
        window.onload = () => {
            setCanvas();
            createParticles();
            window.addEventListener('resize', () => {
                clearTimeout(wReizeId);
                wReizeId = setTimeout(wResize, 100);
            });
            window.requestAnimationFrame(draw);
        };
    }
};
exports.default = starfield;
