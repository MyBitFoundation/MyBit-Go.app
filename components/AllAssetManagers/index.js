import styled from 'styled-components';
import {
  Table,
} from 'antd';
import Loading from 'components/Loading';
import GetColumns from 'constants/assetManagers';
import PageTitle from 'ui/PageTitle';

const TableWrapper = styled.div`
  table a:focus{
    text-decoration: none;
  }
  overflow-x: auto;
`

class AllAssetManagers extends React.Component {
  state = {
    itemsPerPage: 10,
    sortedInfo: {
      order: 'descend',
      columnKey: 'date',
    },
    filteredInfo: {},
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortedInfo: sorter,
      filteredInfo: filters,
      loadingManagersData: true,
    });
  }

  componentWillMount = () => {
    this.getData()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const oldAssetManagers = this.props.blockchainContext.assetManagers;
    const newAssetManagers = nextProps.blockchainContext.assetManagers;
    if(Object.keys(oldAssetManagers).length === 0 && Object.keys(newAssetManagers).length > 0){
      this.getData(nextProps);
      return false;
    }

    return true;
  }

  getData = nextProps => {
    const {
      blockchainContext,
      network,
    } = nextProps || this.props;
    const {
      assetManagers,
    } = blockchainContext;

    const assetManagersArray = Object.entries(assetManagers).map(([key, value]) => ({
      key,
      ...value,
    }))

    const {
      itemsPerPage,
      sortedInfo,
      filteredInfo,
    } = this.state;

    const columns = GetColumns(sortedInfo, filteredInfo, network);

    this.setState({
      columns,
      assetManagersArray,
      loadingManagersData: false,
    })
  }

  render() {
    const {
      blockchainContext,
    } = this.props;

    const {
      loading,
    } = blockchainContext;

    const {
      loadingManagersData,
      columns,
      assetManagersArray,
      itemsPerPage,
    } = this.state;

    if (loading.assets || loadingManagersData) {
      return <Loading message="Loading Asset Managers" />;
    }

    return (
      <TableWrapper>
        <PageTitle>Asset Managers</PageTitle>
        <Table
          columns={columns}
          dataSource={assetManagersArray}
          pagination={{ pageSize: itemsPerPage }}
          onChange={this.handleChange}
        />
      </TableWrapper>
    );
  }
}

export default AllAssetManagers;
