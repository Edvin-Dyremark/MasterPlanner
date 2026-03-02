/**
 * Creates a grid structure for representing periods and blocks.
 * periodsPerYear is an object mapping year to its period prefixes,
 * e.g. { "1": ["HT1","HT2","VT1","VT2"], "2": ["HT1","HT2"] }
 */
export function createGridStructure(totalBlocks, periodsPerYear) {
  let grid = {};
  for (const [year, periods] of Object.entries(periodsPerYear)) {
    for (const period of periods) {
      let periodKey = `${year} - ${period}`;
      grid[periodKey] = {
        name: periodKey,
        courses: Array(totalBlocks)
          .fill()
          .map(() => []),
      };
    }
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
