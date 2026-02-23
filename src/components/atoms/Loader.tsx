import { CircularProgress, Box } from '@mui/material';

interface LoaderProps {
  size?: number;
}

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size={size} />
    </Box>
  );
};
