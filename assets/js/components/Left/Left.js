import React from 'react';
import Conversation from "./Conversation";


class Left extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            conversations: [
                {
                    id: 1,
                    content: 'heheheheheh',
                    date: new Date(),
                    username: 'konshensx'
                }
            ]
        }
    }
    render() {
        return (
            <div className="col-5 px-0">
                <div className="bg-white">

                    <div className="bg-gray px-4 py-2 bg-light">
                        <p className="h5 mb-0 py-1">Recent</p>
                    </div>

                    <div className="messages-box">
                        <div className="list-group rounded-0">
                            {
                                this.state.conversations.map((conversation, index) => {
                                    return (
                                        <Conversation conversation={conversation} key={index}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Left;