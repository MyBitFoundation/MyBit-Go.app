import Links from "./components/links";
import { PortfolioTypes } from "constants/portfolioTypes";

export const MyBitGo = () => (
  <Links
    data={[
      {
        name: "Explore",
        url: "/explore",
        internal: true
      },
      {
        name: "Portfolio",
        url: `/portfolio?type=${PortfolioTypes.INVESTMENTS}`,
        as: `/portfolio/${PortfolioTypes.INVESTMENTS}`,
        internal: true
      },
      {
        name: "Transactions",
        url: `/transaction-history`,
        internal: true
      },
      {
        name: "Watch List",
        url: `/watch-list`,
        internal: true
      },
      {
        name: "List Asset",
        url: `/list-asset`,
        internal: true
      },
      {
        name: "Knowledge Base",
        url: `/help`,
        internal: true
      },
      {
        name: "Onboarding",
        url: `/onboarding`,
        internal: true
      }
    ]}
  />
);

export const MyBitContribute = () => (
  <Links
    data={[
      {
        name: "Github",
        url: "https://github.com/MyBitFoundation",
        internal: false
      },
      {
        name: "Smart Contract Documentation",
        url: "https://developer.mybit.io/network/",
        internal: false
      },
      {
        name: "APIs",
        url: "https://developer.mybit.io/network/docgen/docs",
        internal: false
      },
      {
        name: "UI Kit",
        url: "https://ui.mybit.io/",
        internal: false
      },
      {
        name: "Chat",
        url: "https://t.me/mybitio",
        internal: false
      }
    ]}
  />
);

export const AboutMyBit = () => (
  <Links
    data={[
      {
        name: "Company",
        url: "https://mybit.io/about"
      },
      {
        name: "Token",
        url: "https://learn.mybit.io/learn/mybit-token-myb-1"
      },
      {
        name: "Blog",
        url: "https://medium.com/mybit-dapp"
      },
      {
        name: "Contact",
        url: "mailto:info@mybit.io"
      }
    ]}
  />
);

export const Products = () => (
  <Links
    data={[
      {
        name: "SDK",
        url: "https://developer.mybit.io/portal/"
      },
      {
        name: "MyBit",
        url: "/"
      },
      {
        name: "Task.Market",
        url: "https://task.market/"
      },
      {
        name: "MYDAX",
        url: "https://mydax.io/"
      },
      {
        name: "Other dApps",
        url: "https://mybit.io/tools"
      }
    ]}
  />
);

export const Resources = () => (
	<Links data={[{
		name: 'SDK',
		url: 'https://developer.mybit.io/portal/'
	}, {
		name: 'GitHub',
		url: 'https://github.com/MyBitFoundation'
	}, {
		name: 'Whitepaper',
		url: 'https://whitepaper.mybit.io/'
	}, {
		name: 'Contact',
		url: 'https://t.me/mybitio'
	}]}/>
)