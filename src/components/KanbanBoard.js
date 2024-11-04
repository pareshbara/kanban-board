import React, { useState } from 'react';
import Ticket from './Ticket';
import '../KanbanBoard.css';

const statusIcons = {
  "To Do": "/icons/To-do.svg",
  "In Progress": "/icons/in-progress.svg",
  "Done": "/icons/Done.svg",
  "Cancelled": "/icons/Cancelled.svg"
};

function KanbanBoard({ tickets = [] }) {
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  const groupedTickets = groupTickets(tickets, groupBy, sortBy);

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <div className="dropdown">
          <button className="dropbtn">Display <img src="/icons/Display.svg" alt="Display Icon"/></button>
          <div className="dropdown-content">
            <label>Grouping</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
            <label>Ordering</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <div className="column-header">
              {statusIcons[group] && <img src={statusIcons[group]} alt={group} className="status-icon" />}
              {group} <span>({groupedTickets[group].length})</span>
            </div>
            {groupedTickets[group].map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function groupTickets(tickets, groupBy, sortBy) {
  if (!Array.isArray(tickets)) return {}; // Ensure tickets is an array

  const grouped = {};
  
  tickets.forEach((ticket) => {
    const groupKey = ticket[groupBy] || 'Unassigned';
    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push(ticket);
  });

  Object.keys(grouped).forEach((group) => {
    grouped[group] = grouped[group].sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  });

  return grouped;
}

export default KanbanBoard;
