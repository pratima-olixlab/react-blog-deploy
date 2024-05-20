// import React, {useState} from "react"
// import "./create.css"
// import axios from "axios";
// export const Create = () => {

//   const [cover, setCover] = useState(null);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(false);
//     try {
//         const formData = new FormData();
//         formData.append("cover", cover); 
//         formData.append("title", title);
//         formData.append("category", category);
//         formData.append("description", description); // Add this line
//         formData.append("date", date); // Add this line

//         const res = await axios.post("http://localhost:5000/users/blog", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data"
//             }
//         });
//         res.data && window.location.replace("/home");
//     } catch (err) {
//         setError(true);
//     }
// };

//   const handleFileChange = (e) => {
//     setCover(e.target.files[0]);
//   };
  
//   return (
//     <>
//       <section className='newPost'>
//         <div className='container boxItems'>
//           <form onSubmit={handleSubmit}>
//       <div className='inputfile flexCenter'>
//         <input type='file' accept='image/*' alt='img' onChange={handleFileChange} />
//         {cover && <img src={URL.createObjectURL(cover)} alt='cover' className='image-preview' />}
//       </div>
//             <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
//             <input type='text' placeholder='Category' onChange={(e) => setCategory(e.target.value)} />
//             <input type='date' placeholder='Date' onChange={(e) => setDate(e.target.value)} />
//             <textarea
//               name='Description'
//               id='description'
//               cols='30'
//               rows='10'
//               placeholder='Description'
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>

//             <button className='button'>Create Post</button>
//           </form>
//         </div>
//       </section>
//     </>
//   )
// }


// import React, { useState } from "react";
// import "./create.css";
// import axios from "axios";

// export const Create = () => {
//   const [cover, setCover] = useState(null);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(false);
//     try {
//       const formData = new FormData();
//       formData.append("cover", cover);
//       formData.append("title", title);
//       formData.append("category", category);
//       formData.append("description", description);
//       formData.append("date", date);

//       const res = await axios.post("http://localhost:5000/users/blog", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       res.data && window.location.replace("/home");
//     } catch (err) {
//       setError(true);
//     }
//   };

//   const handleFileChange = (e) => {
//     setCover(e.target.files[0]);
//   };

//   return (
//     <>
//       <section className="newPost">
//         <div className="container boxItems">
//           <form onSubmit={handleSubmit}>
//             <div className="coverContainer">
//               <label className="coverLabel">
//                 <input type="file" accept="image/*" alt="img" onChange={handleFileChange} />
//               </label>
//               {cover && <img src={URL.createObjectURL(cover)} alt="cover" className="image-preview" />}
//             </div>
//             <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
//             <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
//             <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
//             <textarea
//               name="Description"
//               id="description"
//               cols="30"
//               rows="10"
//               placeholder="Description"
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>

//             <button className="button">Create Post</button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// };










import React, { useState, useEffect } from "react";
import "./create.css";
import axios from "axios";

export const Create = () => {
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/users/category`);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const formData = new FormData();
      formData.append("cover", cover);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("date", date);

      const res = await axios.post(`${window.location.origin}/users/blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      res.data && window.location.replace("/pages");
    } catch (err) {
      setError(true);
    }
  };

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="newPost">
        <div className="container boxItems">
          <form onSubmit={handleSubmit}>
            <div className="coverContainer">
              <label className="coverLabel">
                <input type="file" accept="image/*" alt="img" onChange={handleFileChange} />
              </label>
              {cover && <img src={URL.createObjectURL(cover)} alt="cover" className="image-preview" />}
            </div>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
            <textarea
              name="Description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button className="button">Create Post</button>
          </form>
        </div>
      </section>
    </>
  );
};
