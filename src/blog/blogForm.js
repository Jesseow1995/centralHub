import React, { Component } from 'react';
import axios from 'axios';

//https://centralhubapi.herokuapp.com/blog-data
export default class BlogForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: "",
      title: "",
      content: "",
      apiUrl: "",
      apiAction: "post"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    axios.patch(`https://centralhubapi.herokuapp.com/blog-data/${this.props.username}`, { title: this.state.title, content: this.state.content }).then(resp => {
      this.setState({
        id: "",
        title: "",
        content: "",
      })

      this.props.handleSuccessfulFormSubmission(resp.data.blogs);
    }).catch(error => {
    });
    event.preventDefault();
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })

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