import React from 'react';
import NoteList from './NoteList';
import uuid from 'node-uuid';
import _ from 'lodash';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn webpack'
                },
                {
                    id: uuid.v4(),
                    task: 'Learn react'
                }
            ]
        };
    }
    
    render() {
        return (
            <div>
                <button onClick={this.addNote.bind(this)}>+</button>
                <NoteList 
                    notes={this.state.notes}
                    onSaveNote={this.saveNote.bind(this)} 
                    onRemoveNote={this.removeNote.bind(this)}
                />
            </div>
        );
    }
    
    addNote() {
        this.setState({
            notes: [...this.state.notes, {
                id: uuid.v4(),
                task: 'New Task'
            }]
        });
    }
    
    saveNote(note) {
        var taskIsAnEmptyString = !note.task.trim(); 
        
        if (taskIsAnEmptyString) {
            return;
        }
        
        const notes = this.state.notes.map(currentNote => {
            if (currentNote.id === note.id) {
                currentNote.task = note.task;
            }
            
            return currentNote;
        });
        
        this.setState(notes);
    }
    
    removeNote(noteId) {
        if (!noteId) {
            return;
        }
        
        const notes = this.state.notes.filter(note => note.id !== noteId);
        
        this.setState({notes});
    }
}

export default App;