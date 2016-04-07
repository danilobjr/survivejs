import React from 'react';
import keyCodes from './../common/keyCodes';
import eventTypes from './../common/eventTypes';

const styles = {
    span: {
        display: 'block'
    },
    input: {
        display: 'none'
    },
    editing: {
        span: {
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
            editing: false
        };
    }
    
    render() {
        if (this.state.editing) {
            return this.renderEdit();
        }
            
        return this.renderNote();
    }

    renderNote() {
        var spanStyle = (this.state.editing) ? styles.editing.span : styles.span;
        
        return (
            <li onClick={this.enterEditionMode.bind(this)}>
                <span style={spanStyle}>{this.props.task}</span>
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
                    onKeyDown={this.saveTask.bind(this)} 
                    onBlur={this.saveTask.bind(this)}
                />
            </li>
        );
    }
    
    enterEditionMode() {
        this.setState({ editing: true });
        //this.refs.taskInput.focus();
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
}

export default Note;