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
        var taskIsAnEmptyString = note.task.trim(); 
        
        if (taskIsAnEmptyString) {
            return;
        }
        
        var originalNote = _.find(this.state.notes, { id: note.id });
        originalNote.task = note.task;
        
        var index = this.state.notes.indexOf(originalNote);
        
        this.setState({
            notes: [...this.state.notes.slice(0, index), 
                originalNote, 
                ...this.state.notes.slice(index + 1)]
        });
    }
}

export default App;