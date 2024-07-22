import React from 'react';
import ReactDOM from 'react-dom';

const Modelstyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: 'translate(-50%, -50%)',
  zIndex: "1000",
  height: "90%",
  width: "90%",
  backgroundColor: 'white',
};

const overlaystyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: "999",  // Increased zIndex to ensure overlay is behind the modal
  width: "100%",
};

function Model({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={overlaystyle}></div>
      <div style={Modelstyle}>
        <button className='btn btn-danger fs-4' style={{ position: "absolute", top: "10px", right: "10px" }} onClick={onClose}>X</button>
        <div className="container mt-5">
        {children}
        </div>
      </div>
    </>,
    document.getElementById('portal-root')
  );
}

export default Model;
