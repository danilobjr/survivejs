import React from 'react';

const styles = {
    span: {
        display: 'block'
    },
    input: {
        display: 'none'
    },
    isInEditionMode: {
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
            isInEditionMode: false
        };
    }
    
    render() {
        var spanStyle = (this.state.isInEditionMode) ? styles.isInEditionMode.span : styles.span;
        var inputStyle = (this.state.isInEditionMode) ? styles.isInEditionMode.input : styles.input;
        
        return (
            <li onClick={this.enterEditionMode.bind(this)}>
                <span style={spanStyle}>{this.props.task}</span>
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
        this.setState({ isInEditionMode: true });
        this.refs.taskInput.focus();
    }
    
    saveTask(e) {
        let enterKey = 13;
        
        if (e.keyCode === enterKey || e.type === 'blur') {
            this.setState({ isInEditionMode: false });
        }
    }
}

export default Note;