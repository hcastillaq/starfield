## install

```
npm install starfield-effect
yarn add starfield-effect

```

### preview

[https://codepen.io/hcastillaq/pen/gOewNOr](https://codepen.io/hcastillaq/pen/gOewNOr)

<img src="https://raw.githubusercontent.com/hcastillaq/starfield/master/images/starfield.png" width="600" height="400" />

<br />

### usage

```
const container = document.getElementById('app');

if (container) {
  const options = {
    parent: container,
    numParticles: 1000,
    background: 'black',
    particleColor: 'white',
    maxParticleSize: 8, //optional
    fps: 60, //optional
    speed: 1, //optional
		shadow: true, //optional
    shadowColors: ['#3969ae', '#67abe4', '#e5914f'], //optional
		tips: 4, // default 4
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
      maxParticleSize: 8, //optional
      fps: 30, //optional
      speed: 5, //optional
			shadow: true, //optional
			shadowColors: ['#3969ae', '#67abe4', '#e5914f'], //optional
			tips: 4, //default 4
    };
    starfieldEffect(options);
  },[]);
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
