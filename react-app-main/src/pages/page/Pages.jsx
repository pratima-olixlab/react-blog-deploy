import React, { useEffect, useState } from "react";
import "../../components/blog/blog.css"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"
import axios from "axios";
import { RWebShare } from "react-web-share";

export const Pages = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/users/blog`);
        const blogsWithComments = await Promise.all(response.data.map(async (blog) => {
          const commentResponse = await axios.get(`${window.location.origin}/users/blog/${blog._id}/comments`);
          return { ...blog, comments: commentResponse.data };
        }));
        setBlogs(blogsWithComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {blogs.map((blog) => (
            <div className='box boxItems' key={blog._id}>
              <div className='img'>
                <img src={`${window.location.origin}/${blog.cover}`} alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <a href='/'>#{blog.category}</a>
                </div>
                <Link to={`/details/${blog._id}`} className='link'>
                  <h3>{blog.title}</h3>
                </Link>
                <p>{blog.description ? blog.description.slice(0, 180) + (blog.description.length > 180 ? "..." : "") : "No description available"}</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{blog.date}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>{blog.comments.length}</label>
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