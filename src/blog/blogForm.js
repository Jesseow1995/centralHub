import React, { Component } from 'react';
import axios from 'axios';


export default class BlogForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: "",
      title: "",
      content: "",
      apiUrl: "http://localhost:3001/blog-data",
      apiAction: "post"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    axios.post(this.state.apiUrl, {title: this.state.title, content: this.state.content}).then(resp => {
      console.log(resp);
      this.setState({
        id: "",
        title: "",
        content: "",
      })

      this.props.handleSuccessfulFormSubmission(resp.data.portfolio_blogs);
    }).catch(error => {
      console.log("error posting blog data to api", error)
    });
    event.preventDefault();
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title", this.state.title);
    //formData.append("portfolio_blog[blog_status]", this.state.blog_status)
    formData.append("portfolio_blog[content]", this.state.content)

    if (this.state.featured_image) {
      formData.append("portfolio_blog[featured_image", this.state.featured_image)
    };

    return formData;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name='title' className='Title' placeholder='title' value={this.state.title}></input>
          <textarea onChange={this.handleChange} name='content' className='content' placeholder='content' value={this.state.content}></textarea>
          <button className='submit'>Save Blog</button>
        </form>
      </div>
    )
  }
}