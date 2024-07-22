import React from "react";

function Card(props) {
  let Options = props.options[0] || {};
  let priceOption = Object.keys(Options);
  return (
    <div className="card mt-3" style={{ maxWidth: "18rem" }}>
      <img className="card-img-top" src={props.imgSrc} height={"200px"} />
      <div className="card-body">
        <h5 className="card-title">{props.foodName}</h5>
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
            {priceOption.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="d-inline h-100 ">Total price:</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
