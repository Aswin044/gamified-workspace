// simple xp mapping
function calculateXP(difficulty) {
  switch ((difficulty || "").toLowerCase()) {
    case "easy": return 10;
    case "medium": return 25;
    case "hard": return 50;
    default: return 0;
  }
}

// simple level up rule: levelUpThreshold = 100 * currentLevel
function applyXPAndLevel(employee, xpToAdd) {
  employee.total_xp += xpToAdd;
  employee.xp += xpToAdd;

  let threshold = 100 * employee.level;
  let leveledUp = false;

  while (employee.xp >= threshold) {
    employee.xp -= threshold;
    employee.level += 1;
    leveledUp = true;
    threshold = 100 * employee.level;
  }

  return { employee, leveledUp };
}

module.exports = {
  calculateXP,
  applyXPAndLevel
};
