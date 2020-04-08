import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Table
} from 'reactstrap'
import { ActionButton, ActionModal } from '../../action'

let idDeleteSantri

const DataSantri = (props) => {
  return (
    <Table striped className='text-light'>
      <Thead />

      <Tbody {...props} />
    </Table>
  )
}

const Thead = () => {
  return (
    <thead>
      <tr>
        <th
          scope='col'
          style={{ width: '20%' }}
        >
          ID
        </th>
        <th
          scope='col'
          style={{ width: '30%' }}
        >
          Nama
        </th>
        <th
          scope='col'
          style={{ width: '25%' }}
        >
          Jurusan
        </th>
        <th
          scope='col'
          style={{ width: '25%' }}
          className='text-center'
        >
          Action
        </th>
      </tr>
    </thead>
  )
}

class Tbody extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalVisible: ''
    }
  }

  render () {
    const EditModal = this.state.modalVisible === 'ubah'
    const DeleteModal = this.state.modalVisible === 'delete'

    const inputActionButton = (item) => (
      [
        {
          titleButton: 'Hapus',
          colorButton: 'danger',
          className: 'mr-2',
          onClickButton: () => {
            this.setState({
              modalVisible: 'delete'
            })
            idDeleteSantri = item.id
            this.actionModal.onToggleModal()
          }
        },
        {
          titleButton: 'Ubah',
          colorButton: 'warning',
          className: '',
          onClickButton: () => {
            this.setState({
              modalVisible: 'ubah'
            })
            this.props.onDataUpdate(item)
            this.actionModal.onToggleModal()
          }
        }
      ]
    )

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

    const titleHeader = EditModal
      ? 'Update Data Santri'
      : DeleteModal
        ? 'Apakah anda yakin ingin menghapus data ini?'
        : ''

    const titleBtn = EditModal
      ? 'Ubah'
      : DeleteModal
        ? 'Hapus'
        : ''

    const colorBtnLeft = EditModal
      ? 'info'
      : DeleteModal
        ? 'secondary'
        : ''

    const colorBtnRight = EditModal
      ? 'secondary'
      : DeleteModal
        ? 'info'
        : ''

    const onClickBtn = EditModal
      ? () => {
        this.props.onHandleUpdate()
      }
      : DeleteModal
        ? () => {
          this.props.onHandleDelete(idDeleteSantri)
        }
        : () => { }

    const inputActionButtonModal = [
      {
        titleButton: titleBtn,
        colorButton: colorBtnLeft,
        className: 'px-5',
        outlineButton: DeleteModal,
        onClickButton: onClickBtn
      },
      {
        titleButton: 'Batal',
        colorButton: colorBtnRight,
        className: 'px-5',
        outlineButton: EditModal,
        onClickButton: onClickBtn
      }
    ]

    const className = DeleteModal ? 'justify-content-center border-0' : ''

    const classNameBody = DeleteModal ? 'd-none' : ''

    return (
      <tbody>
        {
          renderDataSantri(this.props).map((item, id) => (
            <tr key={id}>
              <th scope='row'>{item.id}</th>
              <td>{item.name}</td>
              <td>{item.studyProgram}</td>
              <td>
                <div className='row justify-content-center'>
                  {inputActionButton(item).map((itemBtn, index) => {
                    return (
                      <ActionButton
                        key={index}
                        titleButton={itemBtn.titleButton}
                        colorButton={itemBtn.colorButton}
                        className={itemBtn.className}
                        onClickButton={() => itemBtn.onClickButton()}
                      />
                    )
                  })}
                </div>
              </td>
            </tr>
          ))
        }

        <ActionModal
          ref={ref => { this.actionModal = ref }}
          inputDataModal={inputDataModal}
          inputActionButtonModal={inputActionButtonModal}
          titleHeader={titleHeader}
          className={className}
          classNameBody={classNameBody}
          postDataSantri={this.props.postDataSantri}
          onHandleInput={this.props.onHandleInput}
          onHandleUpdate={this.props.onHandleUpdate}
          onHandleDelete={this.props.onHandleDelete}
        />
      </tbody>
    )
  }
}

const renderDataSantri = (props) => {
  return props.value
    ? props.newDataSantri
    : props.dataSantri
}

Tbody.propTypes = {
  postDataSantri: PropTypes.object,
  onDataUpdate: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

ActionModal.propTypes = {
  postDataSantri: PropTypes.object,
  isModalVisible: PropTypes.bool,
  onToggleModal: PropTypes.func,
  onHandleInput: PropTypes.func,
  onHandleUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func
}

export default DataSantri
