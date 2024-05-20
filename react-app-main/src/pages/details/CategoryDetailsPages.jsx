import React, { useState, useEffect } from "react";
import "./details.css";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";

export const CategoryDetailsPages = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [cover, setCover] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${window.location.origin}/users/category/${id}`);
                setCategory(response.data);
                setTitle(response.data.title);
                setCategories(response.data.category);
                setCover(response.data.cover);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching category:", error);
                setError("Failed to fetch category.");
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await axios.delete(`${window.location.origin}/users/category/${id}`);
                history.push("/");
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const editCategory = async () => {
        try {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("category", categories);
          if (cover) {
            formData.append("cover", cover);
          }
          const response = await axios.put(`${window.location.origin}/users/category/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            setCategory(response.data.updatedCategory);
          } else {
            throw new Error("Failed to update category.");
          }
        } catch (error) {
          console.error("Error updating category:", error);
          alert("Failed to update category. Please try again.");
        }
      };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : category ? (
                <section className='singlePage'>
                    <div className='container'>
                        <div className='left'>
                            <img src={`${window.location.origin}/${category.cover}`} alt='' />
                        </div>
                        <div className='right'>
                            <div className='buttons'>
                                <Popup trigger={<button className="button"><BsPencilSquare /></button>} modal nested>
                                    {(close) => (
                                        <div className="modal">
                                            <button className="close" onClick={close}>&times;</button>
                                            <div className="header"> Edit Category </div>
                                            <div className="content">
                                                <input type="file" onChange={(e) => setCover(e.target.files[0])} />
                                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} />
                                            </div>
                                            <div className="actions">
                                                <button className="button" onClick={() => { editCategory(); close(); }}>Save</button>
                                            </div>
                                        </div>
                                    )}
                                </Popup>
                                <button className='button' onClick={handleDelete}>
                                    <AiOutlineDelete />
                                </button>
                            </div>
                            <h1>{category.title}</h1>
                            <a href='/'>#{category.category}</a>

                            <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?" Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
                            <p>Author: Pratima</p>
                        </div>
                    </div>
                </section>
            ) : (
                <div>No data available</div>
            )}
        </>
    );
};
