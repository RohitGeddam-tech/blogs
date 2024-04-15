import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "./Routes";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { profile } = useContext(ProfileContext);
  const location = useLocation();

  const [comment, setComment] = useState("");

  const [blogDetail, setBlogDetail] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:5172/api/v1/blogs/get-blogs:${location.state.id}`,
      });
      // console.log(response)
      if (response.status !== 200) return alert("Something went wrong!");
      setBlogDetail(response.data.data);
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  useEffect(() => {
    if (location.state.id && !blogDetail._id) {
      fetchData();
    }
  }, [location, blogDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = label === "create" ? {...blogData, image:}
    axios({
      method: "post",
      url: `http://localhost:5172/api/v1/blogs/add-comment`,
      data: {
        comment: comment,
        author: profile._id,
        blog: blogDetail._id,
      },
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    })
      .then((res) => {
        if (res.data) {
          alert(res.data.message);
          fetchData();
        }
      })
      .catch((err) => {
        err.message && alert(err.message);
      });
  };

  return (
    <div className="detail">
      <div className="flexbox">
        <img src={blogDetail.image} alt={blogDetail.title} />
        <div className="right">
          <h2>{blogDetail.title}</h2>
          <h3>{blogDetail.author?.name}</h3>
          <p>{blogDetail.content}</p>
        </div>
      </div>
      <div className="comments">
        {blogDetail.comments?.length > 0 && <h3>Comments</h3>}
        {blogDetail.comments?.length > 0 &&
          blogDetail.comments?.map((doc) => (
            <div className="comment">
              <p>{doc.comment}</p>
              <p>Author - {doc.author.name}</p>
            </div>
          ))}
        {blogDetail.title && (
          <>
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              cols="30"
              rows="10"
            />
            <button onClick={handleSubmit}>Add new comment</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
