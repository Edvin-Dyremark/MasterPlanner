/**
 * Creates a grid structure for representing periods and blocks..
 */
export function createGridStructure(
  totalPeriods,
  totalBlocks,
  periodPrefixes,
  years
) {
  let grid = {};
  for (let period = 0; period < totalPeriods; period++) {
    let yearIndex = Math.floor(period / periodPrefixes.length);
    let year = years[yearIndex];
    let periodKey = `${year} - ${
      periodPrefixes[period % periodPrefixes.length]
    }`;
    grid[periodKey] = {
      name: periodKey,
      courses: Array(totalBlocks)
        .fill()
        .map(() => []),
    };
  }
  return grid;
}

/**
 * Organizes courses into a previously created grid structure based on their period and block.
 *
 */
export function organizeCoursesIntoGrid(courses, grid, totalBlocks) {
  Object.keys(grid).forEach((key) => {
    grid[key].courses.forEach((_, index) => (grid[key].courses[index] = []));
  });

  courses.forEach((course) => {
    let periodKey = `${course.year} - ${course.period}`;
    let blockIndex = parseInt(course.block) - 1;
    if (grid[periodKey] && blockIndex >= 0 && blockIndex < totalBlocks) {
      grid[periodKey].courses[blockIndex].push(course);
    }
  });
  return grid;
}
