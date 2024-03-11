import {Container, Typography, Grid, Card,
    CardMedia, Box, Button, TextField,
    Modal
} from "@mui/material";
import {useItemEdit, useItemView} from "../api/itemsAPI";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/authContext";
import {useFormik} from "formik";
import {useQueryClient} from "react-query";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    boxShadow: 24,
    p: 4,
    border: 'none',
    borderRadius: '16px'
};

const ProductsView = () => {
    const {id} = useParams();
    const {isLoggedIn, accessToken} = useContext(AuthContext);
    const {data, isLoading, error ,refetch} = useItemView(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialValuesSet, setInitialValuesSet] = useState(false);
    const itemEditMut = useItemEdit();
    const queryClient = useQueryClient()


    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleEditClick = (itemId) => {
        setIsModalOpen(true)
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: ''
        },
        onSubmit: async (values) => {
            try {
              const response = await itemEditMut.mutateAsync({
                  id: id,
                  item_name: values.name,
                  item_description: values.description,
                  item_price: values.price,
                  authorization: accessToken
              });
                setIsModalOpen(false)
                await refetch();
            } catch (e) {
                console.log(e, 'e');
            }
        },
    });


    useEffect(() => {
        if (isModalOpen && !initialValuesSet) {
            formik.setValues({
                name: data?.item_name || '',
                description: data?.item_description || '',
                price: data?.item_price || '',
            });
            setInitialValuesSet(true);
        }
    }, [isModalOpen]);

    if (isLoading) return <div>Fetching items...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    return (
        <>
            <Container>
                <Grid xs={12} sx={{
                    paddingBottom: '50px'
                }}>
                    <Typography
                        sx={{
                            color: '#000430',
                            fontSize: '24px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            marginBottom: '27px'
                        }}
                    >
                        Products Details
                    </Typography>
                    <Card sx={{
                        display: 'flex',
                        width: '100%',
                        minHeight: '680px',
                        borderRadius: '16px',
                        boxShadow: '0px 3px 6px #00000029',
                        '@media (max-width: 726px)': {
                            display: 'block',
                            minHeight: 'unset'
                        }
                    }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: '45%',
                                borderRadius: 'inherit',
                                '@media (max-width: 726px)': {
                                    height: '300px',
                                    width: '100%',
                                    borderBottomRightRadius: '0px',
                                    borderBottomLeftRadius: '0px',
                                }
                            }}
                            image={(data?.media?.path)? `${process.env.REACT_APP_BACKEND_URL}/${data?.media?.path}` : `https://picsum.photos/1000/1000?random=${data?.id}`}
                            alt="Live from space album cover"
                        />
                        <Box sx={{
                            padding: '50px 45px 60px 67px',
                            width: '100%',
                            position: 'relative',
                            '@media (max-width: 726px)': {
                                padding: '30px 20px',
                            }
                        }}>
                            <Box sx={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: '#171958',
                                            fontSize: '24px',
                                            marginBottom: '24px',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {data?.item_name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#171958',
                                            fontSize: '18px',
                                            marginBottom: '57px',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            maxWidth: '75%',
                                            lineHeight: '30px',
                                            '@media (max-width: 726px)': {
                                                maxWidth: 'unset',
                                                fontSize: '16px',
                                                fontWeight: 500,
                                            }
                                        }}
                                    >
                                        {data?.item_description}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: '#171958',
                                            fontSize: '18px',
                                            marginBottom: '50px',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Price ${data?.item_price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            backgroundColor: '#00805A',
                                            '&:hover': {
                                                backgroundColor: '#006043'
                                            },
                                            color: 'white',
                                            width: '100%',
                                            padding: '24px 36px 27px',
                                            borderRadius: 32,
                                            fontSize: '26px',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 500,
                                            lineHeight: '16px'
                                        }}
                                    >
                                        CTA
                                    </Button>
                                </Box>
                            </Box>
                            {
                                    isLoggedIn && <Typography
                                        variant="h4"
                                        style={{
                                            position: 'absolute',
                                            top: 20,
                                            right: 20,
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: '#878787',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 500,
                                        }}
                                        onClick={() => handleEditClick(data?.id)}
                                    >
                                        Edit
                                    </Typography>
                            }

                        </Box>
                    </Card>
                </Grid>
                <div>
                    <Button onClick={handleOpen}>Open modal</Button>
                    <Modal
                        open={isModalOpen}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <Typography id="modal-modal-title"
                                            variant="h5"
                                            component="h2"
                                            sx={{
                                                color: '#171958',
                                                marginBottom: '32px',
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 600,
                                            }}
                                >
                                    Edit {data?.item_name}
                                </Typography>
                                <TextField
                                    name="name"
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        minHeight: '60px',
                                        borderRadius: '10px',
                                        height: 'fit-content'
                                    }}
                                    input={{style: {textTransform: 'lowercase'}}}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    name="description"
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        minHeight: '60px',
                                        borderRadius: '10px',
                                        height: 'fit-content',
                                        marginTop: '16px'
                                    }}
                                    input={{style: {textTransform: 'lowercase'}}}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <TextField
                                    name="price"
                                    id="price"
                                    label="Price"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        minHeight: '60px',
                                        borderRadius: '10px',
                                        height: 'fit-content',
                                        marginTop: '16px'
                                    }}
                                    input={{style: {textTransform: 'lowercase'}}}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                                <Button
                                    variant="contained"
                                    type={'submit'}
                                    sx={{
                                        width: '100%',
                                        borderRadius: '120px',
                                        height: '60px',
                                        backgroundColor: '#00805A',
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 600,
                                        fontSize: '16x',
                                        marginTop: '32px',
                                        '&:hover': {
                                            backgroundColor: '#006043'
                                        },
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </div>
            </Container>
        </>
    );
}

export default ProductsView;
