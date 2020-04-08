import React from 'react'
import DataSantri from './dataSantri'
import PageNotFound from './page404'
import PropTypes from 'prop-types'

const Contents = (props) => {
  return (
    <div className='container-fluid p-4'>
      {
        props.dataSantri
          ? <DataSantri {...props} />
          : <PageNotFound />
      }
    </div>
  )
}

Contents.propTypes = {
  dataSantri: PropTypes.array
}

export default Contents
