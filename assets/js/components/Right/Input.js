import React from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/conversation'

const mapStateToProps = (state) => {
    return state;
};

class Input extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        event.preventDefault();
        this.props.addMessage(this.state.content, this.props.id).then(() => {
            this.setState({content: ''})
        });
    }

    handleChange(event) {
        this.setState(
            {content: event.target.value}
        )
    }

    render() {
        return (
            <form action="#" className="bg-light">
                <div className="input-group">
                    <input type="text" placeholder="Type a message"
                           aria-describedby="button-addon2"
                           onChange={this.handleChange}
                           value={this.state.content}
                           className="form-control rounded-0 border-0 py-4 bg-light"/>
                    <div className="input-group-append">
                        <button id="button-addon2" type="submit"
                                onClick={this.sendMessage}
                                className="btn btn-link">
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect(mapStateToProps, actionCreators)(Input);