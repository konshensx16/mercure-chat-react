import React from 'react';


class Conversation extends React.Component {
    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action rounded-0">
                <div className="media">
                    <img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user"
                         width="50" className="rounded-circle"/>
                    <div className="media-body ml-4">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0">{this.props.conversation.username}</h6>
                            <small
                                className="small font-weight-bold">{this.props.conversation.createdAt}</small>
                        </div>
                        <p className="font-italic mb-0 text-small">{this.props.conversation.content}</p>
                    </div>
                </div>
            </a>
        );
    }
}

export default Conversation;