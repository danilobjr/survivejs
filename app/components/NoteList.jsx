import React from 'react';
import Note from './Note';

class NoteList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.notes.map(note =>
                    <Note key={note.id} task={note.task} />
                )}
            </ul>
        );
    }
}

export default NoteList;