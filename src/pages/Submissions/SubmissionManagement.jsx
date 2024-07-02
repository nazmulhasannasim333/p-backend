import {
  Button,
  FormControlLabel,
  MenuItem,
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import {
  useGetAllSubmissionQuery,
  useUpdateSubmissionStatusMutation,
} from "../../redux/features/submissions/submissionsApi";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import moment from "moment";
import CGModal from "../../components/Modal/CGModal";
import { getGoogleDriveViewerLink } from "../../utils/convertDrivelink";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const createData = (id, name, group, number, status, submittedAt, pdf, sn) => {
  return { id, name, group, number, status, submittedAt, pdf, sn };
};

const SubmissionManagement = () => {
  const { taskId } = useParams();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("")
  const [number, setNumber] = useState("");
  const query = {}
  if (status) {
      query["status"] = status;
    }
    if (number) {
      query["number"] = number;
    }
  const {
    data: submissionData,
    isFetching,
    isLoading,
  } = useGetAllSubmissionQuery({ id: taskId, query });
  const rowsPerPage = submissionData?.meta?.limit;
  const [rows, setRows] = useState([]);
  const [updateSubmissionStatus] = useUpdateSubmissionStatusMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectSubmission, setSelectSubmission] = useState({});

  useEffect(() => {
    if (!isFetching && submissionData) {
      setRows(
        submissionData?.data?.map((submission, idx) =>
          createData(
            submission._id,
            submission.name,
            submission.group,
            submission.number,
            submission.status,
            submission.submittedAt,
            <Box>
            <Button
             onClick={() => handleOpenModal(submission)}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              PDF
            </Button>
          </Box>,
            (page - 1) * rowsPerPage + idx + 1
          )
        )
      );
    }
  }, [submissionData, isFetching, page, rowsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusChange = async (id) => {
    await updateSubmissionStatus(id);
  };

  const handleOpenModal = (sub) => {
    if (sub.pdf) {
        setSelectSubmission(sub);
        setModalOpen(true);
    } else {
        console.error("PDF link is not available for this submission.");
    }
};

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectSubmission("");
  };

  return (
    <Box
      sx={{
        my: 10,
        width: { xs: "320px", sm: "700px", md: "100%", lg: "100%" },
        mx: "auto",
      }}
    >
          <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
          defaultValue="All Task"
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Submission</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </TextField>
        <TextField
        type="number"
          label="Phone Number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 120 }}
        />
      </Box>
      <Typography variant="h5">Total submission found : <span style={{color: "#2196f3", fontSize: "25px"}}>{submissionData?.meta?.total}</span> </Typography>
      <TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
        {isLoading ? (
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  SN
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Group
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Submitted Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  PDF
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  SN
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Group
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Submitted Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  PDF
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.sn}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row.sn}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row.group}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row.number}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {moment(row.submittedAt).format("DD.MM.YYYY, HH:mm:ss")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    <FormControlLabel
                      control={
                        <Android12Switch checked={row.status === "approved"} />
                      }
                      label={row.status === "approved" ? "Approved" : "Pending"}
                      onChange={() => handleStatusChange(row.id)}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row.pdf}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {!isFetching && submissionData?.meta && (
        <Box display="flex" justifyContent="center" sx={{ my: 3 }}>
          <Pagination
            count={submissionData.meta.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    <CGModal open={modalOpen} handleClose={handleCloseModal}>
    {selectSubmission.pdf ? (
        <iframe 
            src={getGoogleDriveViewerLink(selectSubmission.pdf)} 
            title="PDF Viewer" 
            width="100%" 
            height="500px"
            style={{ border: 'none' }}
        />
    ) : (
        <Typography variant="body1">PDF link is not available.</Typography>
    )}
</CGModal>
    </Box>
  );
};

export default SubmissionManagement;
