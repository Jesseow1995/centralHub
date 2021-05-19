import React, { Component } from 'react';
import BlogModal from '../blog/blogModal';
import axios from 'axios';

const ENTER_KEY = 13;

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogItems: [],
            blogModalIsOpen: false,
            username: "",
            loggedIn: false
        }

        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    createUser() {
        const username = this.state.username
        const password = document.querySelector("#password").value

        const createUser = this.state.createUser
        console.log(createUser)
        axios.put('http://localhost:3001/blog-data', { username, password })
            .then(response => {
                this.setState({
                    username: username,
                    loggedIn: true
                })
            })
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        })
    }
    handleSuccessfulNewBlogSubmission() {
        axios.get(`http://localhost:3001/blog-data/${this.state.username}`)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        blogItems: response.data,
                        blogModalIsOpen: false
                    })
                }
            })

    }
    //https://centralhubapi.herokuapp.com/blog-data
    getBlogItems(username, password) {
        axios.post(`http://localhost:3001/blog-data/${username}`, { password })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        blogItems: response.data,
                        loggedIn: true
                    });
                    console.log(response);
                }

            })
    }


    openModal() {
        this.setState({
            blogModalIsOpen: true
        })
    }
    //https://centralhubapi.herokuapp.com/blog-data/${blogId}
    handleDeleteBlog(blogId) {
        axios.delete(`http://localhost:3001/blog-data/${this.state.username}/${blogId}`).then(response => {
            console.log('delete', response)
            this.setState({
                blogItems: response.data
            })
        })
    }

    getUsername(e) {
        this.setState({ username: e.target.value })
    }

    handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
            this.submitChange();
        }
    }

    submitChange = () => {
        const username = this.state.username
        const password = document.querySelector("#password").value
        if (username && password) {
            this.getBlogItems(username, password);
        }
    }

    render() {
        return (
            <div className="blog-container">
                <BlogModal
                    className="modal"
                    handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
                    handleModalClose={this.handleModalClose}
                    modalIsOpen={this.state.blogModalIsOpen}
                    username={this.state.username}
                />


                {this.state.blogItems.map(function (blogItem) {
                    return (
                        <div className="blog-item" key={blogItem.id}>
                            <div className="blog-title">{blogItem.title}</div>
                            <div className="blog-content">{blogItem.content}</div>
                            <a onClick={() => this.handleDeleteBlog(blogItem.id)}>Delete</a>
                        </div>
                    )
                }.bind(this))}

                {this.state.loggedIn ? (
                    <div>
                        <button className='new_blog_button' onClick={this.openModal}>New Blog</button>
                        <button className='logout__button' onClick={() => this.setState({
                            username: "",
                            loggedIn: false,
                            blogItems: []
                        })}>Logout</button>
                    </div>) : (
                    <div className='login-form'>
                        <input
                            className='login__item login__username'
                            name='username'
                            type='text'
                            placeholder='Enter Username'
                            value={this.state.username}
                            onChange={this.getUsername}
                            onKeyDown={this.handleKeyDown}
                        />
                        <input
                            className='login__item login__password'
                            name='password'
                            type='password'
                            placeholder='Enter Password'
                            id="password"
                            onChange={this.getPassword}
                            onKeyDown={this.handleKeyDown}
                        />
                        <button className='login__item login__button' onClick={this.submitChange}>Login</button>
                        <button className='login__item login__createUser' onClick={this.createUser}>Create User</button>
                    </div>
                )}

            </div>
        )
    }
}

export default Blog;