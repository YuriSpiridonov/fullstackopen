import React from 'react'
// import { useDispatch } from "react-redux"
import { connect } from 'react-redux' // connect
import { filterChange } from './../reducers/filterReducer'

// const Filter = () => {
const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    return (
      // dispatch(filterChange(filter))
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

export default ConnectedFilter // Filter