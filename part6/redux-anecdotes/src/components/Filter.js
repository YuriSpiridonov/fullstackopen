import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    return (
      props.filterChange(filter)
    )
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter