import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import './Posts.css';
import axios from '../../../axios'

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount() {
    console.log(this.props)
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        });
        this.setState({
          posts: updatedPosts
        })
      }).catch(error => {
        console.log(error);
        // this.setState({
        //   error: true
        // });
      });
  }

  postSelectHandler = (id) => {
    this.setState({
      selectedPostId: id
    });
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={'/posts/' + post.id} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              key={post.id}
              clicked={() => this.postSelectHandler(post.id)} />
          </Link>
        );
      });
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route 
          path={this.props.match.url + '/:id'}
          exact  
          component={FullPost} />
      </div>
    );
  }
}

export default Posts;