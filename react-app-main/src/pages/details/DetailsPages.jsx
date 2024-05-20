// import React, { useState, useEffect } from "react";
// import "./details.css";
// import { BsPencilSquare } from "react-icons/bs";
// import { AiOutlineDelete } from "react-icons/ai";
// import axios from "axios";
// import { useParams, useHistory } from "react-router-dom";
// import Popup from "reactjs-popup";

// export const DetailsPages = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [cover, setCover] = useState('');
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [comments, setComments] = useState(null);

//   const history = useHistory();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/blog/${id}`);
//         setBlog(response.data);
//         setTitle(response.data.title);
//         setCategory(response.data.category);
//         setCover(response.data.cover);
//         setDate(response.data.date);
//         setDescription(response.data.description);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//         setError("Failed to fetch blog.");
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:5000/users/blog/${id}`);
//         history.push("/"); // Redirect to home or blog list after deletion
//       } catch (error) {
//         console.error("Error deleting blog:", error);
//       }
//     }
//   };

//   const editBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('category', category);
//       formData.append('description', description);
//       formData.append('date', date);
//       if (cover) {
//         formData.append('cover', cover);
//       }

//       const response = await axios.put(`http://localhost:5000/users/blog/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response.status === 200) {
//         setBlog(response.data.updatedBlog); // Update with the updated blog data from the backend
//       } else {
//         throw new Error("Failed to update blog.");
//       }
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       alert("Failed to update blog. Please try again.");
//     }
//   };


//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error}</div>
//       ) : blog ? (
//         <section className='singlePage'>
//           <div className='container'>
//             <div className='left'>
//               <img src={`http://localhost:5000/${blog.cover}`} alt='' />
//             </div>
//             <div className='right'>
//               <div className='buttons'>
//                 <Popup
//                   trigger={<button className='button'><BsPencilSquare /></button>}
//                   modal
//                   nested
//                 >
//                   {(close) => (
//                     <div className="modal">
//                       <button className="close" onClick={close}>&times;</button>
//                       <div className="header"> Edit Blog </div>
//                       <div className="content">
//                         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//                         <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
//                         <input type="file" onChange={(e) => setCover(e.target.files[0])} />
//                         <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
//                         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//                       </div>
//                       <div className="actions">
//                         <button className="button" onClick={() => { editBlog(); close(); }}>Save</button>
//                       </div>
//                     </div>
//                   )}
//                 </Popup>

//                 <button className='button' onClick={handleDelete}>
//                   <AiOutlineDelete />
//                 </button>
//               </div>
//               <h1>{blog.title}</h1>
//               <a href='/'>#{blog.category}</a>

//               <p>{blog.description}</p>
//               <p>Author: Pratima</p>
//             </div>
//             <textarea
//               name="Description"
//               id="description"
//               cols="30"
//               rows="10"
//               placeholder="Comments"
//               value={comments}
//               onChange={(e) => setComments(e.target.value)}
//             ></textarea>
//           </div>
//         </section>
//       ) : (
//         <div>No data available</div>
//       )}
//     </>
//   );
// };






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from "react";
// import "./details.css";
// import { BsPencilSquare } from "react-icons/bs";
// import { AiOutlineDelete } from "react-icons/ai";
// import axios from "axios";
// import { useParams, useHistory } from "react-router-dom";
// import Popup from "reactjs-popup";

// export const DetailsPages = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [cover, setCover] = useState("");
//   const [date, setDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const history = useHistory();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/blog/${id}`);
//         setBlog(response.data);
//         setTitle(response.data.title);
//         setCategory(response.data.category);
//         setCover(response.data.cover);
//         setDate(response.data.date);
//         setDescription(response.data.description);
//         setComments(response.data.comments);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//         setError("Failed to fetch blog.");
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:5000/users/blog/${id}`);
//         history.push("/"); // Redirect to home or blog list after deletion
//       } catch (error) {
//         console.error("Error deleting blog:", error);
//       }
//     }
//   };

//   const editBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("category", category);
//       formData.append("description", description);
//       formData.append("date", date);
//       if (cover) {
//         formData.append("cover", cover);
//       }

//       const response = await axios.put(`http://localhost:5000/users/blog/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.status === 200) {
//         setBlog(response.data.updatedBlog); // Update with the updated blog data from the backend
//       } else {
//         throw new Error("Failed to update blog.");
//       }
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       alert("Failed to update blog. Please try again.");
//     }
//   };

//   const handleCommentSubmit = async () => {
//     try {
//       const response = await axios.post(`http://localhost:5000/users/blog/${id}/comment`, {
//         text: commentText
//       });
//       console.log('Comment added successfully:', response.data);
//       // Reset comment text after successful submission
//       setCommentText('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   };
  

//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error}</div>
//       ) : blog ? (
//         <section className="singlePage">
//           <div className="container">
//             <div className="left">
//               <img src={`http://localhost:5000/${blog.cover}`} alt="" />
//             </div>
//             <div className="right">
//               <div className="buttons">
//                 <Popup trigger={<button className="button"><BsPencilSquare /></button>} modal nested>
//                   {(close) => (
//                     <div className="modal">
//                       <button className="close" onClick={close}>&times;</button>
//                       <div className="header"> Edit Blog </div>
//                       <div className="content">
//                         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//                         <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
//                         <input type="file" onChange={(e) => setCover(e.target.files[0])} />
//                         <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
//                         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//                       </div>
//                       <div className="actions">
//                         <button className="button" onClick={() => { editBlog(); close(); }}>Save</button>
//                       </div>
//                     </div>
//                   )}
//                 </Popup>

//                 <button className="button" onClick={handleDelete}>
//                   <AiOutlineDelete />
//                 </button>
//               </div>
//               <h1>{blog.title}</h1>
//               <a href="/">#{blog.category}</a>

//               <p>{blog.description}</p>
//               <p>Author: Pratima</p>
//             </div>
//             <div className="comments-section">
//               <h2>Comments</h2>
//               {comments && comments.map((comment) => (
//                 <div key={comment._id} className="comment">
//                   <p>{comment.text}</p>
//                   <p>Commented by: {comment.user}</p>
//                 </div>
//               ))}

//               <textarea
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="Add a comment..."
//               ></textarea>
//               <button className="button" onClick={handleCommentSubmit}>Add Comment</button>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <div>No data available</div>
//       )}
//     </>
//   );
// };


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from "react";
import "./details.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

export const DetailsPages = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/users/blog/${id}`);
        setBlog(response.data);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setCover(response.data.cover);
        setDate(response.data.date);
        setDescription(response.data.description);
        setComments(response.data.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await axios.delete(`${window.location.origin}/users/blog/${id}`);
        history.push("/");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const editBlog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("date", date);
      if (cover) {
        formData.append("cover", cover);
      }

      const response = await axios.put(`${window.location.origin}/users/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setBlog(response.data.updatedBlog);
      } else {
        throw new Error("Failed to update blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${window.location.origin}/users/blog/${id}/comment`, {
        text: commentText
      });
      console.log('Comment added successfully:', response.data);
      // Reset comment text after successful submission
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const toggleCommentsVisibility = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : blog ? (
        <section className="singlePage">
          <div className="container">
            <div className="left">
              <img src={`${window.location.origin}/${blog.cover}`} alt="" />
            </div>
            <div className="right">
              <div className="buttons">
                <Popup trigger={<button className="button"><BsPencilSquare /></button>} modal nested>
                  {(close) => (
                    <div className="modal">
                      <button className="close" onClick={close}>&times;</button>
                      <div className="header"> Edit Blog </div>
                      <div className="content">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
                        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                      </div>
                      <div className="actions">
                        <button className="button" onClick={() => { editBlog(); close(); }}>Save</button>
                      </div>
                    </div>
                  )}
                </Popup>

                <button className="button" onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>{blog.title}</h1>
              <a href="/">#{blog.category}</a>

              <p>{blog.description}</p>
              <p>Author: Pratima</p>
            </div>
            <div className="comments-section">
              <div className="toggle-comments">
                <button className="button" onClick={toggleCommentsVisibility}>
                  {showComments ? "Hide Comments" : "Show Comments"}
                </button>
              </div>
              {showComments && (
                <>
                  <h2>Comments</h2>
                  {comments && comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <p>{comment.user} {comment.text}</p>
                    </div>
                  ))}
                </>
              )}
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button className="button" onClick={handleCommentSubmit}>Add Comment</button>
            </div>
          </div>
        </section>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};
