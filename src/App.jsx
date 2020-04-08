import React, { Component } from 'react'
import Header from './components/header'
import MenuBar from './components/navbar'
import Contents from './components/contents'
import PaginationButton from './components/pagination'
import axios from 'axios'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSantri: [],
      newDataSantri: [],
      value: '',
      postDataSantri: {
        id: '',
        name: '',
        studyProgram: ''
      },
      isUpdate: false,
      currentPage: 1,
      dataSantriPerPage: 5,
      dataSantriWithLimit: [],
      paginationNumbers: []
    }
  }

  componentDidMount () {
    this.onGetDataSantri()
  }

  onGetDataSantri = () => {
    axios.get('http://localhost:4000/posts?_sort=id&_order=desc')
      .then((result) => {
        this.setState({
          dataSantri: result.data
        }, () => {
          this.setPagination()
        })
      })
  }

  onHandleInput = (event) => {
    const NewPostDataSantri = { ...this.state.postDataSantri }
    NewPostDataSantri[event.target.name] = event.target.value
    const timeid = new Date().getTime()
    if (!this.state.isUpdate) {
      NewPostDataSantri.id = timeid
    }
    this.setState({
      id: '',
      postDataSantri: NewPostDataSantri
    })
  }

  onHandlePost = () => {
    axios.post('http://localhost:4000/posts', this.state.postDataSantri)
      .then(() => {
        this.onGetDataSantri()
        this.setState({
          postDataSantri: {
            id: '',
            name: '',
            studyProgram: ''
          }
        })
      })
  }

  onHandleUpdate = () => {
    axios.put(`http://localhost:4000/posts/${this.state.postDataSantri.id}`, this.state.postDataSantri)
      .then(() => {
        this.onGetDataSantri()
        this.setState({
          postDataSantri: {
            id: '',
            name: '',
            studyProgram: ''
          }
        })
      })
  }

  onDataUpdate = (data) => {
    this.setState({
      postDataSantri: data,
      isUpdate: true
    })
  }

  onHandleDelete = (id) => {
    axios.delete(`http://localhost:4000/posts/${id}`)
      .then(() => {
        this.onGetDataSantri()
      })
  }

  onSearchSantri = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      if (this.state.dataSantri) {
        const searchDataSantri = this.state.dataSantri.filter(
          (item) => {
            return (
              item.name.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
            )
          }
        )
        this.setState({
          newDataSantri: searchDataSantri
        }, () => this.setPagination())
      }
    })
  }

  setPagination = () => {
    const { dataSantri, currentPage, dataSantriPerPage, value, newDataSantri } = this.state // destructuring assigments
    const lastIndexOfSantri = currentPage * dataSantriPerPage // menentukan nilai lastindex
    const firstIndexOfSantri = lastIndexOfSantri - dataSantriPerPage // menentukan nilai firstindex

    // menghitung jumlah seluruh data perPagenya
    const dataSantriWithLimit = value && newDataSantri.length // pengkondisian ternary
      ? newDataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)
      : value && !newDataSantri.length
        ? null
        : dataSantri.slice(firstIndexOfSantri, lastIndexOfSantri)

    const paginationNumbers = [] // variabel penampung jumlah pagination yg dibutuhkan

    // MENGHITUNG seluruh datasantri yang ada.length
    const currentDataSantriLength = value && newDataSantri.length // pengkondisian ternary
      ? newDataSantri.length
      : value && !newDataSantri.length
        ? null
        : dataSantri.length

    // melooping hasil dari seluruh datasantri dibagi datasantriperpage(5) kemudian dibulatkan
    for (let i = 1; i <= Math.ceil(currentDataSantriLength / dataSantriPerPage); i++) {
      // hasil looping dipush / disimpan kedalam variabel paginationNumbers yg digunakan untuk menghitung jumlah paginationya
      paginationNumbers.push(i)
    }

    this.setState({
      dataSantriWithLimit, // merubah this.state.dataSantriWithLimit menjadi (variabel) dataSantriWithLimit
      paginationNumbers // merubah this.state.paginationNumbers menjadi (variabel) paginationNumbers
    })
  }

  onMovePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    }, () => this.setPagination())
  }

  onPreviousPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage > 1
        ? prevState.currentPage - 1
        : prevState.currentPage
    }), () => this.setPagination())
  }

  onNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage < this.state.paginationNumbers.length
        ? prevState.currentPage + 1
        : prevState.currentPage
    }), () => this.setPagination())
  }

  render () {
    const {
      onHandleInput,
      onHandlePost,
      onHandleUpdate,
      onHandleDelete,
      onSearchSantri,
      onDataUpdate,
      onMovePage,
      onPreviousPage,
      onNextPage
    } = this

    const {
      postDataSantri,
      value,
      paginationNumbers,
      dataSantriWithLimit,
      currentPage
    } = this.state

    return (
      <div
        className='bg-info text-light pt-2 px-2'
        style={{ minHeight: '100vh', overflow: 'hidden' }}
      >
        <Header />

        <MenuBar
          postDataSantri={postDataSantri}
          value={value}
          onHandleInput={onHandleInput}
          onHandlePost={onHandlePost}
          onSearchSantri={onSearchSantri}
        />

        <Contents
          value={value}
          dataSantri={dataSantriWithLimit}
          newDataSantri={dataSantriWithLimit}
          postDataSantri={postDataSantri}
          onDataUpdate={onDataUpdate}
          onHandleInput={onHandleInput}
          onHandleUpdate={onHandleUpdate}
          onHandleDelete={onHandleDelete}
        />

        <PaginationButton
          currentPage={currentPage}
          paginationNumbers={paginationNumbers}
          onMovePage={onMovePage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />

        {/* <div className='ml-3 mt-3'>
          Copyright 2020 by <a href='https://github.com/Diko99/crudEa' style={{ color: 'yellow', textDecoration: 'none' }}>Diko Mahendra</a>
        </div> */}
      </div>
    )
  }
}

export default App
