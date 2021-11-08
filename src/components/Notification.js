/* eslint-disable react/react-in-jsx-scope */
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <div className={type}>{message}</div>
    </div>
  )
}

export default Notification