<<<<<<< HEAD
import React, { Component } from "react";
import { List, ListItem } from "../List";
import { Col, Row, Container } from "../Grid";
import { Redirect } from "react-router";

import axios from "axios";

const apiKey = "5a7b3ff72dcb4898b5c6ee2013105946";
=======
import React, { Component } from 'react';
import { List, ListItem } from '../List';
import { Col, Row, Container } from '../Grid';
import { Redirect } from 'react-router';
import axios from 'axios';

// const apiKey = process.env.REACT_ART_API_KEY;
const apiKey = '5a7b3ff72dcb4898b5c6ee2013105946';
>>>>>>> 94ea84be61f200c4ed83b8b545ad4d1a86e7d8ea

class Articles extends Component {
  state = {
    redirect: false,
    articleswdev: [],
    articlesjs: [],
    articlestech: [],
    articleswdes: []
  };

  componentDidMount() {
    this.callAxios();
  }

  callAxios = () => {
    axios
      .all([
        axios.get(
          "https://newsapi.org/v2/everything?q=web%20development&totalResults=15&apiKey=" +
            apiKey
        ),
        axios.get(
          "https://newsapi.org/v2/everything?q=javascript&totalResults=15&apiKey=" +
            apiKey
        ),
        axios.get(
          "https://newsapi.org/v2/everything?q=tech&totalResults=15&apiKey=" +
            apiKey
        ),
        axios.get(
          "https://newsapi.org/v2/everything?q=web%20design&totalResults=15&apiKey=" +
            apiKey
        )
      ])
      .then(
        axios.spread((resdev, resjs, restech, resdes) => {
          this.setState({
            articleswdev: resdev.data.articles,
            articlesjs: resjs.data.articles,
            articlestech: restech.data.articles,
            articleswdes: resdes.data.articles
          });
        })
        // do something with both responses
        //   .catch(err => console.log(err));
      );
  };

  // function to save aricle on favourites

  clickedToSave = (title, link) => {
    if (this.props.username == null) {
      this.setState({ redirect: true });
    } else {
      let saveArticle = {
        title: title,
        link: link
      };

      axios
        .post(`/user/article/${this.props.username}`, saveArticle)
        .then(function(response) {
          console.log("success", response);
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <h4 className="linebr">Web Development</h4>
            {this.state.articleswdev.length ? (
              <List>
                {this.state.articleswdev.map(article => (
                  <ListItem>
                    <a href={article.url}>
                      <strong>{article.title} </strong>
                    </a>
                    <span> by {article.source.name}</span>
                    <button
                      onClick={this.clickedToSave.bind(
                        this.state,
                        article.title,
                        article.url
                      )}
                    >
                      save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <h4 className="linebr">Javascript</h4>
            {this.state.articlesjs.length ? (
              <List>
                {this.state.articlesjs.map(article => (
                  <ListItem>
                    <a href={article.url}>
                      <strong>{article.title} </strong>
                    </a>
                    <span> by {article.source.name}</span>
                    <button
                      onClick={this.clickedToSave.bind(
                        this.state,
                        article.title,
                        article.url
                      )}
                    >
                      save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <h4 className="linebr">Web Design</h4>
            {this.state.articleswdes.length ? (
              <List>
                {this.state.articleswdes.map(article => (
                  <ListItem>
                    <a href={article.url}>
                      <strong>{article.title} </strong>
                    </a>
                    <span> by {article.source.name}</span>
                    <button
                      onClick={this.clickedToSave.bind(
                        this.state,
                        article.title,
                        article.url
                      )}
                    >
                      save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-6 sm-12">
            <h4 className="linebr">Tech</h4>
            {this.state.articlestech.length ? (
              <List>
                {this.state.articlestech.map(article => (
                  <ListItem>
                    <a href={article.url}>
                      <strong>{article.title} </strong>
                    </a>
                    <span> by {article.source.name}</span>
                    <button
                      onClick={this.clickedToSave.bind(
                        this.state,
                        article.title,
                        article.url
                      )}
                    >
                      save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
