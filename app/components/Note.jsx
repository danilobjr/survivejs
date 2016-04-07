import React from 'react';
import keyCodes from './../common/keyCodes';
import eventTypes from './../common/eventTypes';

const styles = {
    text: {
        display: 'block'
    },
    input: {
        display: 'none'
    },
    editing: {
        text: {
            display: 'none'
        },
        input: {
            display: 'block'
        }
    }
}

class Note extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editing: false,
            showRemoveButton: false
        };
    }
    
    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }
            
        return this.renderNote();
    }

    renderNote() {
        var textStyle = (this.state.editing) ? styles.editing.text : styles.text;
        
        return (
            <li 
                className="note"
                onClick={this.enterEditionMode.bind(this)}
            >
                <span style={textStyle}>{this.props.task}</span>
                {this.renderRemove()}
            </li>
        );
    }
    
    renderRemove() {
        return <span className="remove-button" onClick={this.removeNote.bind(this)}>&times;</span>;
    }
    
    renderEdit() {
        var inputStyle = (this.state.editing) ? styles.editing.input : styles.input;
        
        return (
            <li>
                <input
                    style={inputStyle} 
                    ref="taskInput"
                    type="text" 
                    defaultValue={this.props.task} 
                    autoFocus={true}
                    onKeyDown={this.saveTask.bind(this)} 
                    onBlur={this.saveTask.bind(this)}
                />
            </li>
        );
    }
    
    enterEditionMode() {
        this.setState({ editing: true });
    }
    
    saveTask(e) {
        if (e.keyCode === keyCodes.enterKey || e.type === eventTypes.blur) {
            this.setState({ editing: false });            
            this.props.onSaveNote(this.props.laneId, {
                id: this.props.id,
                task: this.refs.taskInput.value
            });
        }
    }
    
    removeNote(e) {
        e.stopPropagation();
        this.props.onRemoveNote(this.props.id);
    }
}

export default Note;