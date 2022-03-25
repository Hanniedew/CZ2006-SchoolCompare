import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from "../../Firebase"
import { doc, getDocsFromCache, onSnapshot } from "firebase/firestore"
import "../../PagesCSS/Forum/Post.css";
import Comments from "./Comments"
import Time from "../../Components/DatePosted"

// TODO: Comment section
// TODO: Auth signed in users to comment

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const postDocRef = doc(db, "posts", id)

  useEffect(() => {

    const getSpecificPost = onSnapshot(postDocRef, (doc) => {
      setPost([{
        ...doc.data(),
        id: doc.id
      }])
    })
    return getSpecificPost;

  }, []);

  return (
    <div>
      {post.map((details) => {
        return (
          <div key={details.id}>
            <h3 className="post-user" >{details.author.name}</h3>
            <Time comment={details} />
            <div className='post-container' >
              <h1 className="post-title" >{details.values.title}</h1>
              <p className="post-query" >{details.values.query}</p>
            </div>
          </div>
        )
      })}
      <div>
        <Comments />
      </div>
    </div>
  );
}

export default Post