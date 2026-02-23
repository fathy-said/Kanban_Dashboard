import { Modal as MuiModal, Box, type ModalProps as MuiModalProps } from '@mui/material';

interface ModalProps extends Omit<MuiModalProps, 'children'> {
  children: React.ReactNode;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  minWidth: 400,
  maxWidth: 600,
};

export const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <MuiModal {...props}>
      <Box sx={modalStyle}>{children}</Box>
    </MuiModal>
  );
};
