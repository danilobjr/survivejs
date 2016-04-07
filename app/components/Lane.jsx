import React from 'react';
import Note from './Note';
import keyCodes from './../common/keyCodes';
import eventTypes from './../common/eventTypes';

class Lane extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editing: false
        };
    }
    
    render() {
        return (
            <div className="lane-container">
                {this.renderTitle()}
                {this.renderNotes()}
            </div>
        );
    }
    
    renderTitle() {
        if (this.state.editing) {
            return (
                <h3 className="title">
                    <input 
                        type="text" 
                        defaultValue={this.props.name} 
                        autoFocus={true}
                        onKeyDown={this.saveLane.bind(this)}
                        onBlur={this.saveLane.bind(this)} 
                    />
                </h3>
            );
        }
        
        return (
            <h3 className="title" onClick={this.edit.bind(this)}>
                {this.props.name}
                <button className="add-note" onClick={this.addNote.bind(this)}>+</button>
                <span className="remove-lane" onClick={this.removeLane.bind(this)}>&times;</span>
            </h3>
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
    
    edit() {
        this.setState({ editing: true });
    }
    
    saveLane(e) {
        if (e.keyCode === keyCodes.enterKey || e.type === eventTypes.blur) {            
            this.setState({ editing: false });
            this.props.onSaveLane(this.props.id, e.target.value);
        }
    }
    
    removeLane(e) {
        e.stopPropagation();
        var laneId = this.props.id;
        this.props.onRemoveLane(laneId);
    }
    
    addNote(e) {
        e.stopPropagation();
        var laneId = this.props.id;
        this.props.onAddNote(laneId);
    }
}

export default Lane;