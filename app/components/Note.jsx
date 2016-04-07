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
    remove: {
        display: 'none'
    },
    editing: {
        text: {
            display: 'none'
        },
        input: {
            display: 'block'
        }
    },
    hovering: {
        remove: {
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
        var removeStyle = (this.state.showRemoveButton) ? styles.hovering.remove : styles.remove;
        
        return (
            <li 
                className="note"
                onClick={this.enterEditionMode.bind(this)}
                onMouseEnter={this.showRemoveButton.bind(this)}
                onMouseLeave={this.hideRemoveButton.bind(this)}
            >
                <span style={textStyle}>{this.props.task}</span>
                <span 
                    className="remove-button" 
                    style={removeStyle}
                    onClick={this.removeNote.bind(this)}
                >
                    &times;
                </span>
            </li>
        );
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
    
    showRemoveButton() {
        this.setState({ showRemoveButton: true });
    }
    
    hideRemoveButton() {
        this.setState({ showRemoveButton: false });
    }
    
    saveTask(e) {
        if (e.keyCode === keyCodes.enterKey || e.type === eventTypes.blur) {
            this.setState({ editing: false });            
            this.props.onSaveNote({
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