import React from 'react';
import {connect} from 'react-redux'
import * as actionCreators from '../../actions/conversation'

import Input from "./Input";
import Message from "./Message";

const mapStateToProps = (state) => {
    return state;
};

class Right extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    id: 1,
                    message: 'Hello world'
                }
            ]
        };

    }
    componentDidUpdate(prevProps) {
        // fetch the messages for this conversation
        const id = this.props.match.params.id;
        if (id !== prevProps.match.params.id) {
            // call the fetch function again
            this.props.fetchMessages(id);
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchMessages(id);
    }

    render() {
        const _conversationIndex = this.props.items.findIndex(
            conversation => conversation.conversationId == this.props.match.params.id
        );
        return (
            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white" ref="messagesBody">
                    {
                        this.props.items[_conversationIndex].messages != undefined
                            ? this.props.items[_conversationIndex]
                                .messages.map((message, index) => {
                            return (
                                <Message message={message} key={index}/>
                            )
                        }) : ''
                    }
                </div>

                <Input/>
            </div>
        );
    }
}

export default connect(mapStateToProps, actionCreators)(Right);