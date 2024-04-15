import React, { useContext } from "react";
import { ProfileContext } from "../Routes";
import { Link } from "react-router-dom";

const Card = ({ value, categoryData, handleDelete }) => {
  const { profile } = useContext(ProfileContext);
  return (
    <div className="card">
      <img src={value.image} alt={value.title} />
      <h2>{value.title}</h2>
      <h3>{value.author?.name}</h3>
      <p>{value.content}</p>
      {profile.role && profile.role === "Admin" && (
        <div className="btns">
          <Link
            to="/blog-form"
            state={{
              label: "update",
              blog: value,
              categoryData: categoryData,
            }}
          >
            <button>{"update"}</button>
          </Link>
          <button onClick={() => handleDelete(value._id)}>delete</button>
        </div>
      )}
      <Link to="/blog-detail" state={{ id: value._id }}>
        <button>Know More</button>
      </Link>
    </div>
  );
};

export default Card;
