/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CGModal = ({ open, handleClose, children }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "320px", sm: "700px", md: "1000px", lg: "1200px" },
    maxHeight: '90vh', 
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

  const closeIconStyle = {
    position: 'absolute',
    top: 8,
    right: 8,
    bgcolor: "#757575",
    color: "#fff"
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={closeIconStyle}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default CGModal;
