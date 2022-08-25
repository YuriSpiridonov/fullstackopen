import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const CreateNew = (props) => {
  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    if (event.type === 'submit') {
      event.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }
  }

  const resetForm = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='create'>create</button>
        <button type='reset' onClick={resetForm}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew