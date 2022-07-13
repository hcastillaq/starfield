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

### usage with nextjs

```
// components/Stars

import { createRef, FC, useEffect } from 'react';
import { starfieldEffect } from 'starfield-effect';
import styled from 'styled-components';

const StarsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0px;
  left: 0px;
`;

const Stars: FC = () => {
  const container = createRef<HTMLDivElement>();
  useEffect(() => {
    const options = {
      parent: container.current as HTMLElement,
      numParticles: 1000,
      background: 'black',
      particleColor: '#ffffff7d',
      maxParticleSize: 3, //optional
      fps: 30, //optional
      speed: 5, //optional
    };
    starfieldEffect(options);
  });
  return <StarsContainer ref={container} />;
};

export default Stars;


// pages/index.tsx

import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Stars = dynamic(() => import('./../components/Stars'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <Stars />
    </>
  );
};


```
