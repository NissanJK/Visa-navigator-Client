import React from "react";
import Banner from "../components/Banner";
import ExtraSectionOne from "../components/ExtraSectionOne";
import ExtraSectionTwo from "../components/ExtraSectionTwo";
import LatestVisas from "../components/LatestVisas";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Visa Navigator | Home</title>
            </Helmet>
            <Banner></Banner>
            <LatestVisas></LatestVisas>
            <ExtraSectionOne></ExtraSectionOne>
            <ExtraSectionTwo></ExtraSectionTwo>
        </div>
    );
};

export default Home;
