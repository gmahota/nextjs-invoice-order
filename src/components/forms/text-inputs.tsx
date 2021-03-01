
export const TextInput = ({inline = false}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">Label</div>
    <input
      name="name"
      type="text"
      className="form-input"
      placeholder="Enter something..."
    />
    <div className="form-hint">This is a hint</div>
  </div>
)

export const InvalidTextInput = ({inline = false}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <input
      name="name"
      type="text"
      className="form-input form-input-invalid"
      placeholder="john@example.com"
    />
    <div className="form-error">First name is required</div>
  </div>
)

export const ValidTextInput = ({inline = false}) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <input
      name="name"
      type="text"
      className="form-input form-input-valid"
      placeholder="john@example.com"
    />
    <div className="form-success">First name is valid</div>
  </div>
)
