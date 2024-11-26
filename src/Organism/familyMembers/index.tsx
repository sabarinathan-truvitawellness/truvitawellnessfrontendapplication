
import React, { useState } from 'react';
import './familyMembers.scss';
import patientDummy from '../../Assets/images/header/profile-avatar-xxl.png'

interface Member {
  id: number;
  name: string;
  imageSrc: string;
}

const membersList: Member[] = [
  { id: 1, name: 'Steve Gerald', imageSrc: patientDummy },
  { id: 2, name: 'Amber Gerald', imageSrc: patientDummy },
];

export const FamilyMemebers: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const handleMemberSelect = (id: number) => {
    setSelectedMemberId(id);
  };

  return (
    <div className="family-member-selector">
      <a href="/appointments" className="back-link">Back to Appointments</a>
      <h2>Which Family Member requires Medical Assistance?</h2>
      <div className="members-container">
        {membersList.map((member) => (
          <div
            key={member.id}
            className={`member-card ${selectedMemberId === member.id ? 'selected' : ''}`}
            onClick={() => handleMemberSelect(member.id)}
          >
            <img src={member.imageSrc} alt={member.name} />
            <p>{member.name}</p>
          </div>
        ))}
        <div className="add-member-card">+</div>
      </div>
      <button className="confirm-button">Confirm Selected Member</button>
      <div className="action-buttons">
        <button className="add-member-button">Add Family Member</button>
        <button className="remove-member-button">Remove Member</button>
      </div>
    </div>
  );
};
