function activityTable(day) {
  // Read contents of log files
  let table = Array(24).fill(0);
  return textFile("camera_logs.txt").then((files) => { 
      return Promise.all(files.split("\n").map((filename) => {
        return textFile(filename).then((log) => {
          const timestamps = log.split("\n").map((timestampString) => parseInt(timestampString, 10));
          const dates = timestamps.map( (timestamp) => new Date(timestamp)).filter( (date) => date.getDay() === day);
          let dayHist = Array(24).fill(0);
          dates.forEach(date => dayHist[date.getHours()] += 1);
          return dayHist;
        });
    })).then((dayHistograms) => {
        for (const dayHist of dayHistograms) {
          for (let i = 0; i < 24; i++) {
            table[i] += dayHist[i];
          }
        }
        return table;});
})};


activityTable(6)
  .then(table => console.log(activityGraph(table)));

