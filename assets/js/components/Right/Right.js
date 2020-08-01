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
        this.state = {
            eventSource: null
        }
    }

    // scroll down to the latest message
    scrollDown() {
        this.bodyRef.current.scrollTop = this.bodyRef.current.scrollHeight;
    }

    componentDidUpdate(prevProps) {
        const _conversationIndex = this.props.items.findIndex(
            conversation => {
                return conversation.conversationId == this.props.match.params.id
            }
        );

        // fetch the messages for this conversation
        const id = this.props.match.params.id;
        if (id !== prevProps.match.params.id) {
            // call the fetch function again but only if it's the first time.
            if (this.props.items[_conversationIndex].messages == undefined) {
                this.props.fetchMessages(id);
            }
        }
        if (
            _conversationIndex != -1
            && this.props.items[_conversationIndex].messages?.length
            && prevProps.items[_conversationIndex].messages?.length
        ) {
            this.scrollDown();
        }
    }

    componentDidMount() {
        const _t = this;
        const id = this.props.match.params.id;
        this.props.fetchMessages(id).then(() => {
            this.scrollDown();
            if (this.state.eventSource === null) {
                let url = new URL(this.props.hubUrl);
                url.searchParams.append('topic', `/conversations/${this.props.match.params.id}`)
                this.eventSource = new EventSource(url, {
                    withCredentials: true
                });
                this.eventSource.onmessage = function (event) {
                    const data = JSON.parse(event.data);
                    _t.props.postMessage(data, data.conversation.id);
                }
            }
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

                <Input id={this.props.match.params.id}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, actionCreators)(Right);