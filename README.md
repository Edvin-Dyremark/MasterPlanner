# Master Planner

## Project Overview

Master Planner is a web application designed to simplify the process of selecting master courses for students at LiU university. This project was created as part of the course: TDDD27 - Advanced programming.

## Functional Specification

### Users

- Registration & Authentication: Users must be logged in to use the website and related tools.

### Courses

Course Creation: Users can add courses, entering the following information:

- Course Name
- Course Code
- Schedule Block
- Exam format
- Level & Credits (advanced, basic)

Sharing: Created courses are searchable and available for selection for other users.

### Planner

- Calendar: Seleced courses should be automatically added to a sort of "grid", with year/period on one axis and schedule block on the other.
- Users should have the option to select multiple courses in the same block, and adding additional columns for extracurricular or work related activities.

### Master's Requirement Check

- The application automatically checks and verifies that finished "plans" meet the neccessary credit requirements

## Technological Specification

### Frontend

Vue.js, chosen for its simplicity, detailed documentation and easy-of-use.

### Backend

Firebase, providing solutions for hosting and authentication without server management

#### Server

Firestore, part of the firebase platform. offers Real-time data syncronization and integration with firebase services.
