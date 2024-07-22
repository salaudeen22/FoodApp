import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import Swal from 'sweetalert2'

export default function Card(props) {
  let Options = props.options[0] || {};
  let priceOption = Object.keys(Options);
  let prizref = useRef();

  let dispatch = useDispatchCart();
  let data = useCart();
  let FoodItem = props.foodItem;
  const [quty, setquty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddtoCart = async () => {
    let food = [];

    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length > 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: FoodItem._id,
          prize: finalprize,
          qty: quty,
        });
        return;
      
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: FoodItem._id,
          name: FoodItem.name,
          img: FoodItem.img,
          price: finalprize,
          size: size,
          qty: quty,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: FoodItem._id,
      name: FoodItem.name,
      img: FoodItem.img,
      price: finalprize,
      size: size,
      qty: quty,
    });
    Swal.fire({
        title: "Added Suceessfully!",
     
        icon: "success"
      });

  };
  useEffect(() => {
    if (prizref.current) {
      setSize(prizref.current.value);
    }
  }, [prizref.current?.value]);

  let finalprize = quty * parseInt(Options[size], 10);

  return (
    <div className="card mt-3" style={{ maxWidth: "18rem" }}>
      <img
        className="card-img-top"
        src={FoodItem.img}
        height={"200px"}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{FoodItem.name}</h5>
        <p className="card-text">lorem</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setquty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
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
        </div>
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
  );
}
