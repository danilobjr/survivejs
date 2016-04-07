import React from 'react';
import Note from './Note';

class Lane extends React.Component {
    render() {
        return (
            <div className="lane-container">
                <h3 className="title">{this.props.name}</h3>
                {this.renderNotes()}
            </div>
        );
    }
    
    renderNotes() {
        if (!this.props.notes) {
            return;
        }
        
        return (
            <ul className="notes">
                {this.props.notes.map(note =>
                    <Note 
                        key={note.id}
                        id={note.id} 
                        task={note.task}
                        laneId={this.props.id} 
                        onSaveNote={this.props.onSaveNote}
                        onRemoveNote={this.props.onRemoveNote} 
                    />
                )}
            </ul>
        );
    }
}

export default Lane;