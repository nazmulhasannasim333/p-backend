import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Skeleton,
  Typography,
  Avatar,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useGetAllUserQuery } from "../../redux/features/users/usersApi";
import CGModal from "../../components/Modal/CGModal";
import moment from "moment";
import { useGetProfileLogsQuery } from "../../redux/features/profile/profileApi";
import {
  getUniqueAims,
  getUniqueBatches,
  getUniqueGroups,
} from "../../utils/userFiltering";

const createData = (name, email,number, aim, batch, gender, actions) => {
  return { name, email,number, aim, batch, gender, actions };
};

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState("");
  const [batch, setBatch] = useState("");
  const [aim, setAim] = useState("");
  const [group, setGroup] = useState("");
  const [coEd, setCoEd] = useState("");
  const [number, setNumber] = useState("");
  const query = {};
  if (page) {
    query["page"] = page;
  }
  if (gender) {
    query["gender"] = gender;
  }
  if (batch) {
    query["batch"] = batch;
  }
  if (aim) {
    query["aim"] = aim;
  }
  if (group) {
    query["group"] = group;
  }
  if (coEd) {
    query["coEd"] = coEd;
  }
  if (number) {
    query["number"] = number;
  }

  const { data: allUsers, isFetching } = useGetAllUserQuery({ ...query });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const { data: profileLogs } = useGetProfileLogsQuery(selectedUser?.number, {
    skip: !selectedUser || isFetching | !modalOpen,
  });
  const { data: groupUsers } = useGetAllUserQuery(undefined);

  const batchGroup = getUniqueBatches(groupUsers?.data);
  const aimGroup = getUniqueAims(groupUsers?.data);
  const groupGroup = getUniqueGroups(groupUsers?.data);

  const handleReset = () => {
    setPage(1);
    setGender("");
    setBatch("");
    setAim("");
    setGroup("");
    setCoEd("");
  };

  useEffect(() => {
    if (!isFetching) {
      setRows(
        allUsers?.data?.map((user) =>
          createData(
            user.name,
            user.email,
            user.number,
            user.aim,
            user.batch,
            user.gender,
            <Box>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                }}
                onClick={() => handleOpenModal(user)}
              >
                Details
              </Button>
            </Box>
          )
        )
      );
    }
  }, [allUsers, isFetching]);

  const [rows, setRows] = useState([]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser("");
  };

  return (
    <Box
      sx={{
        my: 10,
        width: { xs: "270px", sm: "700px", md: "100%", lg: "100%" },
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
          label="Gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          select
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <TextField
          label="Batch"
          name="batch"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          select
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          {batchGroup.map((batchValue) => (
            <MenuItem key={batchValue} value={batchValue}>
              {batchValue}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Aim"
          name="aim"
          value={aim}
          onChange={(e) => setAim(e.target.value)}
          select
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          {aimGroup.map((aimValue) => (
            <MenuItem key={aimValue} value={aimValue}>
              {aimValue}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Group"
          name="group"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          select
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          {groupGroup.map((groupValue) => (
            <MenuItem key={groupValue} value={groupValue}>
              {groupValue}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="CoEd"
          name="coEd"
          value={coEd}
          onChange={(e) => setCoEd(e.target.value)}
          select
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </TextField>
        <TextField
          label="Phone Number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
        </TextField>
        <Button
          size="sm"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            backgroundColor: "red",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
        {isFetching ? (
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "20px", fontWeight: "semibold" }}>
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Email
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
                  Aim
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Batch
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton width={400} variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton width={500} variant="text" />
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
                    <Skeleton variant="rectangular" width={100} height={36} />
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
                <TableCell sx={{ fontSize: "20px", fontWeight: "semibold" }}>
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Email
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
                  Aim
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Batch
                </TableCell>

                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "20px", fontWeight: "semibold" }}
                  >
                    {row?.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: "semibold" }}
                  >
                    {row?.email}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: "semibold" }}
                  >
                    {row?.number}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: "semibold" }}
                  >
                    {row?.aim}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: "semibold" }}
                  >
                    {row?.batch}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: "semibold" }}
                  >
                    {row?.gender}
                  </TableCell>
                  <TableCell align="center">{row.actions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {!isFetching && allUsers?.meta && (
        <Box display="flex" justifyContent="center" sx={{ my: 3 }}>
          <Pagination
            count={allUsers.meta.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
      <CGModal open={modalOpen} handleClose={handleCloseModal}>
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            src=""
            alt={selectedUser?.name}
            sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
          />
          <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
            {selectedUser?.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {selectedUser?.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Phone: {selectedUser?.number}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Batch: {selectedUser?.batch}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Gender: {selectedUser?.gender}
          </Typography>
          <Divider sx={{ mt: 2 }} />
          <Box sx={{ textAlign: "left", mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Profile Logs / Changes
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="medium" aria-label="profile logs table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Aim</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Submit Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {profileLogs?.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log?.name}</TableCell>
                      <TableCell>{log?.email}</TableCell>
                      <TableCell>{log?.gender}</TableCell>
                      <TableCell>{log?.batch}</TableCell>
                      <TableCell>{log?.aim}</TableCell>
                      <TableCell>{log?.number}</TableCell>
                      <TableCell>
                        {moment(log?.submittedAt).format(
                          "DD.MM.YYYY, HH:mm:ss"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </CGModal>
    </Box>
  );
};

export default UserManagement;
