import "./Reply.css";
import "./CommentBox.css";

const Reply = ({ data }) => {
    const full = data.createdAt;
    const small = full.substring(0, 10);
    const handleReply = () => {
        
    }
    const handleIncreaseScoreclick = async(commentId) => {
        const token = localStorage.getItem("token");
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/comment/score/${commentId}/increase`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
     
        })
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log(data);
    window.location.reload();
    
      } else {
        const errorData = await response.json();
        console.error('score could not be added successfully', errorData);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
    
    
      }
    return (
        <div>
        <div className="reply">
            <div className='plus-minus'>
                <span onClick={()=>{handleIncreaseScoreclick(data._id)}}>
                <svg width="11" height="11"  xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>                
                </span>
                    <span style={{ color: "black" }}>{data.score }</span>
             
            </div>

            <div className='id-d-reply-comme'>
                <div className='id-d-reply'>
                <div className='left-section'>
                    <div style={{ marginRight: "1rem", marginLeft: "1rem" }}>
                    </div>
                    <div style={{marginRight:"1rem"}}>
                                <p className='name'>{data.userName}</p>                    
                    </div>
                    <div style={{marginRight:"1rem",color:"gray"}}>
                                <p>{ small}</p>
                    </div>
                    </div>
                    <div >
                   
            <button onClick={handleReply}>Reply</button>
            <span >                       
</span> 
                    </div>
                </div>
                <div className='text'>
                        <p style={{ color: "black", fontSize: "10px", marginLeft: "1rem" }}>
                            { data.text}</p>
                </div>
            </div>
        </div>
        </div>       
    )
}
export default Reply;