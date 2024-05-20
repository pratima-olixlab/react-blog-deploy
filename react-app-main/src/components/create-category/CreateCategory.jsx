import React, { useState } from "react";
import "./create.css";
import axios from "axios";

export const Category = () => {
    const [cover, setCover] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const formData = new FormData();
            formData.append("cover", cover); // Append the file object to FormData
            formData.append("title", title);
            formData.append("category", category);

            const res = await axios.post(`${window.location.origin}/users/category`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            res.data && window.location.replace("/");
        } catch (err) {
            setError(true);
        }
    };

    const handleFileChange = (e) => {
        setCover(e.target.files[0]);
    };

    return (
        <>
            <section className='newPost'>
                <div className='container boxItems'>
                    <form onSubmit={handleSubmit}>
                        {/* <div className='inputfile flexCenter'>
                            <input type='file' accept='image/*' alt='img' onChange={handleFileChange} />
                            {cover && <img src={URL.createObjectURL(cover)} alt='cover' className='image-preview' />}
                        </div> */}
                        <div className="coverContainer">
                            <label className="coverLabel">
                                <input type="file" accept="image/*" alt="img" onChange={handleFileChange} />
                            </label>
                            {cover && <img src={URL.createObjectURL(cover)} alt="cover" className="image-preview" />}
                        </div>
                        <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                        <input type='text' placeholder='Category' onChange={(e) => setCategory(e.target.value)} />
                        <button className='button'>Create Category</button>
                    </form>
                </div>
            </section>
        </>
    );
};
