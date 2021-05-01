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
    axios.post(this.state.apiUrl, { title: this.state.title, content: this.state.content }).then(resp => {
      console.log(resp);
      this.setState({
        id: "",
        title: "",
        content: "",
      })

      this.props.handleSuccessfulFormSubmission(resp.data.blogs);
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

    formData.append("blog[title", this.state.title);
    //formData.append("blog[blog_status]", this.state.blog_status)
    formData.append("blog[content]", this.state.content)

    if (this.state.featured_image) {
      formData.append("blog[featured_image", this.state.featured_image)
    };

    return formData;
  }

  render() {
    return (
      <div>
        <form className="blog_form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name='title' className='title' placeholder='title' value={this.state.title}></input>
          <textarea rows={20} cols={30} onChange={this.handleChange} name='content' className='content' placeholder='content' value={this.state.content}></textarea>
          <button className='submit'>Save Blog</button>
        </form>
      </div>
    )
  }
}