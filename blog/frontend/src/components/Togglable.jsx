import { useImperativeHandle, useState, forwardRef } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const shownWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div style={{ padding: '5px' }}>
      <Button style={hiddenWhenVisible} onClick={() => setVisible(true)}>
        {' '}
        {props.buttonName}
      </Button>
      <div style={shownWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={() => setVisible(false)}>
          {props.hideButtonName ? props.hideButtonName : 'cancel'}{' '}
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
