export interface StartFieldOptions {
    parent: HTMLElement;
    numParticles: number;
    maxParticleSize?: number;
    speed?: number;
    background: string;
    particleColor: string;
}
declare const starfield: (options: StartFieldOptions) => void;
export default starfield;
