import React from 'react'
import styled, { css } from 'styled-components';
import { withThreeBoxContext } from 'components/ThreeBoxContext';
import UserIcon from 'static/user_large.svg';
import {
    shortenAddress,
} from 'utils/helpers';
import {
  LocalStorageKeys,
} from 'constants/localStorageKeys';
const ProfileImageIconWrapper = styled.img`
  width: 32px;
  height: 26.26px;
  border-radius: 50%;
  margin-right: 5px;
  opacity: 0;
  transition: opacity 0.1s;
  ${props => props.hasLoaded && css`
    opacity: 1;
  `}
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
            profile: {},
            imageLoaded: false,
        }
    }

    async componentWillMount() {
        const { address, threeBoxContext } = this.props;
        const name = localStorage.getItem(`${LocalStorageKeys.THREE_BOX_CACHE_NAME}${address}`)
        const imageIpfs = localStorage.getItem(`${LocalStorageKeys.THREE_BOX_CACHE_IMAGE}${address}`)

        const { loadThreeBoxProfile } = threeBoxContext;
        loadThreeBoxProfile(address).then((profile) => {
          this.setState({name: profile.name, imageIpfs: profile.image[0]['contentUrl']['/']});
          localStorage.setItem(`${LocalStorageKeys.THREE_BOX_CACHE_NAME}${address}`, name)
          localStorage.setItem(`${LocalStorageKeys.THREE_BOX_CACHE_IMAGE}${address}`, imageIpfs)
        })

       this.setState({ name, imageIpfs })
      }

    render() {
        const { name: profileName, imageIpfs, imageLoaded } = this.state;
        const { address, icon, name, long, short } = this.props;
        const [ startIndex, endIndex ] = short ? short : [6, 4]

        const iconImage = indexImage => imageIpfs &&
            <ProfileImageIconWrapper
                src={`https://ipfs.infura.io/ipfs/${imageIpfs}`}
                onLoad={() => this.setState({imageLoaded: true})}
                hasLoaded={imageLoaded}
            />

        return (
            <React.Fragment>
            {
                icon && (iconImage ?
                    iconImage(0) :
                    <UserIconWrapper />)
            }
            {
                name && (profileName ?
                    <span>{ profileName }</span> :
                    <span>{ long ? address : shortenAddress(address, startIndex, endIndex) }</span>)
            }
            </React.Fragment>
        )
    }
}

export default withThreeBoxContext(ThreeBoxProfile);
