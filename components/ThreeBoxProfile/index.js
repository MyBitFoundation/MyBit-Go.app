import React from 'react'
import styled from 'styled-components';
import { withThreeBoxContext } from 'components/ThreeBoxContext';
import UserIcon from 'static/user_large.svg';
import {
    shortenAddress,
} from 'utils/helpers';

const ProfileImageIconWrapper = styled.img`
  width: 32px;
  border-radius: 50%;
  margin-right: 5px;
`

const UserIconWrapper = styled(UserIcon)`
  position: relative;
  top: 2px;
  margin-right: 5px;
  margin-left: 0px;
`

class ThreeBoxProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
    }

    async componentWillMount() {
        const { address, threeBoxContext } = this.props;
        const { loadThreeBoxProfile } = threeBoxContext;
        const profile = await loadThreeBoxProfile(address);
        this.setState({ profile })
      }

    render() {
        const { profile } = this.state;
        const { address, icon, name, long, short } = this.props;
        const [ startIndex, endIndex ] = short ? short : [6, 4]

        const iconImage = indexImage => profile && profile.image && 
            <ProfileImageIconWrapper 
                src={`https://ipfs.infura.io/ipfs/${profile.image[indexImage]['contentUrl']['/']}`} 
            />
        
        return (
            <React.Fragment>
            {
                icon && (iconImage ? 
                    iconImage(0) : 
                    <UserIconWrapper />)
            }
            {
                name && (profile.name ?
                    <span>{ profile.name }</span> :
                    <span>{ long ? address : shortenAddress(address, startIndex, endIndex) }</span>)
            }
            </React.Fragment>
        )
    }
}

export default withThreeBoxContext(ThreeBoxProfile);