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

        this.bodyRef = React.createRef();
    }
    // scroll down to the latest message
    scrollDown() {
        this.bodyRef.current.scrollTop = this.bodyRef.current.scrollHeight;
        console.log(this.bodyRef.current.scrollHeight);
    }

    componentDidUpdate(prevProps, prevState) {
        // fetch the messages for this conversation
        const id = this.props.match.params.id;
        if (id !== prevProps.match.params.id) {
            // call the fetch function again
            this.props.fetchMessages(id);
        }
        // TODO: scroll to the bottom if the messages count changes
        const _conversationIndex = this.props.items.findIndex(
            conversation => {
                return conversation.conversationId == this.props.match.params.id
            }
        );

        if (
            _conversationIndex != -1
            && this.props.items[_conversationIndex].messages?.length
            && prevProps.items[_conversationIndex].messages?.length
        )
        {
            this.scrollDown();
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchMessages(id).then(() => {
            this.scrollDown();
        });
    }

    render() {
        const _conversationIndex = this.props.items.findIndex(
            conversation => {
                return conversation.conversationId == this.props.match.params.id
            }
        );
        return (
            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white" ref={this.bodyRef}>
                    {
                        this.props.items != undefined && this.props.items[_conversationIndex].messages != undefined
                            ? this.props.items[_conversationIndex]
                                .messages.map((message, index) => {
                            return (
                                <Message message={message} key={index}/>
                            )
                        }) : ''
                    }
                </div>

                <Input id={this.props.match.params.id} />
            </div>
        );
    }
}

export default connect(mapStateToProps, actionCreators)(Right);