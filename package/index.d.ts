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
    tips?: number;
}
/**
 * @param  {StartFieldEffectOptions} options
 * @returns void
 */
export declare const starfieldEffect: (options: StartFieldEffectOptions) => void;
