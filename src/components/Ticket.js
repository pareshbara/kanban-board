import React from 'react';
import '../Ticket.css';

const priorityIcons = [
  "/icons/No-priority.svg",
  "/icons/Img - Low Priority.svg",
  "/icons/Img - Medium Priority.svg",
  "/icons/Img - High Priority.svg",
  "/icons/SVG - Urgent Priority colour.svg"
];

function Ticket({ ticket }) {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <h4>{ticket.title}</h4>
        <img src="/icons/3 dot menu.svg" alt="menu" className="menu-icon" />
      </div>
      <p>{ticket.description}</p>
      <div className="ticket-footer">
        <div className="priority">
          <img src={priorityIcons[ticket.priority]} alt="priority" className="priority-icon" />
          <span>{["No Priority", "Low", "Medium", "High", "Urgent"][ticket.priority]}</span>
        </div>
        <img src={ticket.userAvatar || '/icons/default-avatar.svg'} alt="user avatar" className="avatar" />
      </div>
    </div>
  );
}

export default Ticket;
