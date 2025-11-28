import React from "react";

export default function Leaderboard({ list = [] }) {
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ol>
        {list.map((e, i) => (
          <li key={e.id}>
            <span className="rank">{i+1}</span>
            <span className="name">{e.name}</span>
            <span className="xp">{e.total_xp} XP</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
