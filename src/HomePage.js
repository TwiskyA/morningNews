import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { List, Avatar } from 'antd';

import Nav from './Nav'

class HomePage extends Component {

  // J1) --1)------Le state ThemesList reçoit les données global de l'API---------------------
  constructor(props) {
    super(props);
    this.state = {
      ThemesList: [],
      // J1) --1)------ Le state ThemesList reçoit les données global de l'API-------------------  
    }
  }



  // J1) < 2 -------------------------------------------------------------------------------
  componentDidMount() {

    console.log('Dans mon component did mount')

    // Here You need to fetch the data from the news Api 

    // fetch('https://newsapi.org/v2/sources?language=fr&apiKey=ec03c36398e642a286bc40eef2014fc0')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data.sources[0]);
    //   })
    //   .catch((error) => {
    //     console.log('Request failed', error)
    //   });

    const APIResultsLoading = async () => {

      // Here we want all the newspaper from the API
      const dataApi = await fetch('https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=ec03c36398e642a286bc40eef2014fc0')

      // We need to have the right format to be able to use the data
      const body = await dataApi.json()
      console.log(body.sources)
      // gestion erreur ?????
      // console.log('data from the API : ',body.sources)

      // var ThemesListCopy = [...this.state.ThemesList]; // pas utile car on ne veut pas modifier l'élément ici et en plus il est vide de base

      // ThemesListCopy.push(body.sources);

      this.setState({
        ThemesList: body.sources
      }, () => console.log('themelist', this.state.ThemesList[0].name))

      // console.log('themelist', this.state.ThemesList[0])
      // console.log(this.state.ThemesList[0][0].name)
      // console.log(APIResultsLoading)
    }

    APIResultsLoading()



    // Then, you need to update your ThemesList state

  }


  render() {

    // console.log('vérif', this.state.ThemesList)
    // const data = this.state.ThemesList.map(item => ({ title: item.name, description: item.description }))// A MODIFIER
    // console.log("data", data)

    // const data = [
    //   {
    //     // title: this.state.ThemesList[0].name,
    //   },
    //   {
    //     title: 'Ant Design Title 2',
    //   },
    //   {
    //     title: 'Ant Design Title 3',
    //   },
    //   {
    //     title: 'Ant Design Title 4',
    //   },
    // ];

    return (

      <div>
        <Nav />

        <div className="Banner" />

        <div className="HomeThemes">

          <List
            itemLayout="horizontal"
            dataSource={this.state.ThemesList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`/images/${item.category}.png`} />}
                  title={<Link to={`/ThemeArticles/${item.id}`} key={item}><h3>{item.name}</h3></Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          />

        </div>

      </div>
    );
  }
}

export default HomePage