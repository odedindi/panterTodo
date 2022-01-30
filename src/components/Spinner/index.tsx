import * as React from 'react';

import styled, { keyframes } from 'styled-components';

import gsap from 'gsap';
// import

const Spinner = () => {
	const [tl] = React.useState(() => gsap.timeline({ repeat: -1 }));
	const circleRef = React.useRef<SVGCircleElement>(undefined!);

	React.useEffect(() => {
		tl.fromTo(
			circleRef.current,
			{
				ease: 'power1.easeInOut',
				rotation: 360,
				transformOrigin: '50% 50%',
				stroke: '#29B6F6',
			},
			{
				rotation: -720,
				stroke: '#FF4081',
			},
		).duration(3);
		// .to(circleRef.current, {
		// 	ease: 'power1.easeInOut',
		// 	rotation: -720,
		// 	transformOrigin: '50% 50%',
		// 	stroke: '#FF4081',
		// })
		// .duration(5);
		return () => {
			tl.kill();
		};
	}, [tl]);
	return (
		<SpinnerContainer>
			<svg
				version="1.1"
				baseProfile="tiny"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				xmlSpace="preserve"
			>
				<Circle
					ref={circleRef}
					fill="none"
					cx="12"
					cy="12"
					r="10"
					stroke="#29B6F6"
					strokeWidth="2"
				/>
			</svg>
		</SpinnerContainer>
	);
};

export default Spinner;

const SpinnerContainer = styled.section`
	position: absolute;
	top: 50%;
	left: 50%;
`;

const dash = keyframes`
 0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 35;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 135;
  }
`;
const Circle = styled.circle`
	stroke-linecap: round;
	animation: ${dash} 1.5s ease-in-out infinite;
`;
