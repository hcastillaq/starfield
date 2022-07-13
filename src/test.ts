import { starfieldEffect, StartFieldEffectOptions } from './lib/index';

const container = document.getElementById('app');

if (container) {
  const options = {
    parent: container,
    numParticles: 1000,
    background: 'black',
    particleColor: 'white',
    maxParticleSize: 3, //optional
    fps: 60, //optional
    speed: 1, //optional
  };
  starfieldEffect(options);
}

const Home: NextPage = () => {
  return (
    <>
      <Stars />
    </>
  );
};
