async function activityTable(day) {
  // Read contents of log files
  let logFileList = await textFile("camera_logs.txt");
  let table = Array(24).fill(0);
  const logFiles = logFileList.split("\n");
  const logFileCountArrayPromises = logFiles.map(async (filename) => {
    const timestampsString = await textFile(filename);
    const timestamps = timestampsString.split("\n").map( (timestampString) => parseInt(timestampString, 10));
    const dates = timestamps.map((timestamp) => new Date(timestamp)).filter((date) => date.getDay() === day);
    let counts = Array(24).fill(0);
    dates.forEach( (date) => counts[date.getHours()] += 1);
    return counts;
  });
  const logFileCountArrays = await Promise.all(logFileCountArrayPromises);
  for (const countArray of logFileCountArrays) {
    for (let i = 0; i < table.length; i++) {
         table[i] += countArray[i];
       }
    }
  return table;
}


activityTable(1)
  .then(table => console.log(activityGraph(table)));
