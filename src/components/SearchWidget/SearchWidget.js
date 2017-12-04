import React, { Component } from 'react'
import Icon from 'react-fa'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import fuzzysearch from 'fuzzysearch'

import './SearchWidget.css'

class SearchWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayObjects: this.props.objects,
      searching: false
    }

    this.filterObjects = this.filterObjects.bind(this)
    this.objectDisplay = this.objectDisplay.bind(this)
  }

  filterObjects() {
    let query = this.searchInput.value
    let objects = this.props.objects
    objects = objects.filter(object =>
      fuzzysearch(query.toLowerCase(), object.data.title.toLowerCase())
    )

    if (query.length > 0) {
      this.setState({
        ...this.state,
        searching: true,
        displayObjects: objects
      })
    } else {
      this.setState({
        ...this.state,
        searching: false
      })
    }
  }

  getLikes(object) {
    let likes = []
    for (let like in object.data.likes) {
      if (object.data.likes[like]) likes.push(like)
    }
    return likes.length
  }

  objectDisplay(object, index) {
    let alternate = index % 2 === 0 ? '' : 'alternate'
    let ObjectItem = withRouter(({ history }) => {
      return (
        <div
          className={'SearchWidget-searchItem ' + alternate}
          onClick={() => {
            this.searchInput.value = ''
            this.setState({
              ...this.state,
              searching: false
            })
            history.push('/thread/' + object.id)
          }}
        >
          <div className="SearchWidget-list-item-name">{object.data.title}</div>
          <div className="SearchWidget-list-item-likes">{this.getLikes(object)}</div>
        </div>
      )
    })
    return <ObjectItem key={object.id} />
  }

  getSearchButton() {
    let query = ''
    if (this.searchInput) {
      query = this.searchInput.value
    }
    let searchButton = withRouter(({ history }) => (
      <button
        className="SearchWidget-button"
        onClick={() => {
          this.searchInput.value = ''
          this.setState({
            ...this.state,
            searching: false
          })
          if (query.length > 0) history.push('/search/' + query)
        }}
      >
        <Icon
          name="search"
          onClick={() => {
            this.searchInput.value = ''
            this.setState({
              ...this.state,
              searching: false
            })
            if (query.length > 0) history.push('/search/' + query)
          }}
        />
      </button>
    ))
    return searchButton
  }

  render() {
    let objects = this.state.displayObjects
    let listHide = this.state.searching ? 'unhide' : ''
    let SearchButton = this.getSearchButton()
    return (
      <div className="SearchWidget">
        <input
          ref={ref => (this.searchInput = ref)}
          type="text"
          className="SearchWidget-input"
          placeholder="Search or ask new question"
          onChange={this.filterObjects}
        />
        <SearchButton />
        <div className={'SearchWidget-searchList ' + listHide}>
          <div className="SearchWidget-searches">
            {objects.map((object, index) => this.objectDisplay(object, index))}
            {objects.length === 0 && (
              <div className="SearchWidget-none">
                <span className="muted">No results</span>
              </div>
            )}
          </div>
          <div className="SearchWidget-extra">
            <Link to="/newPost">
              <Icon name="pencil" />{' '}Ask New
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchWidget
