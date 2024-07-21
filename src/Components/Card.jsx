import React from "react";

function Card() {
  return (
    <div className="card mt-3" style={{ maxWidth: "18rem" }}>
      <img
        className="card-img-top"
        src="https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=x_0,y_0,h_720,w_1280,c_fill/w_800"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">lorem</p>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success rounded">
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select className="m-2 h-100 bg-success rounded">
            <option value="half">Half</option>
            <option value="full">full</option>
          </select>
          <div className="d-inline h-100 ">Total price:</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
