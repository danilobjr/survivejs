import React from 'react';

class Note extends React.Component {
    render() {
        return (
            <li>
                {this.props.task}
            </li>
        );
    }
}

export default Note;