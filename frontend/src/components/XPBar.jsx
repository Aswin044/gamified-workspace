import React from "react";

export default function XPBar({ xp, level }) {
  // threshold = 100 * level
  const threshold = 100 * (level || 1);
  const percent = Math.round(((xp || 0) / threshold) * 100);

  return (
    <div className="xpbar">
      <div className="xpbar-inner" style={{ width: `${Math.min(percent, 100)}%` }} />
      <div className="xpbar-label">Lv {level} • {xp}/{threshold} XP</div>
    </div>
  );
}
