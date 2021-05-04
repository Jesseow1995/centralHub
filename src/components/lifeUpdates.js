import React, { Component } from 'react';
import axios from 'axios';
import { newsAPIkey } from '../hidden/variables';

class LifeUpdates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: {},
            country: 'US'
        }

        this.getArticles = this.getArticles.bind(this);
        this.getCountry = this.getCountry.bind(this);
    }

    getCountry(e) {
        this.setState({ country: e.target.value });
        console.log('Selected Country', this.state.country)
        this.getArticles(e.target.value);
    }

    getArticles(country) {
        axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsAPIkey}`)
            .then(response => {
                console.log(response);
                this.setState({
                    articles: response.data.articles
                })
                console.log('This is State', this.state.articles)
            })
    }

    componentWillMount() {
        this.getArticles('us');
    }



    render() {
        const data = Array.from(this.state.articles);
        console.log('data', data)
        const country = String(this.state.country)
        return (
            <div className='life-updates'>

                <div className='life-updates__news-feed news-feed'>
                    <div className='news-feed__header'>
                        <div className='news-feed__header__title'>Headlines from {this.state.country.toUpperCase()}</div>
                        <div className='life-updates__select-container'>
                            <div className='life-updates__select'>
                                <select onChange={this.getCountry} value={this.state.country} className='life-updates__select__select' id='select-country'>
                                    <option value='default'>Pick a country {String.fromCharCode(9660)} </option>
                                    <option value='ae'>AE</option>
                                    <option value='ar'>AR</option>
                                    <option value='at'>AT</option>
                                    <option value='au'>AU</option>
                                    <option value='be'>BE</option>
                                    <option value='bg'>BG</option>
                                    <option value='br'>BR</option>
                                    <option value='ca'>CA</option>
                                    <option value='ch'>CH</option>
                                    <option value='cn'>CN</option>
                                    <option value='co'>CO</option>
                                    <option value='cu'>CU</option>
                                    <option value='cz'>CZ</option>
                                    <option value='de'>DE</option>
                                    <option value='eg'>EG</option>
                                    <option value='fr'>FR</option>
                                    <option value='gb'>GB</option>
                                    <option value='gr'>GR</option>
                                    <option value='hk'>HK</option>
                                    <option value='hu'>HU</option>
                                    <option value='id'>ID</option>
                                    <option value='ie'>IE</option>
                                    <option value='il'>IL</option>
                                    <option value='in'>IN</option>
                                    <option value='it'>IT</option>
                                    <option value='jp'>JP</option>
                                    <option value='kr'>KR</option>
                                    <option value='it'>IT</option>
                                    <option value='lv'>LV</option>
                                    <option value='ma'>MA</option>
                                    <option value='mx'>MX</option>
                                    <option value='my'>MY</option>
                                    <option value='ng'>NG</option>
                                    <option value='nl'>NL</option>
                                    <option value='no'>NO</option>
                                    <option value='nz'>NZ</option>
                                    <option value='ph'>PH</option>
                                    <option value='pl'>PL</option>
                                    <option value='pt'>PT</option>
                                    <option value='ro'>RO</option>
                                    <option value='rs'>RS</option>
                                    <option value='ru'>RU</option>
                                    <option value='sa'>SA</option>
                                    <option value='se'>SE</option>
                                    <option value='sg'>SG</option>
                                    <option value='si'>SI</option>
                                    <option value='sk'>SK</option>
                                    <option value='th'>TH</option>
                                    <option value='tr'>TR</option>
                                    <option value='tw'>TW</option>
                                    <option value='ua'>UA</option>
                                    <option value='us'>US</option>
                                    <option value='ve'>VE</option>
                                    <option value='za'>ZA</option>
                                </select>
                                {/* <div className='submit-button'>
                        <button onClick={ }>Submit</button>
                    </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='news-feed__articles'>
                        {
                            data.map(function (article) {
                                return (<div className='news-feed__article article' key={article.title}>

                                    <img className='article__image' src={article.urlToImage}></img>
                                    <div className='article__title'><h1>{article.title}</h1></div>
                                    <div className='article__description'>{article.description ? (article.description.substr(0, 150) + '...') : (article.description)}</div>
                                    <a href={article.url} target="_blank" className='article__link'>View full article</a>

                                </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default LifeUpdates;