import React from 'react';

import Input from "./Input";
import Message from "./Message";

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

    render() {
        return (
            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white" ref="messagesBody">
                    {
                        this.state.messages.map((message, index) => {
                            return (
                                <Message message={message} key={index}/>
                            )
                        })
                    }
                </div>

                <Input/>
            </div>
        );
    }
}

export default Right;