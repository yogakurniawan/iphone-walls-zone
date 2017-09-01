import styled from 'styled-components';
import RoundedBox from 'components/RoundedBox';

const StyledDiv = styled.div `${RoundedBox}`;

const Overlay = styled(StyledDiv) `
  margin-top: 0;
  background-color: transparent;
  position: absolute;
  top: 0;
  display: table-cell;
  width: 100%;
  height: 100%;
  padding: 16px;
  right: 0;
  text-align: center;
  vertical-align: bottom;
  opacity: 0;
  -webkit-transition: .25s all;
  transition: .25s all;
`;

export default Overlay;
