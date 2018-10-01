/* eslint-disable react/no-unescaped-entities */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import '../../styles/LandingPage.css';
import { TableRows, HowDoesItWork } from '../../constants/landingPage';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentPage: 0,
    };

    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  setCurrentPage(currentPage) {
    this.setState({ currentPage });
  }

  getPageOne() {
    return (
      <div className="LandingPage__pageOne">
        <h1>Welcome!</h1>
        <p className="LandingPage__pageOne-subTitle">MyBit Go makes it easy to invest in assets with an attractive ROI.</p>
        <table className="LandingPage__pageOne-table">
          <tbody>
            <tr>
              <th />
              <th>MyBit Go</th>
              <th >Traditional</th>
            </tr>
            {TableRows.map(row => (
              <tr key={row.name}>
                <td valign="center">{row.name}</td>
                <td valign="center">{row.mybit}</td>
                <td valign="center">{row.traditional}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="LandingPage__pageOne-seeAgain">Don't want to see this again?</p>
        <Link to="/explore" href="/explore">
          <Button
            className="LandingPage__pageOne-skip-btn"
          >
            Skip
          </Button>
        </Link>
        <Button
          type="primary"
          className="LandingPage__pageOne-next-btn"
          onClick={() => this.setState({ currentPage: 1 })}
        >
          Next
        </Button>
      </div>
    );
  }

  getPageTwo() {
    return (
      <div className="LandingPage__pageTwo">
        <h1>How does it work?</h1>
        <p className="LandingPage__pageTwo-subTitle">It's simple.</p>
        <div className="LandingPage__pageTwo-guide">
          {HowDoesItWork.map((element, index) => (
            <div key={element.props.children || element.props.children[0]}>
              <span>{index + 1}. {element}</span>
            </div>
          ))}
        </div>
        <p className="LandingPage__pageTwo-getStarted">Get started</p>
        <div className="LandingPage__pageTwo-buttons">
          <Button
            onClick={() => this.setState({ currentPage: 0 })}
            className="LandingPage__pageTwo-buttons-is-back"
          >
            Back
          </Button>
          <Link to="/explore" href="/explore">
            <Button>
              Explore Assets
            </Button>
          </Link>
          <Link to="/help" href="/help">
            <Button
              type="primary"
            >
              Knowledge Base
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { currentPage } = this.state;
    return (
      <div className="LandingPage">
        <div className="LandingPage__wrapper">
          {currentPage === 0 ? this.getPageOne() : this.getPageTwo()}
        </div>
      </div>
    );
  }
}

export default LandingPage;
