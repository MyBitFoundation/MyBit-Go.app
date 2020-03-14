/*

Display nothing and just goto /explore

*/

import React from 'react';
import Router from 'next/router';

export default class IndexPage extends React.Component {
  componentDidMount() {
    Router.push('/onboarding');
  }
  render(){
    return null;
  }
}
