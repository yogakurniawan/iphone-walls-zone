import styled from 'styled-components';

const H4 = styled.h4`
  color: ${props => props.theme[props.color]};
  font-weight: 100;
`;

export default H4;
