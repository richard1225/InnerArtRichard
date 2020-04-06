import React, { useState } from 'react'

const SearchBox = () => {
  const [input, setInput] = useState('')

  const handleSubmit = event => setInput(event.target.value)
  return (
    <form>
      <input
        style={{ width: '450px', marginBottom: '20px' }}
        type="text"
        className="form-control form-rounded"
        placeholder="Search ..."
        value={input}
        onChange={handleSubmit}
      />
      <button type="submit">
        <i className="fas fa-search" />
      </button>
    </form>
  )
}

export default SearchBox
