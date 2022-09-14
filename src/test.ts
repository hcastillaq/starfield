import { starfieldEffect } from 'starfield-effect';
const container = document.getElementById('app');

if (container) {
  const options = {
    parent: container,
    numParticles: 1000,
    background: '#13111f',
    particleColor: 'white',
    maxParticleSize: 3, //optional
    fps: 60, //optional
    speed: 1, //optional,
    shadow: true, //optional
    shadowColor: ['#3969ae', '#67abe4', '#e5914f'], //optional
  };
  starfieldEffect(options);
}
