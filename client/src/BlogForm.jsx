import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Input from "./components/Input";
import FileBase from "react-file-base64";
import SelectCategory from "./components/SelectCategory";
import axios from "axios";
import { ProfileContext } from "./Routes";

const initialValues = {
  title: "",
  content: "",
  category: "",
  tags: [],
  image: "",
};

const BlogForm = () => {
  const location = useLocation();
  const { profile } = useContext(ProfileContext);

  const [blogData, setBlogData] = useState(
    location?.state?.blog ? location.state.blog : initialValues
  );
  const label = location?.state?.label ? location.state.label : "create";

  const categoryData = location?.state?.categoryData
    ? location.state.categoryData
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = label === "create" ? {...blogData, image:}
    axios({
      method: "post",
      url: `http://localhost:5172/api/v1/blogs/${
        label === "create" ? "create-blog" : "update-blog"
      }`,
      data: blogData,
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    })
      .then((res) => {
        if (res.data) {
          alert(res.data.message)
          window.location.href = "/";
        }
      })
      .catch((err) => {
        err.message && alert(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{label === "create" ? "Create New Blog" : "Update Blog"}</h2>
      <Input
        value={blogData.title}
        handleChange={(e) =>
          setBlogData({ ...blogData, title: e.target.value })
        }
        name="title"
        label={"Title"}
      />
      <Input
        value={blogData.content}
        handleChange={(e) =>
          setBlogData({ ...blogData, content: e.target.value })
        }
        name="content"
        label={"Content"}
      />
      <SelectCategory
        label={"Category"}
        value={blogData.category}
        handleChange={(doc) =>
          setBlogData({ ...blogData, category: doc.categoryName })
        }
        data={categoryData}
      />
      <Input
        value={blogData.tags}
        handleChange={(e) =>
          setBlogData({ ...blogData, tags: e.target.value.split(",") })
        }
        name="tags"
        label={"Tags"}
      />
      <div className="file">
        <FileBase
          type="file"
          multiple={false}
          onDone={(base64) =>
            setBlogData({
              ...blogData,
              image: base64.base64,
            })
          }
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default BlogForm;
