import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import Card from "../Components/Card.jsx";
import Cousrl from "../Components/Cousrl.jsx";
export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data) && data.length === 2) {
        setfoodItem(data[0] || []);
        setfoodCat(data[1] || []);
      } else {
        console.error("Unexpected data format:", data);
        setfoodItem([]);
        setfoodCat([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Cousrl></Cousrl>
      </div>

      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div>
                <div className="fs-3 m-3">{data.CategoryName}</div>
              </div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter((item) => item.CategoryName === data.CategoryName)
                  .map((filteritem) => (
                    <div
                      key={filteritem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodName={filteritem.name}
                        options={filteritem.options}
                        imgSrc={filteritem.img}
                      />
                    </div>
                  ))
              ) : (
                <div key="noDataFound">"no such data found"</div>
              )}
            </div>
          ))
        ) : (
          <div key="noResponse">no response</div>
        )}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
