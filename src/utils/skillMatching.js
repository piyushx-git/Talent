// Skill matching algorithm for team formation
export const calculateSkillMatch = (studentSkills, teamRequirements) => {
  // Normalize skill levels to 0-1 range
  const normalizeSkill = (level) => {
    return Math.min(Math.max(level / 5, 0), 1);
  };

  // Calculate weighted match score
  const calculateMatchScore = (studentSkills, requirements) => {
    let totalWeight = 0;
    let weightedScore = 0;

    for (const [skill, requiredLevel] of Object.entries(requirements)) {
      const studentLevel = studentSkills[skill] || 0;
      const normalizedRequired = normalizeSkill(requiredLevel);
      const normalizedStudent = normalizeSkill(studentLevel);
      
      // Calculate similarity score (1 - absolute difference)
      const similarity = 1 - Math.abs(normalizedRequired - normalizedStudent);
      
      // Weight the score based on required level
      weightedScore += similarity * requiredLevel;
      totalWeight += requiredLevel;
    }

    return totalWeight > 0 ? weightedScore / totalWeight : 0;
  };

  // Calculate complementary skills score
  const calculateComplementaryScore = (studentSkills, teamSkills) => {
    let complementaryScore = 0;
    let totalSkills = 0;

    for (const [skill, level] of Object.entries(studentSkills)) {
      const teamLevel = teamSkills[skill] || 0;
      // Higher score when student has skills that team lacks
      if (level > teamLevel) {
        complementaryScore += (level - teamLevel) / 5;
      }
      totalSkills++;
    }

    return totalSkills > 0 ? complementaryScore / totalSkills : 0;
  };

  // Calculate overall match score
  const matchScore = calculateMatchScore(studentSkills, teamRequirements);
  const complementaryScore = calculateComplementaryScore(studentSkills, teamRequirements);
  
  // Weight the scores (70% match score, 30% complementary score)
  return 0.7 * matchScore + 0.3 * complementaryScore;
};

// Team formation algorithm
export const formOptimalTeam = (students, teamSize, requirements) => {
  const teams = [];
  const remainingStudents = [...students];

  while (remainingStudents.length >= teamSize) {
    const team = [];
    const teamSkills = {};

    // Select first student based on highest match score
    const firstStudent = remainingStudents.reduce((best, student) => {
      const bestScore = best ? calculateSkillMatch(best.skills, requirements) : 0;
      const currentScore = calculateSkillMatch(student.skills, requirements);
      return currentScore > bestScore ? student : best;
    }, null);

    team.push(firstStudent);
    remainingStudents.splice(remainingStudents.indexOf(firstStudent), 1);

    // Update team skills
    Object.entries(firstStudent.skills).forEach(([skill, level]) => {
      teamSkills[skill] = level;
    });

    // Select remaining team members
    while (team.length < teamSize) {
      const bestMatch = remainingStudents.reduce((best, student) => {
        const bestScore = best ? calculateSkillMatch(best.skills, requirements) : 0;
        const currentScore = calculateSkillMatch(student.skills, requirements);
        return currentScore > bestScore ? student : best;
      }, null);

      team.push(bestMatch);
      remainingStudents.splice(remainingStudents.indexOf(bestMatch), 1);

      // Update team skills
      Object.entries(bestMatch.skills).forEach(([skill, level]) => {
        teamSkills[skill] = Math.max(teamSkills[skill] || 0, level);
      });
    }

    teams.push({
      members: team,
      teamSkills,
      matchScore: calculateSkillMatch(teamSkills, requirements),
    });
  }

  return teams;
};

// Mentor matching algorithm
export const matchMentor = (studentSkills, mentors) => {
  return mentors.reduce((best, mentor) => {
    const bestScore = best ? calculateSkillMatch(best.skills, studentSkills) : 0;
    const currentScore = calculateSkillMatch(mentor.skills, studentSkills);
    return currentScore > bestScore ? mentor : best;
  }, null);
};

// Example usage:
/*
const students = [
  { id: 1, name: 'John', skills: { programming: 4, design: 3, communication: 5 } },
  { id: 2, name: 'Jane', skills: { programming: 5, design: 4, communication: 3 } },
  // ... more students
];

const requirements = {
  programming: 4,
  design: 3,
  communication: 4
};

const teams = formOptimalTeam(students, 3, requirements);
*/ 