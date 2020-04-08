import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Collapse,
  Nav,
  NavItem,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap'

const ActionButton = (props) => {
  return (
    <Button
      color={props.colorButton}
      outline={props.outlineButton}
      className={props.className}
      onClick={props.onClickButton}
    >
      {props.titleButton}
    </Button>
  )
}

const ActionInput = (props) => {
  return (
    <Input
      type={props.typeInput}
      name={props.nameInput}
      id={props.idInput}
      className={props.className}
      placeholder={props.placeholderInput}
      value={props.valueInput}
      onChange={(e) => props.onChangeInput(e)}
    />
  )
}

class ActionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModalVisible: false
    }
  }

  onToggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render () {
    return (
      <Modal
        isOpen={this.state.isModalVisible}
        toggle={() => this.onToggleModal()}
      >
        {this.renderModalHeader()}
        {this.renderModalBody()}
        {this.renderModalFooter()}
      </Modal>
    )
  }

  renderModalHeader = () => {
    return (
      <ModalHeader
        className={this.props.className}
      >
        {this.props.titleHeader}
      </ModalHeader>
    )
  }

  renderModalBody = () => {
    return (
      <ModalBody className={this.props.classNameBody}>
        <Form>
          {this.props.inputDataModal.map((item, index) => {
            return this.renderFormGroup(item, index)
          })}
        </Form>
      </ModalBody>
    )
  }

  renderFormGroup = (props, index) => {
    return (
      <FormGroup key={index}>
        <Label for={props.label}>{props.nameLabel}</Label>
        <ActionInput {...props} />
      </FormGroup>
    )
  }

  renderModalFooter = () => {
    return (
      <ModalFooter className={this.props.className}>
        {this.props.inputActionButtonModal.map((item, index) => {
          return (
            <ActionButton
              key={index}
              titleButton={item.titleButton}
              colorButton={item.colorButton}
              className={item.className}
              outlineButton={item.outlineButton}
              onClickButton={() => {
                item.onClickButton()
                this.onToggleModal()
              }}
            />
          )
        })}
      </ModalFooter>
    )
  }
}

const ActionSearch = (props) => {
  return (
    <Collapse navbar>
      <Nav className='ml-auto'>
        <NavItem>
          <ActionInput
            typeInput='search'
            className='form-control mr-sm-2'
            placeholderInput='cari santri'
            onChangeInput={(e) => props.onSearchSantri(e)}
          />
        </NavItem>
      </Nav>
    </Collapse>
  )
}

ActionButton.propTypes = {
  titleButton: PropTypes.string,
  colorButton: PropTypes.string,
  className: PropTypes.string,
  outlineButton: PropTypes.bool,
  onClickButton: PropTypes.func
}

ActionInput.propTypes = {
  typeInput: PropTypes.string,
  nameInput: PropTypes.string,
  idInput: PropTypes.string,
  className: PropTypes.string,
  placeholderInput: PropTypes.string,
  valueInput: PropTypes.string,
  onChangeInput: PropTypes.func
}

ActionModal.propTypes = {
  inputDataModal: PropTypes.array,
  inputActionButtonModal: PropTypes.array,
  titleHeader: PropTypes.string,
  className: PropTypes.string,
  classNameBody: PropTypes.string,
  postDataSantri: PropTypes.object,
  onHandleInput: PropTypes.func
}

ActionSearch.propTypes = {
  onSearchSantri: PropTypes.func
}

export { ActionButton, ActionModal, ActionSearch }
