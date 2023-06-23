import { Component } from "react";
import React from "react";

class Messages extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="Messages-list">
        {messages.map((m) => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const { member, text } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    // uzimam prvo slovo iz imena ovdje
    const firstLetter = member.clientData.username.substring(0, 1);

    return (
      <li className={className}>
        <div
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        >
          <span className="avatar-letter">{firstLetter}</span>
        </div>
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
