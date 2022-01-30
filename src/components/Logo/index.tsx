import * as React from 'react';

import styled from 'styled-components';

const PanterLogo = () => (
	<LogoContainer>
		<Panter>Panter</Panter>
	</LogoContainer>
);

export default PanterLogo;

const LogoContainer = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Panter = styled.h6`
	margin: 0;
	font-size: 70px;
	font-weight: 900;
	font-stretch: 400%;
	text-transform: uppercase;
`;
