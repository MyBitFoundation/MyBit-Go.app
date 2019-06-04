import styled from 'styled-components';
import {
  Table,
} from 'antd';
import Loading from 'components/Loading';
import GetColumns from 'constants/assetManagers';
import ErrorPage from 'components/ErrorPage';
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
    });
  }

  render() {
    const {
      blockchainContext,
      network,
    } = this.props;

    const {
      loading,
      assetManagers,
    } = blockchainContext;

    if (loading.assets) {
      return <Loading message="Loading Asset Managers" />;
    }

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
