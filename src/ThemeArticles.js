import React, { Component } from 'react';
import './App.css';
import { Card, Icon, Modal } from 'antd';
import Nav from './Nav'

const { Meta } = Card;

class ThemesArticles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ThemeArticles: [],
      visible: false,
      title: 'No title',
      content: 'No content'
    }
    console.log(props)
  }

  showModal = (title, content) => {

    this.setState({
      visible: true,
      title: title,
      content: content
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    const APIArticles = async () => {


      // You need to catch the id comming from the homePage

      const dataApiArticles = await fetch(`https://newsapi.org/v2/top-headlines?sources=${this.props.match.params.id}&apiKey=ec03c36398e642a286bc40eef2014fc0`)
      const data = await dataApiArticles.json()

      console.log('fetch', data.articles)

      this.setState({
        ThemeArticles: data.articles
      }, () => console.log('themearticles', this.state.ThemeArticles))
    }
    APIArticles()
  }

  render() {



    return (

      <div>

        <Nav />

        <div className="Banner" />

        <div className="Card">

          {this.state.ThemeArticles.map((articles, i) =>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

              <Card
                style={{
                  width: 300,
                  margin: '15px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                cover={
                  <img
                    alt="example"
                    src={articles.urlToImage}
                  />
                }
                actions={[
                  <Icon type="read" key="ellipsis2" onClick={() => this.showModal(articles.title, articles.content)} />,
                  <Icon type="like" key="ellipsis" />
                ]}
              >

                <Meta
                  title={articles.title}
                  description={articles.description}
                />

              </Card>

              <Modal
                title={this.state.title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}

              >

                <p>{this.state.content}</p>

              </Modal>

            </div>

          )}


        </div>



      </div>
    );
  }
}

export default ThemesArticles;