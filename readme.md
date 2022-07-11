## install

```
npm install starfield-effect
yarn add starfield-effect

```

### usage

```
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

```
