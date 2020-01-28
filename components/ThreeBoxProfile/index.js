import React from 'react'
import styled, { css } from 'styled-components';
import { withThreeBoxContext } from 'components/ThreeBoxContext';
import Freddy from 'public/freddy.svg';
import {
    shortenAddress,
} from 'utils/helpers';
import {
  LocalStorageKeys,
} from 'constants/localStorageKeys';
import { ExternalLinks } from 'constants/links';

const ProfileImageIconWrapper = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 5px;
  opacity: 0;
  transition: opacity 0.1s;
  ${props => props.hasLoaded && css`
    opacity: 1;
  `}
`

const UserIconWrapper = styled(Freddy)`
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

    async componentDidMount() {
      this.loadData();
    }

    componentDidUpdate = prevProps => {
      const { address: oldAddress } = prevProps;
      const { address: newAddress } = this.props;
      if(oldAddress !== newAddress){
        this.loadData();
      }
    }

    loadData = () => {
      const { address, threeBoxContext } = this.props;
      let name = localStorage.getItem(`${LocalStorageKeys.THREE_BOX_CACHE_NAME}${address}`)
      const imageIpfs = localStorage.getItem(`${LocalStorageKeys.THREE_BOX_CACHE_IMAGE}${address}`)
      this.setState({ name, imageIpfs })
      const { loadThreeBoxProfile } = threeBoxContext;
      loadThreeBoxProfile(address).then((profile) => {
        let newName, newIpfsHash;
        if(profile.name){
          newName = profile.name;
          localStorage.setItem(`${LocalStorageKeys.THREE_BOX_CACHE_NAME}${address}`, newName)
          this.setState({name: newName});
        }
        if(profile.image){
          newIpfsHash = profile.image[0]['contentUrl']['/']
          localStorage.setItem(`${LocalStorageKeys.THREE_BOX_CACHE_IMAGE}${address}`, newIpfsHash)
          this.setState({imageIpfs: newIpfsHash});
        }
      })
    }

    render() {
        const { name: profileName, imageIpfs, imageLoaded } = this.state;
        const { address, icon, name, long, short, showDefault } = this.props;
        const [ startIndex, endIndex ] = short ? short : [6, 4]
        const src = ExternalLinks.IPFS_GATEWAY_HASH(imageIpfs);
        const iconImage = () =>
            <ProfileImageIconWrapper
                src={src}
                onLoad={() => this.setState({imageLoaded: true})}
                hasLoaded={imageLoaded}
            />

        return (
            <React.Fragment>
            {
                icon && (imageIpfs ?
                    iconImage() : showDefault ?
                    <UserIconWrapper /> : null)
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
