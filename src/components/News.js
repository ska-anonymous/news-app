import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    


    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let response = await fetch(url);
        props.setProgress(50);
        let data = await response.json();
        props.setProgress(80);
        setArticles(data.articles);
        setTotalResults(data.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `News-Monkey - ${props.category.toUpperCase()}`;
        updateNews();
    }, [])

    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();

    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     updateNews();

    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let response = await fetch(url);
        let data = await response.json();
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);


    }

    return (
        <div className='my-3'>
            <h1 className='text-center' style={{marginTop: "70px"}}>NewsMonkey - Top {props.category.charAt(0).toUpperCase() + props.category.substring(1)} headlines </h1>
            {loading && <Spinner />}
            <hr />
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} newsUrl={element.url} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            <hr />

        </div>
    )

}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
