import { useContext, useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import SelectCategory from "./components/SelectCategory";
import { ProfileContext } from "./Routes";
import Card from "./components/Card";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { profile } = useContext(ProfileContext);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}api/v1/blogs/get-blogs?title=${search}&category=${selectedCategory}`
      );
      // console.log(response)
      if (response.status !== 200) return alert("Something went wrong!");
      setData(response.data.data);
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}api/v1/category/get-categories`
      );
      // console.log(response)
      if (response.status !== 200) return alert("Something went wrong!");
      setCategoryData(response.data.data);
    } catch (error) {
      // console.log(error);
      error.response && alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const handleDelete = (id) => {
    axios({
      method: "post",
      url: `${import.meta.env.VITE_URL}api/v1/blogs/delete-blog`,
      data: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    })
      .then((res) => {
        if (res.data) alert(res.data.message);
        fetchData();
      })
      .catch((err) => {
        err.message && alert(err.message);
      });
  };

  return (
    <>
      <div className="main">
        <Input
          value={search}
          handleChange={handleChange}
          label={"Search"}
          name={"search"}
        />
        <SelectCategory
          label={"Categories"}
          value={selectedCategory}
          handleSelect={(doc) => setSelectedCategory(doc.categoryName)}
          data={categoryData}
        />
      </div>
      <div className="blogs">
        <div className="head">
          <h2>Blogs</h2>
          {profile.role && profile.role === "Admin" && (
            <Link
              to="/blog-form"
              state={{ label: "create", categoryData: categoryData }}
            >
              <button className="alt-btn">{"Add New Blog"}</button>
            </Link>
          )}
        </div>
        <div className="body">
          {data?.map((doc) => (
            <Card
              key={doc._id}
              value={doc}
              categoryData={categoryData}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
