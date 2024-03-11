import {CardActionArea, CardMedia, Container, Paper} from "@mui/material";
import {Typography} from '@mui/material';
import {Button, Card, CardContent, Grid} from "@mui/material";
import '../styles/products.css';
import {useItems} from "../api/itemsAPI";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";




const Products = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const { data, isLoading, error } = useItems(page, perPage);
    if (isLoading) return <div>Fetching posts...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    return (
        <>
            <Container>
                <Typography variant="h5" fontSize="xl" sx={{ mb: 0.5, fontFamily: 'Inter, sans-serif',
                    fontWeight: 600 }}>
                    Products Page
                </Typography>
                <div className={'products'}>
                    <Grid container spacing={2}>
                        {data?.items?.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                                <Card sx={{ borderRadius: 4, boxShadow: '0px 3px 6px #00000029'}}>
                                        <Link to={`/products/${item.id}`}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="210"
                                                    image={(item?.media?.path)? `${process.env.REACT_APP_BACKEND_URL}/${item.media.path}` : `https://picsum.photos/1000/1000?random=${item.id}`}
                                                    alt="green iguana"
                                                />
                                            </CardActionArea>
                                        </Link>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                component="p"
                                                align="center"
                                                sx={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontWeight: 600,
                                                    marginBottom: 2
                                                }}
                                            >
                                                {item?.item_name}
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
                                                    padding: '18px 16px 14px',
                                                    borderRadius: 32,
                                                    fontSize: '1rem',
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontWeight: 500,
                                                    lineHeight: '16px'
                                                }}
                                                href={`/products/${item.id}`}
                                            >
                                                ${item?.item_price}
                                            </Button>
                                        </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>

        </>
    );
}

export default Products;
