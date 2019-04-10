import styled from 'styled-components';

const SupportedBrowsersWrapper = styled.span`
  a:focus{
    text-decoration: none;
  }
}`

const SupportedBrowsers = () => (
  <SupportedBrowsersWrapper>
    <a
      href="https://www.google.com/chrome/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {' '}
      Chrome
    </a>,
    <a
      href="https://www.mozilla.org/en-US/firefox/new/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {' '}
      Firefox
    </a>,
    <a
      href="https://www.opera.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {' '}
      Opera
    </a>{' '}
    or
    <a
      href="https://brave.com/download/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {' '}
      Brave
    </a>
  </SupportedBrowsersWrapper>
)

export default SupportedBrowsers;
