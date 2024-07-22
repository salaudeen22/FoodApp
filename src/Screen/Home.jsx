import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import Card from "../Components/Card.jsx";
import Cousrl from "../Components/Cousrl.jsx";
export default function Home() {
    const [search, setseaarch] = useState("");
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
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <form className="form-inline d-flex ">
            <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setseaarch(e.target.value)}
                />
              {/* <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button> */}
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbXgfbcYmzx2Hjs_B44qMQrJA-H_AbjFlX-A&s"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFb-QOETAw_2smnhPtCqsh8A1KTeBnpYEBTQ&s"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
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
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
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
