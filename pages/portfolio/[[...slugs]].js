import React from 'react';
import PortfolioModule from 'components/PortfolioModule';
import Portfolio from 'components/Portfolio';
import { withMetamaskErrors } from 'components/MetamaskErrors';
import { useRouter } from 'next/router';

const PortfolioPage = () => {
  const { query: { slugs } } = useRouter();
  const type = slugs?.[0];

  return (
    <PortfolioModule>
      {props => <Portfolio {...props} type={type} />}
    </PortfolioModule>
  );
};

export default withMetamaskErrors(PortfolioPage, false);
