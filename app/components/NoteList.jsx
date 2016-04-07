import React from 'react';
import Note from './Note';

class NoteList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.notes.map(note =>
                    <Note 
                        key={note.id}
                        id={note.id} 
                        task={note.task} 
                        onSaveNote={this.props.onSaveNote}
                        onRemoveNote={this.props.onRemoveNote} 
                    />
                )}
            </ul>
        );
    }
}

export default NoteList;