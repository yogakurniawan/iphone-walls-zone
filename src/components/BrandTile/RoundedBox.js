import styled from 'styled-components';
import { Row } from 'react-styled-flexboxgrid';
import RoundedBox from 'components/RoundedBox';

const StyledLink = styled(Row)`${RoundedBox}`;

const Element = styled(StyledLink) `
  text-decoration: none;
  cursor: pointer;
  display: table;
  width: 100%;
  &:hover {
    .overlay {
      background-color: #dd5555;
      opacity: 1;
    }
  }
`;

export default Element;
