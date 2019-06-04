import dayjs from 'dayjs';
import Media from 'react-media';
import { ExternalLinks } from 'constants/links'
import Link from 'next/link';
import { 
  formatMonetaryValue,
  shortenAddress,
} from 'utils/helpers';

const GetColumns = (sortedInfo, filteredInfo, network) => [{
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  render: (text, record) => (
    <Media query="(min-width: 769px)">
      {matches =>
        <a
          href={ExternalLinks.getEtherscanAddressURL(network, record.key)}
          target="_blank"
          rel="noopener noreferrer"
        >
        {matches ? record.key : shortenAddress(record.key, 4, 3)}
        </a>
      }
    </Media>
  )
}, {
  title: 'Assets',
  dataIndex: 'totalAssets',
  key: 'totalAssets',
  sorter: (a, b) => a.totalAssets - b.totalAssets,
  sortOrder: sortedInfo.columnKey === 'totalAssets' && sortedInfo.order,
  render: (text, record) => record.totalAssets,
}, {
  title: 'Start Date',
  dataIndex: 'date',
  key: 'date',
  sorter: (a, b) => a.startDate.isAfter(b.startDate),
  sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
  render: (text, record) => record.startDate.format('DD MMMM YYYY'),
}, {
  title: 'Total Revenue',
  dataIndex: 'revenue',
  key: 'revenue',
  sorter: (a, b) => a.totalRevenue - b.totalRevenue,
  sortOrder: sortedInfo.columnKey === 'revenue' && sortedInfo.order,
  render: (text, record) => formatMonetaryValue(record.totalRevenue)
}, {
  title: '',
  dataIndex: '',
  key: 'x',
  render: (text, record) => (
    <Link
      as={`/asset-managers/${record.key}`}
      href={`/asset-managers?id=${record.key}`}
    >
      <a>All Assets</a>
    </Link>
  ),
}];

export default GetColumns;
