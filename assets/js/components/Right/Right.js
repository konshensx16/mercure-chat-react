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
            id: null,
            _conversationIndex: -1,
            eventSource: null
        }
    }

    // scroll down to the latest message
    scrollDown() {
        this.bodyRef.current.scrollTop = this.bodyRef.current.scrollHeight;
    }

    componentDidUpdate(prevProps) {
        if (
            this.state._conversationIndex != -1
            && this.props.items[this.state._conversationIndex].messages?.length
            && prevProps.items[this.state._conversationIndex].messages?.length
        ) {
            this.scrollDown();
        }
    }

    componentDidMount() {
        const _t = this;
        const id = this.props.match.params.id;
        const _conversationIndex = this.props.items.findIndex(
            conversation => {
                return conversation.conversationId == this.props.match.params.id
            }
        );
        this.setState({
            _conversationIndex: _conversationIndex
        });
        if (this.props.items[_conversationIndex].messages == undefined) {
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
                        debugger
                        _t.props.postMessage(data, data.conversation.id);
                    }
                }
            });
        } else {
            this.scrollDown();
        }

    }

    componentWillUnmount() {
        if (this.state.eventSource instanceof EventSource) {
            this.state.eventSource.close();
            this.setState({
                eventSource: null
            })
        }
    }


    render() {

        return (
            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white" ref={this.bodyRef}>
                    {
                        this.state._conversationIndex != -1
                        && this.props.items != undefined
                        && this.props.items[this.state._conversationIndex].messages != undefined
                            ? this.props.items[this.state._conversationIndex]
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