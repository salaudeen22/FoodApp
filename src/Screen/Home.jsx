import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import Card from "../Components/Card.jsx";
import Cousrl from "../Components/Cousrl.jsx";
export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Cousrl></Cousrl>
      </div>

      <div className="m-5">
       <Card/>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
      </div>
      <div>
       <Footer></Footer>
      </div>
    </div>
  );
}