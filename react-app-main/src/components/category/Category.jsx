import React, { useEffect, useState } from "react";
import "./category.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <MdNavigateNext className='icon' />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <GrFormPrevious className='icon' />
      </button>
    </div>
  );
};

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/users/category`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  // Adjust settings for Slider
  const settings = {
    dots: false,
    infinite: categories.length > 1, // Set infinite to false if only one category
    speed: 500,
    slidesToShow: categories.length > 1 ? 3 : 1, // Show one slide if only one category
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <section className='category'>
      <div className='content'>
        <Slider {...settings}>
          {categories.map((category) => (
            <div className='boxs' key={category._id}>
              <div className='box'>
                <img src={`${window.location.origin}/${category.cover}`} alt='cover' />
                <div className='overlay'>
                  <h4>{category.category}</h4>
                  <p>{category.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
