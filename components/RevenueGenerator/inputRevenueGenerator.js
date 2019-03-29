import {
  InputNumber,
  Button,
  Modal,
} from 'antd';

import styled from 'styled-components';

const InputRevenueGeneratorWrapper = styled.div`
  height: 400px;
  width: 400px;
  position: fixed;
  z-index: 1000;
}`

const InputRevenueGeneratorNumber = styled(InputNumber)`

`

const InputRevenueGeneratorWarning = styled.p`
  font-size: 16px;
`

const InputRevenueGeneratorLabel = styled.span`
  margin-right: 20px;
`

const InputRevenueGenerator = ({
  onConfirm,
  onCancel,
  currentValue,
  onValueChange,
}) => (
  <InputRevenueGeneratorWrapper>
    <Modal
      visible={true}
      okButtonProps={{
        disabled: currentValue === 0,
        type: 'primary',
        text: 'Confirm',
      }}
      onOk={onConfirm}
      onCancel={onCancel}
      title={`Generate Revenue for asset`}
    >
      <InputRevenueGeneratorWarning>
        Please read before continuing.
      </InputRevenueGeneratorWarning>
      <p>
        Note that once you click <b>confirm</b> Metamask takes over and MyBit Go won't give you any directions.
        Wait for the transactions to be confirmed and then either wait for Go to refresh on its own or
        refresh the page.<br />
        Make sure you have enough DAI to cover the expense, as well as ETH for gas.
      </p>
      <InputRevenueGeneratorLabel>
        Amount to generate (DAI) :
      </InputRevenueGeneratorLabel>
      <InputRevenueGeneratorNumber min={1} max={10} defaultValue={3} onChange={onValueChange} value={currentValue}/>
    </Modal>
  </InputRevenueGeneratorWrapper>
);

export default InputRevenueGenerator;
