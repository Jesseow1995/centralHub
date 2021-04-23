import React, { Component } from 'react';
import axios from 'axios';
import youtubeAPIkey from '../hidden/variables';

export default class Media extends Component {
    constructor() {
        super()

        this.state = {
            youtubeVidId: '',
            youtubeVideoCategory: {},
            youtubeCategoryVideos: {},
            videoCategoryId: '1'
        }
        // this.handleChange = this.handleChange.bind(this)
        this.getVideos = this.getVideos.bind(this)
    }

    // getVideos(e) {
    //     this.setState({
    //         [e.target.name]: e.target.value,
    //         errorText: ""
    //     })
    // }
    getVideos(e) {

        this.setState({ videoCategoryId: e.target.value });
        console.log('Selected Category', this.state.videoCategoryId)
        this.getYouTubeChannel(e.target.value);

    }
    getYouTubeData() {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?id=wATH0Rl8Lew&key=${youtubeAPIkey}`)
            .then(response => {
                console.log('response', response);
                this.setState({
                    youtubeVidId: response.data.items[0].id

                })
                console.log('this is the youtubeVidId', this.state.youtubeVidId)

            })


    }

    getYouTubeCategories() {
        axios.get(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=us&key=AIzaSyB_q0TEto5sFJBMzgqPB8uGFkzByakfoJI`)
            .then(response => {
                console.log('response for youtube channel', response);
                this.setState({
                    youtubeVideoCategory: response.data.items
                })
                console.log('categories', this.state.youtubeVideoCategory)

            })
    }

    getYouTubeChannel(category) {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=us&relevanceLanguage=en&type=video&videoEmbeddable=true&videoCategoryId=${category}&key=AIzaSyB_q0TEto5sFJBMzgqPB8uGFkzByakfoJI`)
            .then(response => {
                console.log('response for category search', response)
                this.setState({
                    youtubeCategoryVideos: response.data.items
                })
                console.log('videos', this.state.youtubeCategoryVideos)
            })
    }

    componentDidMount() {
        this.getYouTubeData()
        this.getYouTubeCategories()
        this.getYouTubeChannel('15')


    }

    render() {
        const youtubeVidId = this.state.youtubeVidId;

        const categoryId = Array.from(this.state.youtubeVideoCategory)
        const youTubeCategoryVideos = Array.from(this.state.youtubeCategoryVideos)
        return (
            <div className='media'>
                <div className='media__content'>
                    <div className='media__content__sub-content'>
                        <div className='media__content__sub-content__header'>
                            <div className='media__content__sub-content__header__title'></div>
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
