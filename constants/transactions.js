import dayjs from 'dayjs';

const GetColumns = (sortedInfo, filteredInfo, getStatusImage) => [{
  title: 'Token',
  dataIndex: 'type',
  key: 'type',
  filters: [
    { text: 'ETH', value: 'ETH' },
    { text: 'MYB', value: 'MYB' },
  ],
  filteredValue: filteredInfo.type || null,
  onFilter: (value, record) => record.type.includes(value),
  render: text => <span style={{ color: '#1890ff' }}>{text}</span>,
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  filters: [
    { text: 'Confirmed', value: 'Confirmed' },
    { text: 'Pending', value: 'Pending' },
    { text: 'Error', value: 'Error' },
  ],
  filteredValue: filteredInfo.status || null,
  onFilter: (value, record) => record.status.includes(value),
  render: (text, record) => getStatusImage(record.status, text),
}, {
  title: 'Amount',
  dataIndex: 'amount',
  key: 'amount',
  sorter: (a, b) => {
    if (sortedInfo.order === 'descent') {
      return Number(a.amount) - Number(b.amount);
    }
    return Number(b.amount) - Number(a.amount);
  },
  sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
  render: (text, record) => (
    <React.Fragment>
      {text.toLocaleString()} <b>{record.type}</b>
    </React.Fragment>
  ),
}, {
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  sorter: (a, b) => a.date - b.date,
  sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
  render: text => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '',
  dataIndex: '',
  key: 'x',
  render: (text, record) => (
    <a
      href={`https://ropsten.etherscan.io/tx/${record.txId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View on Etherscan
    </a>
  ),
}];

export default GetColumns;
