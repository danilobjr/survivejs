import React from 'react';
import Lane from './Lane';
import uuid from 'node-uuid';
import _ from 'lodash';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lanes: [
                {
                    id: uuid.v4(),
                    name: 'todo',                
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
                }                
            ]
        };
    }
    
    render() {              
        return (
            <div>
                <button onClick={this.addLane.bind(this)}>+</button>
                <div>
                    {this.renderLanes()}
                </div>
            </div>
        );
    }
    
    renderLanes() {
        return this.state.lanes.map((lane, index) => {
            return (
                <Lane 
                    key={index}
                    id={lane.id}
                    name={lane.name} 
                    notes={lane.notes}
                    onSaveLane={this.saveLane.bind(this)}
                    onSaveNote={this.saveNote.bind(this)} 
                    onRemoveNote={this.removeNote.bind(this)}
                />
            ); 
        });
    }
    
    addLane() {
        this.setState({
            lanes: [...this.state.lanes, { name: 'New Lane' }]
        });
    }
    
    // addNote() {
    //     this.setState({
    //         notes: [...this.state.notes, {
    //             id: uuid.v4(),
    //             task: 'New Task'
    //         }]
    //     });
    // }
    
    saveLane(laneId, newName) {
        const newNameIsEmpty = !newName;
        
        if (newNameIsEmpty) {
            return;
        }
        
        var lane = this.state.lanes.find(lane => lane.id === laneId);
        var laneIndex = this.state.lanes.indexOf(lane);
        lane.name = newName;
        
        this.setState({
            lanes: [
                ...this.state.lanes.slice(0, laneIndex), 
                lane, 
                ...this.state.lanes.slice(laneIndex + 1)
            ]
        });
    }
    
    saveNote(laneId, note) {
        var taskIsAnEmptyString = !note.task.trim(); 
        
        if (taskIsAnEmptyString) {
            return;
        }
        
        var lane = this.state.lanes.find(lane => lane.id === laneId);        
        
        lane.notes = lane.notes.map(currentNote => {
            if (currentNote.id === note.id) {
                currentNote.task = note.task;
            }
            
            return currentNote;
        });
        
        const laneIndex = this.state.lanes.indexOf(lane); 
        
        this.setState({
            lanes: [
                ...this.state.lanes.slice(0, laneIndex), 
                lane, 
                ...this.state.lanes.slice(laneIndex + 1)
            ]
        });
    }
    
    removeNote(noteId) {
        if (!noteId) {
            return;
        }
        
        var lane = this.state.lanes.find(lane => _.some(lane.notes, { id: noteId }));
        var index = this.state.lanes.indexOf(lane);
        _.remove(lane.notes, { id: noteId });
        
        this.setState({
            lanes: [
                ...this.state.lanes.slice(0, index), 
                lane, 
                ...this.state.lanes.slice(index + 1)
            ]
        });
    }
}

export default App;