import {
  Button,
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
import { useEffect, useState } from "react";
import {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "../../redux/features/blogs/blogsApi";
import CGModal from "../../components/Modal/CGModal";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const createData = (id, title, description, image, actions) => {
  return { id, title, description, image, actions };
};

const BlogManagement = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    data: blogs,
    isFetching,
  } = useGetAllBlogQuery({});
  const [createBlog] = useCreateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating blog...");
    try {
      const res = await createBlog(data);
      if (res?.data?.success === true) {
        toast.success("Blog created successfully", {
          id: toastId,
          duration: 2000,
        });
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteBlog(id);
      if (res?.data?.success === true) {
        toast.success("Blog deleted successfully");
        setOpenDelete(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setOpenDelete(true);
  };

  useEffect(() => {
    if (!isFetching) {
      setRows(
        blogs?.data?.map((blog) =>
          createData(
            blog._id,
            blog.title,
            blog.description,
            blog.image,
            <Box>
              <Button
                onClick={() => handleDeleteModal(blog)}
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: 16,
                  bgcolor: "red",
                }}
              >
                Delete
              </Button>
            </Box>
          )
        )
      );
    }
  }, [blogs, isFetching]);

  const [rows, setRows] = useState([]);

  const handleCreateTaskModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: 16,
          }}
          onClick={() => handleCreateTaskModal()}
        >
          Create Blog
        </Button>
      </Box>
      <CGModal open={modalOpen} handleClose={handleCloseModal}>
        <h2>Create a Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Title"
            {...register("title", { required: "Title is required" })}
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
          />
          <TextField
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <TextField
            label="Image Link"
            {...register("image", { required: "Image is required" })}
            fullWidth
            margin="normal"
            error={!!errors.image}
            helperText={errors.image ? errors.image.message : ""}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Create Blog
          </Button>
        </form>
      </CGModal>
      <Typography variant="h5">
        Total blogs found :{" "}
        <span style={{ color: "#2196f3", fontSize: "25px" }}>
          {blogs?.data?.length}
        </span>{" "}
      </Typography>
      <TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
        {isFetching ? (
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontSize: "20px", fontWeight: "semibold" }}
                >
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
                  Image
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
                    <Skeleton width={300} variant="text" />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton width={300} variant="text" />
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
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "20px", fontWeight: "semibold" }}>
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
                  Image
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
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row?.title?.length > 20
                      ? row.title.slice(0, 20) + "..."
                      : row.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    {row?.description?.length > 20
                      ? row.description.slice(0, 20) + "..."
                      : row.description}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "16px", fontWeight: "semibold" }}
                  >
                    <img
                      src={row.image}
                      alt={row.title}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.actions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <CGModal open={openDelete} handleClose={() => setOpenDelete(false)}>
        <Typography id="modal-modal-title" variant="h4" component="h2" textAlign="center">
          Are you sure?
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
          Do you want to delete your blog?
        </Typography>
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          <Button
          onClick={() => handleDelete(selectedBlog?._id)}
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: "red",
              color: "white",
              textTransform: "capitalize",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
          >
            Delete blog
          </Button>
        </Box>
      </CGModal>
    </Box>
  );
};

export default BlogManagement;
