import UploadButtonWrapper from './uploadButtonWrapper';

const UploadButton = ({
  children,
  inputProps,
}) => (
  <UploadButtonWrapper>
    {children}
    <input type="file" name="myfile" {...inputProps}/>
  </UploadButtonWrapper>
)

export default UploadButton;
