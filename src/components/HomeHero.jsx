import {Button, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {useItems} from "../api/itemsAPI";
import {Link} from "react-router-dom";

const HomeHero = () => {
    const animationStyles = {
        animation: 'badgeColorCycle 12s alternate infinite',
    };
    return (
        <>
            <Container sx={{
                paddingTop: '80px',
                '@media (max-width: 600px)': {
                    paddingTop: '30px'
                },
            }}>
                <Grid
                >
                    <Grid item xs={12} style={{ textAlign: 'center' }}
                        sx={{display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Grid xs={6} >
                            <Typography sx={{ margin: '0px 35px 25px',fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                color: '#0d0c22',
                                '@media (max-width: 600px)': {
                                    fontSize: '3rem',
                                },
                            }} variant={'h1'}
                            >
                                The world’s best destination for Products
                            </Typography>
                            <Typography variant="subtitle1" sx={{fontSize: '22px', lineHeight: '36px',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                '@media (max-width: 600px)': {
                                    fontSize: '1rem',
                                    lineHeight: 'normal'
                                },
                            }}
                            >
                                Get connected by the products of thousands of top-rated
                                sellers & agencies around the world.
                            </Typography>
                            <Link to={'/products'}>
                                <Button variant="contained"
                                        style={animationStyles}
                                        sx={{width: 'fit-content', color: '#fff', fontFamily: 'Inter, sans-serif',
                                            fontWeight: 600,
                                            padding: '10px 16px',
                                            borderRadius: 32,
                                            textTransform: 'capitalize',
                                            fontSize: '14px',
                                            marginTop: '32px'
                                        }}
                                >
                                    Over 3 thousands Products!
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default HomeHero;
