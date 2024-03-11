import {Avatar, Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {useLogin} from "../api/login";
import {useState, useRef, useContext} from "react";
import SnackNotification from "./SnackNotification";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {AuthContext, useAuth} from '../context/authContext';
const Login = () => {
    const mut = useLogin();
    const formRef = useRef(null);
    const [stackState, setStackState] = useState(false);
    const [stackMessage, setStackMessage] = useState('');
    const [variant, setVariant] = useState('success');
    const { isLoggedIn, accessToken, refreshToken, handleLogin } = useAuth(AuthContext);
    const history = useNavigate();
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(6, 'Password should be of minimum 6 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema ,
        onSubmit: async (values) => {

            try {
                const response = await mut.mutateAsync({email: values.email, password: values.password});
                const { accessToken, refreshToken } = response;
                handleLogin(accessToken, refreshToken);
                history('/')

            } catch (e) {
                setStackState(true);
                setStackMessage(e.message);
                setVariant('error');
            }
        },
    });
    return (
        <>
            <Container sx={{
                display: 'grid',
                placeItems: 'center',
                width: '100%',
                height: '100%',
                minHeight: 'calc(100vh - 125px)'
            }}>
                <Grid container lg={6} xs={12} md={6}>
                    <Box component={'section'} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: '16px',
                        justifyContent: 'center',
                        marginBottom: '32px'
                    }}>
                        <Avatar alt={'tamatem'}
                                src={'/images/logo.png'}
                                sx={{
                                    width: '60px',
                                    height: '60px',

                                }}
                        />
                        <Typography sx={{
                            color: '#171958',
                            fontSize: '22px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                        }}>
                            tamatem plus
                        </Typography>
                    </Box>
                    <Paper sx={{
                        width: '100%',
                        boxShadow: '0',
                        border: '1px solid #CBCCDA',
                        minHeight: '450px',
                        borderRadius: '18px'
                    }}>
                        <Box sx={{
                            maxWidth: '70%',
                            margin: '0 auto',
                            height: '100%',
                            paddingTop: '45px',
                            paddingBottom: '45px',
                            '@media(max-width: 600px)': {
                                maxWidth: 'unset',
                                width: '100%',
                                padding: '30px 20px'
                            }

                        }}>
                            <Typography sx={{
                                color: '#000430',
                                textAlign: 'center',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '24px',
                                marginBottom: '26px'
                            }}>
                                Login
                            </Typography>
                            <Box onSubmit={formik.handleSubmit}
                                 ref={formRef}
                                 component="form" sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <TextField
                                    name="email"
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        minHeight: '60px',
                                        borderRadius: '10px',
                                        height: 'fit-content'
                                    }}
                                    required
                                    input={{style: {textTransform: 'lowercase'}}}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    name="password"
                                    id="password"
                                    label="Password"
                                    type={'password'}
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        minHeight: '60px',
                                        borderRadius: '10px',
                                        marginTop: '16px',
                                        height: 'fit-content'
                                    }}
                                    input={{style: {textTransform: 'lowercase'}}}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    required
                                />
                                <Typography
                                    sx={{
                                        marginTop: '28px',
                                        textDecoration: 'underline',
                                        fontSize: '14px',
                                        color: '#576171',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Forgot your Password?
                                </Typography>
                                <Button
                                    sx={{
                                        marginTop: '36px',
                                        backgroundColor: '#00805A',
                                        boxShadow: '0px 3px 12px #00805A79',
                                        borderRadius: '10px',
                                        color: '#fff',
                                        height: '60px',
                                        width: '100%',
                                        '&:hover': {
                                            backgroundColor: 'var(--tm-primary-darken)'
                                        },
                                        transition: 'background-color 0.3s var(--tm-timing-function)'
                                    }}
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    <SnackNotification open={stackState}
                                       message={stackMessage} variant={variant}
                                       onClose={() => setStackState(false)}
                    />
                </Grid>
            </Container>
        </>
    );
}

export default Login;
