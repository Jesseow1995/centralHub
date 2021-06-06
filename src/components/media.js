import React, { Component } from 'react';
import axios from 'axios';
import { youtubeAPIkey } from '../hidden/variables';


const WAIT_INTERVAL = 3000;
const ENTER_KEY = 13;

export default class Media extends Component {
    constructor() {
        super()

        this.state = {
            youtubeVidId: '',
            youtubeVideoCategory: {},
            youtubeVideos: {},
            videoCategoryId: '1',
            query: '',
            typingTimeout: 0
        }
        this.getVideos = this.getVideos.bind(this)
        this.getVideosFromQuery = this.getVideosFromQuery.bind(this)
    }

    componentWillMount() {
        this.timer = null;
    }

    componentDidMount() {
        this.getYouTubeCategories()
        this.getYouTubeCategoryVideos('15')
    }

    getVideos(e) {
        this.setState({ videoCategoryId: e.target.value });
        this.getYouTubeCategoryVideos(e.target.value);
    }

    getVideosFromQuery(e) {
        clearTimeout(this.timer);
        this.setState({ query: e.target.value })

        this.timer = setTimeout(this.submitChange, WAIT_INTERVAL)
    }

    handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
            clearTimeout(this.timer)
            this.submitChange();
        }
    }

    submitChange = () => {
        const query = this.state.query
        this.getYouTubeQuery(query);
    }

    getYouTubeQuery(query) {
        axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=5&order=viewCount&q=${query}&regionCode=us&type=video&videoEmbeddable=true&key=${youtubeAPIkey}`)
            .then(response => {
                this.setState({
                    youtubeVideos: response.data.items
                })
            })
    }

    // retrieve category names built into youtube api
    getYouTubeCategories() {
        axios.get(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=us&key=AIzaSyB_q0TEto5sFJBMzgqPB8uGFkzByakfoJI`)
            .then(response => {
                this.setState({
                    youtubeVideoCategory: response.data.items
                })
            })
    }

    //retreive the youtube videos for the specific categories from youtube api
    getYouTubeCategoryVideos(category) {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=us&relevanceLanguage=en&type=video&videoEmbeddable=true&videoCategoryId=${category}&key=AIzaSyB_q0TEto5sFJBMzgqPB8uGFkzByakfoJI`)
            .then(response => {
                this.setState({
                    youtubeVideos: response.data.items
                })
            })
    }

    render() {
        const youtubeVidId = this.state.youtubeVidId;

        const categoryId = Array.from(this.state.youtubeVideoCategory)
        const youTubeCategoryVideos = Array.from(this.state.youtubeVideos)
        return (
            <div className='media'>
                <div className='media__content'>
                    <div className='media__content__sub-content'>
                        <div className='media__content__sub-content__header'>
                            <div className='categories__select '>
                                <select className='categories__select__select' onChange={this.getVideos} id='select-category'>
                                    <option key='0' value=''>Select a category {String.fromCharCode(9660)}</option>
                                    {
                                        categoryId.map(function (category) {
                                            return (
                                                <option key={category.id} className='category__id' value={category.id}>{category.id} {category.snippet.title}</option>
                                            )
                                        })
                                    }
                                </select>

                                <input
                                    name='query'
                                    type='text'
                                    placeholder='Enter query'
                                    value={this.state.query}
                                    onChange={this.getVideosFromQuery}
                                    onKeyDown={this.handleKeyDown}
                                />

                            </div>
                        </div>


                        <div className='youTube-videos'>
                            {
                                youTubeCategoryVideos.map(function (video) {
                                    return (<iframe key={video.id.videoId} className='youtube-video' src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>)
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
