import styled from 'styled-components';
import Link from 'next/link';

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: rgba(0, 0, 0, 0.65);
    margin: 5px 0px;
    font-size: 16px;
    line-height: 24px;

    :hover{
      color: inherit;
    }
    :focus{
      text-decoration: none;
    }
  }
`

const Links = ({
  data,
}) => (
  <LinksWrapper>
    {data.map(({
      name,
      url,
      as,
      internal,
    }) => {
      if(internal){
        return (
          <Link
            href={url}
            as={as ? as : undefined}
            key={name}
          >
            <a>{name}</a>
          </Link>
        )
      } else {
        return (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            key={name}
          >
            {name}
          </a>
        )
      }
    })}
  </LinksWrapper>
);

export default Links;
