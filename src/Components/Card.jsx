import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

function Card(props) {
  let Options = props.options[0] || {};
  let priceOption = Object.keys(Options);
  let prizref = useRef();

  let dispatch = useDispatchCart();
  let data = useCart();
  let FoodItem = props.foodItem;
  const [quty, setquty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddtoCart = async () => {
    await dispatch({
      type: "ADD",
      id: FoodItem._id,
      name: FoodItem.name,
      img: FoodItem.img,
      price: finalprize,
      size: size,
      qty: quty,
    });
    console.log(data);
  };
  useEffect(() => {
    if (prizref.current) {
      setSize(prizref.current.value);
    }
  }, [prizref.current?.value]);

  let finalprize = quty * parseInt(Options[size], 10);
  return (
    <div className="card mt-3" style={{ maxWidth: "18rem" }}>
      <img className="card-img-top" src={props.imgSrc} height={"200px"} />
      <div className="card-body">
        <h5 className="card-title">{props.foodName}</h5>
        <p className="card-text">lorem</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setquty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            ref={prizref}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOption.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="d-inline h-100">{finalprize}/-</div>

          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddtoCart}
          >
            {" "}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
