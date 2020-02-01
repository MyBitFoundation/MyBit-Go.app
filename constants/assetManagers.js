import Media from 'react-media';
import dayjs from 'dayjs';
import ThreeBoxProfile from 'components/ThreeBoxProfile';
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
        <Link href={`/asset-managers?id=${record.key}`}>
        { matches ?
          <ThreeBoxProfile address={record.key} icon name long/> :
          <ThreeBoxProfile address={record.key} name short={[4,3]}/>
        }
        </Link>
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
  sorter: (a, b) => a.startDate - b.startDate,
  sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
  render: (text, record) => dayjs(record.startDate).format('DD MMMM YYYY'),
}, {
  title: 'Total Revenue',
  dataIndex: 'revenue',
  key: 'revenue',
  sorter: (a, b) => a.totalRevenue - b.totalRevenue,
  sortOrder: sortedInfo.columnKey === 'revenue' && sortedInfo.order,
  render: (text, record) => formatMonetaryValue(record.totalRevenue)
}];

export default GetColumns;
