const bigTeams = [
  "India",
  "Australia",
  "England",
  "Pakistan",
  "South Africa",
  "Sri Lanka",
  "West Indies",
  "New Zealand",
];

const isBigTeam = (teamName) =>
  bigTeams.some((bigTeam) => teamName.includes(bigTeam));

const updateTeamInfo = (team1, score1, team2, score2) => {
  const team1Element = document.querySelector(".team-1");
  const team1ScoreElement = document.querySelector(".team-1-score");
  const team2Element = document.querySelector(".team-2");
  const team2ScoreElement = document.querySelector(".team-2-score");

  if (team1Element && team1ScoreElement) {
    team1Element.textContent = `Team 1: ${team1}`;
    team1ScoreElement.textContent = `Score 1: ${score1}`;
  }
  if (team2Element && team2ScoreElement) {
    team2Element.textContent = `Team 2: ${team2}`;
    team2ScoreElement.textContent = `Score 2: ${score2}`;
  }
};

const logLiveMatchScores = (matches) => {
  matches.forEach((match) => {
    if (match.ms === "live") {
      const team1 = match.t1.split("[")[0].trim();
      const team2 = match.t2.split("[")[0].trim();
      const score1 = match.t1s;
      const score2 = match.t2s;

      if (isBigTeam(team1) || isBigTeam(team2)) {
        console.log(`Match Date: ${match.dateTimeGMT}`);
        console.log(`Team 1: ${team1}`);
        console.log(`Score 1: ${score1}`);
        console.log(`Team 2: ${team2}`);
        console.log(`Score 2: ${score2}`);
        console.log("---");

        // Update the HTML with team information and scores
        updateTeamInfo(team1, score1, team2, score2);
      }
    }
  });
};

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.cricapi.com/v1/cricScore?apikey=27404da8-42ea-4164-8d23-e84355018199"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

let lastData = [];

const updateScores = async () => {
  const newData = await fetchData();

  if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
    console.clear();
    logLiveMatchScores(newData);
    lastData = newData;
  }
};

setInterval(updateScores, 30000);
updateScores();
