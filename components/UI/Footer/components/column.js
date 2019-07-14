import styled from 'styled-components';

const Title = styled.div`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #575757;
  margin-bottom: 10px;
`

const Column = ({
  title,
  content,
}) => (
  <div>
    <Title>{title}</Title>
    {content}
  </div>
);

export default Column;
