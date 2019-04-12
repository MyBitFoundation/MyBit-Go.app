import FooterList from './footerList';
import FooterSection from './footerSection';

const MyBitGoSection = {
  title: 'Mybit Go',
  children:
  <FooterList
    items={[{
      name: 'Explore',
      url: '/explore',
      internal: true,
    }, {
      name: 'Portfolio',
      url: '/portfolio',
      internal: true,
    }, {
      name: 'Transactions',
      url: '/transaction-history',
      internal: true,
    }, {
      name: 'List Asset',
      url: '/list-asset',
      internal: true,
    }, {
      name: 'Knowledge Base',
      url: '/help',
      internal: true,
    }]}
  />
};

const AboutMybitSection = {
  title: 'About MyBit',
  children:
  <FooterList
    items={[{
      name: 'Company',
      url: 'https://mybit.io/company',
    }, {
      name: 'Token',
      url: 'https://mybit.io/token',
    }, {
      name: 'Blog',
      url: 'https://mybit.io/blog',
    }, {
      name: 'Contact',
      url: '/',
    }]}
  />
};

const AboutProductsSection = {
  title: 'Products',
  children:
  <FooterList
    items={[{
      name: 'SDK',
      url: 'https://mybit.io/SDK',
    }, {
      name: 'MyBit Go',
      url: '/',
      internal: true,
    }, {
      name: 'MyBit DDF',
      url: 'https://ddf.mybit.io/',
    }, {
      name: 'Other dApps',
      url: '/',
    }]}
  />
};

const FooterData = [[
  <FooterSection
    {...MyBitGoSection}
  />,
  <FooterSection
    {...AboutMybitSection}
  />
],
  <FooterSection
    {...AboutProductsSection}
  />,
]

export default FooterData;
