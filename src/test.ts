import { starfieldEffect } from './lib/index';

const container = document.getElementById('app');

if (container) {
  const options = {
    parent: container,
    numParticles: 1200,
    background: '#13111f',
    particleColor: 'white',
    maxParticleSize: 8, //optional
    fps: 60, //optional
    speed: 1, //optional,
    shadow: true, //optional
    shadowColor: ['#3969ae', '#67abe4', '#e5914f'], //optional
    tips: 4, // default 4
  };
  starfieldEffect(options);
}
