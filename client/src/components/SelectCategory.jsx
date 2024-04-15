import React, { useEffect, useRef, useState } from "react";
// import "./SelectInput.scss";
// import arrowDown from "../../../assets/arrowDown.svg";

function useOutsideAlerter(ref, setDropdown) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const SelectCategory = ({
  error,
  label,
  handleSelect,
  data,
  disabled = false,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [close, setClose] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setDropdown);

  useEffect(() => {
    if (close) {
      setDropdown(false);
      setClose(false);
    }
  }, [close]);

  return (
    <>
      <div
        className={`selectDropdown`}
        ref={wrapperRef}
        onClick={() => {
          if (!disabled) setDropdown(true);
        }}
      >
        <label>{label}</label>
        {/* <img src={arrowDown} alt="arrow-down" /> */}
        <div
          className={`dropdown ${dropdown && data?.length > 0 ? "active" : ""}`}
        >
          {data?.map((doc) => (
            <p
              key={doc._id}
              onClick={() => {
                setClose(true);
                handleSelect(doc);
              }}
            >
              {doc.categoryName}
            </p>
          ))}
        </div>
      </div>
      {error && error !== "" ? (
        <p className="selectDropdown-error-text">{error}</p>
      ) : null}
    </>
  );
};

export default SelectCategory;
