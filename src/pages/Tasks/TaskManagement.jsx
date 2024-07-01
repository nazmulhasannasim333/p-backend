import { Button, FormControlLabel, MenuItem, Pagination, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useGetAllTaskQuery, useUpdateStatusMutation } from "../../redux/features/tasks/tasksApi";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Link } from "react-router-dom";


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));


const createData = (
    id,
   title,
   description,
   active,
    actions,
    sn
  ) => {
    return {id, title, description, active, actions, sn };
  };


const TaskManagement = () => {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("")
    const query = {}
    if (status) {
        query["active"] = status;
      }
    const { data: allTasks, isFetching, isLoading } = useGetAllTaskQuery({...query});
    const [updateActiveStatus] = useUpdateStatusMutation()
    const rowsPerPage = allTasks?.meta?.limit;


    useEffect(() => {
        if (!isFetching) {
          setRows(
            allTasks?.data?.map((task, idx) =>
              createData(
                task._id,
               task.title,
               task.description,
               task.active,
                <Box>
                  <Link to={`/submission/${task._id}`}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    Details
                  </Button>
                  </Link>
                </Box>,
                (page - 1) * rowsPerPage + idx + 1 
              )
            )
          );
        }
      }, [allTasks, isFetching, rowsPerPage, page]);
    
      const [rows, setRows] = useState([]);

      const handlePageChange = (event, value) => {
        setPage(value);
      };

      const handleStatusChange = async(id) => {
        await updateActiveStatus(id)
      }


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
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
          defaultValue="All Task"
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All Task</MenuItem>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Deactivate</MenuItem>
        </TextField>
      </Box>
      <Typography variant="h5">Total task found : <span style={{color: "#2196f3", fontSize: "25px"}}>{allTasks?.meta?.total}</span> </Typography>
            <TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
        {isLoading ? (
          <Table
            sx={{ minWidth: 650 }}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: "semibold" }}>
                  SN
                </TableCell>
                <TableCell
                  align="center"
                 sx={{ fontSize: "20px", fontWeight: "semibold" }}>
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Description
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
                  Submissions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                     <TableCell align="center">
                    <Skeleton variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton width={200} variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton width={200} variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton width={200} variant="text" />
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
                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: "semibold" }}>
                  SN
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "20px", fontWeight: "semibold" }}>
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
                  Description
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
                  Submissions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                  align="center"
                    component="th"
                    scope="row"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                     {row.sn}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row?.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row?.description}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    <FormControlLabel
        control={<Android12Switch checked={row.active === true} onChange={() => handleStatusChange(row.id)} />}
        label={row.active === true ? "Active" : "Deactivate"}
      />
                  </TableCell>
                  <TableCell align="center">{row.actions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {!isFetching && allTasks?.meta && (
        <Box display="flex" justifyContent="center" sx={{ my: 3 }}>
          <Pagination
            count={allTasks.meta.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
        </Box>
    );
};

export default TaskManagement;