import React, { useEffect, useState } from "react";
import "./blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"
import axios from "axios";
import { RWebShare } from "react-web-share";
export const Card = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/users/category`);
        setCategories(response.data);
        setLoading(false);
        console.log('responseeeeecategory', response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {categories.map((item) => (
            <div className='box boxItems' key={item._id}>
              <div className='img'>
                <img src={`${window.location.origin}/${item.cover}`} alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <a href='/'>#{item.category}</a>
                </div>
                <Link to={`/c-details/${item._id}`} className='link'>
                  <h3>{item.title}</h3>
                </Link>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{item.date}</label>
                  {/* <AiOutlineComment className='icon' /> <label htmlFor=''>27</label> */}
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>
                    <RWebShare
                      data={{
                        text: "Web Share - GfG",
                        url: "http://localhost:3000",
                        title: "Share To",
                      }}
                      onClick={() =>
                        console.log("shared successfully!")
                      }
                    >
                      <button>Share on Web</button>
                    </RWebShare>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}