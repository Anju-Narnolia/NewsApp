import React, { Component, } from 'react'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
export class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
  };
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'science'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&
    pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsetdata = await data.json();
    document.title = "News-App";
    this.setState({
      articles: this.state.articles.concat(parsetdata.articles),
      totalResults: parsetdata.totalResults,
      loading: false
    })
  }
  async updatePage() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&
    pageSize=${this.props.pageSize}`;
    this.props.setProgress(10);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsetdata = await data.json();
    console.log(parsetdata)
    document.title = "News-App";
    this.props.setProgress(70);
    this.setState({
      articles: parsetdata.articles,
      totalResults: parsetdata.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updatePage();
  }
  handelPrevious = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updatePage();
  }

  handelNext = async () => {
    console.log("next");
    this.setState({ page: this.state.page + 1 })
    this.updatePage();
  }
  render() {
    return (
      <>
        <h1 className="text-center">India News -Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-5">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 50) : " "}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                      colour={this.props.colour}

                      discription={
                        element.description
                          ? element.description.slice(0, 120)
                          : " "
                      }
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://placehold.co/600x400/orange/white"
                      }
                      newsUrl={element.url}
                    />
                  </div>    )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </ >
    )
  }
}

export default Home;
