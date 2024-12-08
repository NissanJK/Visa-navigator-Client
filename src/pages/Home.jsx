import React from "react";
import Banner from "../components/Banner";
import ExtraSectionOne from "../components/ExtraSectionOne";
import ExtraSectionTwo from "../components/ExtraSectionTwo";
import LatestVisas from "../components/LatestVisas";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestVisas></LatestVisas>
      <ExtraSectionOne></ExtraSectionOne>
      <ExtraSectionTwo></ExtraSectionTwo>
    </div>
  );
};

export default Home;
