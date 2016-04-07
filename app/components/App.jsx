import React from 'react';
import Note from './Note';
import uuid from 'node-uuid';

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
                <ul>
                    {this.state.notes.map(note =>
                        <li key={note.id}>{note.task}</li> 
                    )}
                </ul>
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
}

export default App;