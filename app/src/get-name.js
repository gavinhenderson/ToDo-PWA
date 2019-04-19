import React from 'react';

class GetName extends React.Component {
  constructor() {
    super();

    this.nameInput = React.createRef();
  }

  changeName = () => {
    const { changeName } = this.props;

    changeName(this.nameInput.current.value);
  };

  render() {
    return (
      <div>
        <p>Enter your name:</p>
        <input ref={this.nameInput} />
        <button onClick={this.changeName}>Save name</button>
      </div>
    );
  }
}

export default GetName;
