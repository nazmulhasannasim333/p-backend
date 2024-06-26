/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



const CGModal = ({ open, handleClose, children }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "270px", sm: "700px", md: "1000px", lg: "1200px" },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};

export default CGModal;
