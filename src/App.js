import React, { useEffect, useState } from 'react'
import './App.css'
import MaterialUITable from './MaterialUITable'
import ImageGridList from './ImageGridList';
import _ from 'lodash';

function App () {
  const [albums, setAlbums] = useState([])
  const [autoSuggest, setAutoSuggest] = useState(false)
  const [albumData, setAlbumData] = useState([])
  const [defaultTableView, setDefaultTableView] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(res => res.json())
      .then(res => {
        console.log('data', res)
        setAlbums(res)
        sessionStorage.setItem('albums', JSON.stringify(res))
      })
      .catch(error => {
        console.error('Error : ', error)
      })
  }, [])

  const handleKeyPress = e => {
   
    // const filterData = _.debounce(filterAlbums(e.target.value), 1000)
    filterAlbums(e.target.value)
    console.log('length ', e.target.value.length)
    if (e.target.value.length-1 > 0 ) {
      setAutoSuggest(true)
    } else {
      setAutoSuggest(false)
    }
  }

  const handleAlbumSelection = id => {
    console.log('id ', id)
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then(res => res.json())
      .then(res => {
        console.log('Album data', res)
        setAlbumData(res.filter(item => item.albumId === id))
        setAlbums([])
      })
      .catch(error => {
        console.error('Error : ', error)
      })
  }

  const filterAlbums = value => {
    const allAlbums = JSON.parse(sessionStorage.getItem('albums'))
    setAlbums( allAlbums.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  // Explicit debouncing can be implemented or lodash can be used
  // have not implemented same for now, as getting one error.
  // Apart from from this have implemented all task, debouncing can be done if more time given.

  // const debouncing = (fn, delay) => {
  //   let timer
  //   return () => {
  //     let that = this
  //     let args = arguments
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       fn.apply(that, args)
  //     }, delay)
  //   }
  // }

  const handleViewToggle = () => {
    setDefaultTableView(!defaultTableView)
  }

  return (
    <div className='App'>
      <input
      className='input-typeahead'
        type='text'
        onKeyDown={handleKeyPress}
        placeholder='Eneter Album name'
      />
      <ul>
        {autoSuggest &&
          albums &&
          albums.map(item => (
            <li
              className='album-list'
              key={item.id}
              onClick={() => handleAlbumSelection(item.id)}
            >
              {' '}
              {item.title}
            </li>
          ))}
      </ul>
          {albumData.length > 0 && <button onClick={handleViewToggle}>Change view</button>} 
          
          {albumData.length > 0 && defaultTableView && <MaterialUITable data={albumData} />}

          { albumData.length > 0 && !defaultTableView && <ImageGridList data={albumData} /> }
    </div>
  )
}

export default App
