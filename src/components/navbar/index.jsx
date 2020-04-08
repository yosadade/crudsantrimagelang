import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navbar } from 'reactstrap'
import { ActionButton, ActionModal, ActionSearch } from '../action'

class MenuBar extends Component {
  render () {
    const inputDataModal = [
      {
        label: 'name',
        nameLabel: 'Nama Santri',
        typeInput: 'text',
        nameInput: 'name',
        idInput: 'name',
        placeholderInput: 'nama santri',
        valueInput: this.props.postDataSantri.name,
        onChangeInput: this.props.onHandleInput
      },
      {
        label: 'studyProgram',
        nameLabel: 'Jurusan Santri',
        typeInput: 'text',
        nameInput: 'studyProgram',
        idInput: 'studyProgram',
        placeholderInput: 'jurusan santri',
        valueInput: this.props.postDataSantri.studyProgram,
        onChangeInput: this.props.onHandleInput
      }
    ]

    const inputActionButtonModal = [
      {
        titleButton: 'Simpan',
        colorButton: 'info',
        className: 'px-5',
        outlineButton: false,
        onClickButton: this.props.onHandlePost
      },
      {
        titleButton: 'Batal',
        colorButton: 'secondary',
        className: 'px-5',
        outlineButton: true,
        onClickButton: () => {}
      }
    ]

    return (
      <div className='container-fluid p-4'>
        <Navbar
          color='light'
          light
          expand='md'
          className='rounded'
        >
          <ActionButton
            titleButton='Tambah Santri'
            colorButton='info'
            onClickButton={() => this.actionModal.onToggleModal()}
          />

          <ActionModal
            ref={ref => { this.actionModal = ref }}
            inputDataModal={inputDataModal}
            inputActionButtonModal={inputActionButtonModal}
            titleHeader='Tambah Data Santri'
            postDataSantri={this.props.postDataSantri}
            onHandleInput={this.props.onHandleInput}
            onHandlePost={this.props.onHandlePost}
          />

          <ActionSearch
            onSearchSantri={this.props.onSearchSantri}
          />
        </Navbar>
      </div>
    )
  }
}

MenuBar.propTypes = {
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func,
  onHandlePost: PropTypes.func,
  onSearchSantri: PropTypes.func
}

export default MenuBar
