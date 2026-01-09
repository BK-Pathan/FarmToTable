import React from 'react';
import './teamCard.css';
export default function TeamCard({ member }){
  return (
    <div className="team-card">
      <img src={member.image} alt={member.name} className="team-photo" />
      <h4 className="team-name">{member.name}</h4>
      <div className="team-role">{member.role}</div>
    </div>
  );
}
