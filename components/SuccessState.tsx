import { Alert, Snackbar } from '@mui/material';

interface SuccessStateProps {
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
  message: string;
}

const SuccessState: React.FC<SuccessStateProps> = ({
  isSuccess,
  setIsSuccess,
  message,
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSuccess(false);
  };

  return (
    <Snackbar open={isSuccess} autoHideDuration={4000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessState;
