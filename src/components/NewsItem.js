import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <span className='badge text-black bg-warning' > {source} </span>
        <img src={imageUrl ? imageUrl : "https://i0.wp.com/9to5toys.com/wp-content/uploads/sites/5/2022/11/LG-2022-C2-77-Inch-120Hz-OLED-Gallery-4K-Smart-TV.jpg?resize=1200%2C628&ssl=1"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text" style={{ height: "6rem", overflowY: "auto" }}>{description}</p>
          <p className="card-text"><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Read more...</a>
        </div>
      </div>
    </div>
  )

}

export default NewsItem
