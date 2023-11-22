import React, { createContext, useState } from "react";
import juliu from "../assets/avatars/image-juliusomo.png";
import "./WriteBox.css";
const commentidContent = createContext();

const WriteBox = () => {
  const [text, setText] = useState("");
  const [createdbyy, setcreatedby] = useState('');
  const handleSubmit = async (e) => {
    // e.preventDefault();
      const token = localStorage.getItem("token");
      console.log(token,"its form writebox")
        try {
        const response = await fetch('http://localhost:8000/api/v1/comment/createComment', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
            credentials:"include",
            body: JSON.stringify({
                text,
                score:0
            })
        })
        if (response.ok) {
          const data = await response.json();
          setcreatedby(data.createdBy);
console.log(data)
          } else {
            const errorData = await response.json();
            console.error('comment could not be added successfully', errorData);
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
    }

    return (
<commentidContent.Provider  value={{ commentid: createdbyy }}>
        <div className="write-box">
     
    <form onSubmit={handleSubmit} className="auth-form">
     
        <input
          type="text"
          value={text}
                    onChange={(e) => {
              setText(e.target.value)
          }}
          required
          className="auth-input"
        />

        <button type="submit" className="auth-button">
         Comment
        </button>
      </form>
        </div>
</commentidContent.Provider>

    )
}
export default WriteBox;
export { commentidContent };