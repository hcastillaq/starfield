/**
 * returns random number btween two values
 * @param  {number} min
 * @param  {number} max
 * @returns number
 */
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * @param  {number} value
 * @param  {number} low1
 * @param  {number} high1
 * @param  {number} low2
 * @param  {number} high2
 * @returns number
 */
const map = (
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
): number => {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

/**
 * @param  {number} x
 * @param  {number} y
 * @param  {number} dz
 * @param  {number} speed
 * @param  {number} maxSize
 */
class Particle {
  public x: number;
  public y: number;
  public r: number;
  public n: number;
  public dz: number;
  public speed: number;
  public maxSize: number;
  public shadowColor: string;

  constructor(
    x: number,
    y: number,
    r: number,
    n: number,
    dz: number,
    speed: number,
    maxSize: number,
    shadowColor: string = 'white'
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.n = n;
    this.dz = dz;
    this.speed = speed;
    this.maxSize = maxSize;
    this.shadowColor = shadowColor;
  }

  /**
   * update particle position
   * @param  {number} canvasW
   * @param  {number} canvasH
   */
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
    this.r = map(this.dz, 0, canvasW, this.maxSize, 0);
  }
}

export interface StartFieldEffectOptions {
  parent: HTMLElement;
  numParticles: number;
  maxParticleSize?: number;
  speed?: number;
  background: string;
  particleColor: string;
  fps?: number;
  shadow?: boolean;
  shadowColors?: string[];
  points?: number;
}

/**
 * @param  {StartFieldEffectOptions} options
 * @returns void
 */
export const starfieldEffect = (options: StartFieldEffectOptions): void => {
  options.speed = options.speed || 1;
  options.maxParticleSize = options.maxParticleSize || 5;
  options.fps = options.fps || 30;
  options.shadowColors = options.shadowColors || [
    '#3969ae',
    '#67abe4',
    '#e5914f',
  ];

  if (options.parent) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let particles: Particle[] = [];

    /**
     * append canvas into parent and set size
     * @returns void
     */
    const setCanvas = (): void => {
      canvas.width = options.parent.offsetWidth || 0;
      canvas.height = options.parent.offsetHeight || 0;
      options.parent?.appendChild(canvas);
    };

    /**
     * create particles and save into array
     * @returns void
     */
    const createParticles = (): void => {
      for (let i = 0; i < options.numParticles; i++) {
        particles.push(
          new Particle(
            random(-canvas.width, canvas.width),
            random(-canvas.height, canvas.height),
            random(1, options.maxParticleSize),
            options.points || 4,
            random(0, canvas.width),
            options.speed || 1,
            options.maxParticleSize || 5,
            options.shadowColors[random(0, options.shadowColors.length - 1)]
          )
        );
      }
    };

    const drawParticle = (particle: Particle): void => {
      const ctx = context;
      const radius = particle.r;
      const inset = 0.2;
      const n = particle.n;
      ctx.beginPath();

      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.moveTo(0, 0 - radius);
      for (let i = 0; i < n; i++) {
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius * inset);
        ctx.rotate(Math.PI / n);
        ctx.lineTo(0, 0 - radius);
      }
      if (options.shadow) {
        context.shadowBlur = random(0, radius * 1.2);
        context.shadowColor = particle.shadowColor;
      }
      ctx.fillStyle = options.particleColor;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    };

    const wAnimation = () => {
      setTimeout(() => {
        window.requestAnimationFrame(draw);
      }, 1000 / options.fps);
    };

    /**
     * main draw function
     * @returns void
     */
    const draw = (): void => {
      if (context) {
        context.fillStyle = options.background;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        particles.forEach((particle) => {
          drawParticle(particle);
          particle.update(canvas.width, canvas.height);
        });
        context.restore();
        wAnimation();
      }
    };

    let resizeId: ReturnType<typeof setTimeout>;
    /**
     * runs when window resize, resize canvas and particles
     * @returns void
     */
    const wResize = (): void => {
      particles = [];
      canvas.width = options.parent.offsetWidth;
      canvas.height = options.parent.offsetHeight;
      createParticles();
    };

    const resizeEvent = () => {
      window.addEventListener('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(wResize, 100);
      });
    };

    /**
     * calls all necessary functions for start animation
     * @returns void
     */
    const init = (): void => {
      setCanvas();
      createParticles();
      resizeEvent();
      window.requestAnimationFrame(draw);
    };

    init();
  }
};
