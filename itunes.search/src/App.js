import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { searchItunes } from './services/search.service'
import dateFormat from 'dateformat'

class App extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      artistName: '',
      albums: [],
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { artistName } = this.state

    searchItunes(artistName)
      .then(response => {
        this.setState({
          albums: response.results
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
      
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
          <a className="navbar-brand center" href="/">Album Search</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
                <div className="input-group input-group-md">
                  <input onChange={this.handleChange} type="search" name="artistName" placeholder="ex... Elvis Presley" className="form-control mr-sm-2" />
                  <button className="btn btn-outline-dark" type="submit">Search</button>
                </div>
              </form>
            </ul>
          </div>
        </nav>

        <div id="album-container" className="container">
          <div className="row">
            {this.state.albums.map((album, index) => (
              <div key={index} className="col-sm pb-1 card-group">
                <div className="holder card custom-card" style={{ width: "15rem" }}>
                  <img className="image card-img-top" src={album.artworkUrl100} alt="cover" />
                  <a style={{ display: "block" }} target="blank" href={album.collectionViewUrl}><div className="overlay">
                    <div className="text">
                      <p>${album.collectionPrice}</p>
                      <p>Release Date: {dateFormat(album.releaseDate, "mm/dd/yyyy")}</p>
                      <p>Genre: {album.primaryGenreName}</p>
                      <p>Track Count: {album.trackCount}</p>
                      <span style={{ fontSize: '9px' }}>{album.copyright}</span>
                    </div>
                  </div></a>
                  <div className="card-body">
                    <h5 className="card-title">{album.collectionName}{(album.contentAdvisoryRating === "Explicit") && <span className="align-baseline pl-2" style={{fontSize: "10px", color: "red"}}>(Explicit)</span>}</h5>
                    <p><strong>{album.artistName}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;





