const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const scale = (
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
): number => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

class Particle {
  public x: number;
  public y: number;
  public r: number;
  public dz: number;
  public speed: number;
  public maxSize: number;

  constructor(
    x: number,
    y: number,
    dz: number,
    speed: number,
    maxSize: number
  ) {
    this.x = x;
    this.y = y;
    this.dz = dz;
    this.r = 1;
    this.speed = speed;
    this.maxSize = maxSize;
  }

  update(canvasW: number, canvasH: number) {
    this.dz -= this.speed;
    if (this.dz > 0) {
      this.x += this.x / this.dz;
      this.y += this.y / this.dz;
    } else {
      this.x = random(-canvasW, canvasW);
      this.y = random(-canvasH, canvasH);
      this.dz = random(0, canvasW);
    }
    this.r = scale(this.dz, 0, canvasW, this.maxSize, 0);
  }
}

interface StartFieldOptions {
  parent: HTMLElement;
  numParticles: number;
  maxParticleSize?: number;
  speed?: number;
  background: string;
  particleColor: string;
}

const starfield = (options: StartFieldOptions) => {
  options.speed = options.speed || 1;
  options.maxParticleSize = options.maxParticleSize || 5;

  if (typeof window === 'object') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let particles: Particle[] = [];

    const setCanvas = () => {
      canvas.width = options.parent.offsetWidth || 0;
      canvas.height = options.parent.offsetHeight || 0;
      options.parent?.appendChild(canvas);
    };

    const createParticles = () => {
      for (let i = 0; i < options.numParticles; i++) {
        particles.push(
          new Particle(
            random(-canvas.width, canvas.width),
            random(-canvas.height, canvas.height),
            random(0, canvas.width),
            options.speed || 1,
            options.maxParticleSize || 5
          )
        );
      }
    };

    const drawPartcile = (x: number, y: number, r: number) => {
      if (context) {
        context.beginPath();
        context.arc(
          canvas.width / 2 - x,
          canvas.height / 2 - y,
          r,
          0,
          2 * Math.PI,
          false
        );
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

    let wReizeId: number;
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

export default starfield;
