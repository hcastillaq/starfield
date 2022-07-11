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
}

/**
 * @param  {StartFieldEffectOptions} options
 * @returns void
 */
export const starfieldEffect = (options: StartFieldEffectOptions): void => {
  options.speed = options.speed || 1;
  options.maxParticleSize = options.maxParticleSize || 5;
  options.fps = options.fps || 30;
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
            random(0, canvas.width),
            options.speed || 1,
            options.maxParticleSize || 5
          )
        );
      }
    };

    /**
     * draw particle to canvas
     * @param  {number} x
     * @param  {number} y
     * @param  {number} r
     * @returns void
     */
    const drawPartcile = (x: number, y: number, r: number): void => {
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
        context.stroke();
      }
    };

    /**
     * main draw function
     * @returns void
     */
    const draw = (): void => {
      if (context) {
        context.fillStyle = options.background;
        context.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          drawPartcile(particle.x, particle.y, particle.r);
          particle.update(canvas.width, canvas.height);
        });
        setTimeout(() => {
          window.requestAnimationFrame(draw);
        }, 1000 / options.fps);
      }
    };

    let wReizeId: ReturnType<typeof setTimeout>;
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

    /**
     * calls all necesary funtions for start animation
     * @returns void
     */
    const init = (): void => {
      setCanvas();
      createParticles();
      window.addEventListener('resize', () => {
        clearTimeout(wReizeId);
        wReizeId = setTimeout(wResize, 100);
      });
      window.requestAnimationFrame(draw);
    };

    init();
  }
};
