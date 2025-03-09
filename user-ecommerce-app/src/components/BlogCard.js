import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {
  const { id, title, description, date, image } = props;
  return (
    <div className="blog-card">
        <div className="card-image">
            {/* <img src="images/blog/blog-02.jpg" className='img-fluid ' alt="blog" /> */}
            <img src={image ? image : "images/blog/blog-02.jpg"} className='img-fluid ' alt="blog" />
        </div>
        <div className="blog-content">
            <p className="date">{date}</p>
            <h5 className="title">{title}</h5>
            <p className="desc" dangerouslySetInnerHTML={{__html: description.substr(0,40) + "..."}} ></p>
            <Link to={'/blog/' + id} className='button' >Read More</Link>
        </div>
    </div>
  )
}

export default BlogCard