// components/Home.js
import React from 'react';
import {Grid, Typography} from "@mui/material";
import HomeHero from "./HomeHero";
import '../styles/homepage.css';
import HeroMarquee from "./HeroMarquee";
const Home = () => {

    return (
        <>
            <HomeHero />
            <HeroMarquee />
        </>
    )
}

export default Home;
