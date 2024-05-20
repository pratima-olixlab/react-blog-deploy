// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { Context } from "../../context/Context";
// import image from "../../assets/images/input.png";
// import "./account.css";

// export const Account = () => {
//   const { user, dispatch } = useContext(Context);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username || "");
//       setEmail(user.email || "");
//       setPassword("");
//     }
//   }, [user]);

//   const handleUpdate = async () => {
//     try {
//       if (!user) {
//         console.error("User not found");
//         return;
//       }
//       const res = await axios.put(`/users/${user._id}`, {
//         username,
//         email,
//         password,
//       });
//       dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <section className="accountInfo">
//         <div className="container boxItems">
//           <h1>Account Information</h1>
//           <div className="content">
//             <div className="left">
//               <div className="img flexCenter">
//                 <input type="file" accept="image/*" src={image} alt="img" />
//                 <img src={image} alt="image" className="image-preview" />
//               </div>
//             </div>
//             <div className="right">
//               <label htmlFor="">Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <label htmlFor="">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label htmlFor="">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button className="button" onClick={handleUpdate}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };



// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { Context } from "../../context/Context";
// import image from "../../assets/images/input.png";
// import "./account.css";

// export const Account = () => {
//   const { user, dispatch } = useContext(Context);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username || "");
//       setEmail(user.email || "");
//     }
//   }, [user]);

//   const handleUpdate = async () => {
//     try {
//       if (!user) {
//         console.error("User not found");
//         return;
//       }
//       const res = await axios.put(`/users/${user._id}`, {
//         username,
//         email,
//         password,
//       });
//       dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <section className="accountInfo">
//         <div className="container boxItems">
//           <h1>Account Information</h1>
//           <div className="content">
//             <div className="left">
//               <div className="img flexCenter">
//                 <input type="file" accept="image/*" src={image} alt="img" />
//                 <img src={image} alt="image" className="image-preview" />
//               </div>
//             </div>
//             <div className="right">
//               <label htmlFor="">Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <label htmlFor="">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label htmlFor="">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <button className="button" onClick={handleUpdate}>
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };



import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import image from "../../assets/images/profile.jpeg";
import "./account.css";

export const Account = () => {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(user); // Check if user data is received
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);
  
  const handleUpdate = async () => {
    try {
      if (!user || !user._id) {
        console.error("User ID not found");
        return;
      }
  
      const updatedUserData = {
        username,
        email,
      };
  
      const res = await axios.put(`${window.location.origin}/users/${user._id}`, updatedUserData);
      
      if (res.status === 200) {
        dispatch({ type: "UPDATE_USER", payload: { username, email } });
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="accountInfo">
        <div className="container boxItems">
          <h1>Account Information</h1>
          <div className="content">
            <div className="left">
              <div className="img flexCenter">
                <input type="file" accept="image/*" src={image} alt="img" />
                <img src={image} alt="image" className="image-preview" />
              </div>
            </div>
            <div className="right">
              <label htmlFor="">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
