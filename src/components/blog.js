import React, { Component } from 'react';
import BlogModal from '../blog/blogModal';
import axios from 'axios';

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogItems: { portfolio_blogs: [] },
            blogModalIsOpen: false
        }

        this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
    }

    handleModalClose() {
        this.setState({
            blogModalIsOpen: false
        })
    }
    handleSuccessfulNewBlogSubmission(blogs) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: { portfolio_blogs: blogs }
        });
    }

    getBlogItems() {
        axios.get('http://localhost:3001/blog-data')
            .then(response => {
                this.setState({ blogItems: response.data });
                console.log(this.state);
            })
    }
    componentDidMount() {
        console.log(this.state.blogItems)
        this.getBlogItems();
    }

    openModal() {
        this.setState({
            blogModalIsOpen: true
        })
    }

    handleDeleteBlog(blogId) {
        axios.delete(`http://localhost:3001/blog-data/${blogId}`).then(response => {
            console.log('delete', response)
            this.setState({
                blogItems: response.data
            })
            this.getBlogItems();
        })
    }

    render() {
        return (
            <div className="blog-container">
                <BlogModal
                    handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
                    handleModalClose={this.handleModalClose}
                    modalIsOpen={this.state.blogModalIsOpen}
                />

                {this.state.blogItems.portfolio_blogs.map(function (blogItem) {
                    return (
                        <div className="blog-item" key={blogItem.id}>
                            <div className="blog-title">{blogItem.title}</div>
                            <div className="blog-content">{blogItem.content}</div>
                            <a onClick={() => this.handleDeleteBlog(blogItem.id)}>Delete</a>
                        </div>
                    )
                }.bind(this))}

                <button onClick={this.openModal}>New Blog</button>

            </div>
        )
    }
}

export default Blog;