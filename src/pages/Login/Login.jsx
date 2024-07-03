import { Box, Typography, TextField, Button, Link, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setUser } from '../../redux/features/auth/authSlice';
import { useLoginAdminMutation } from '../../redux/features/auth/authApi';
import { toast } from 'sonner';

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const { control, handleSubmit } = useForm();
    const [adminLogin] = useLoginAdminMutation();
    const dispatch = useDispatch();

    const handleLogoClick = () => {
        if (user) {
            navigate('/blogs');
        } else {
            navigate('/login');
        }
    };

    const onSubmit = async (data) => {
        const toastId = toast.loading("Logging in...");

        try {
            const res = await adminLogin(data).unwrap();
            dispatch(setUser({ user: res?.data }));
            if (res?.success === true) {
                toast.success("Login successfully", {
                    id: toastId,
                    duration: 2000,
                });
                navigate("/blogs");
            }
        } catch (error) {
            toast.error("Failed to login", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            padding={2}
        >
            <Card sx={{ width: {lg: 450, md: 450}, boxShadow: 3, padding: 3, }}>
                <CardContent>
                    <Link
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer', textDecoration: "none", display: 'flex', justifyContent: 'center' }}
                    >
                        <Typography variant="h4" color="primary" gutterBottom>
                            Portfolio Dashboard
                        </Typography>
                    </Link>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Login
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        display="flex"
                        flexDirection="column"
                        gap={2}
                    >
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    required
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
