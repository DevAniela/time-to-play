# Timp de Joacă

This project is an adaptation of a tutorial from "Crash Course: Build a Full-Stack Web App in a Weekend!" created by Jonas Schmedtmann, aimed at teaching the fundamentals of modern web development by building a React application. The app is in Romanian and tailored for practical use as a collection of face-to-face games aimed at children, particularly in hospital settings where creative engagement is important.

## Project Overview

The application serves as a repository of face-to-face games that encourage children to take a break from technology and use creative thinking to connect with others. Inspired by theatre games, the app includes categories such as warm-up games, identity games, storytelling games, games about emotions, online games, relaxation games, and reflection games.

Users can post game rules, which can be voted on as cute, super-cute, or boring. Games with more boring votes than cute and super-cute combined display a [🥱boring] flag next to their rules. After submission, games are sent to a Supabase database for review and, upon approval, are displayed on the website.

## How to Post Games

To contribute a new game to the Timp de joacă collection:

1. Click on "Scrie un joc" (Write a game) button in the header.
2. Fill out the game rules in the provided form, including selecting a category.
3. Click "Trimite" (Submit) to submit your game.
4. Your submission will be reviewed by administrators via Supabase.
5. Once approved, your game will appear on the website for others to enjoy.

## Future Enhancements

Future plans include:

- Adding specific questions for each game to facilitate discussions among participants.
- Defining objectives for each game to guide coordinators.

## Technologies Used

- Frontend: React, HTML, CSS, JavaScript
- Backend: Supabase (for database storage and management)
- Deployment: Hosted on Netlify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

---

For more advanced configurations, deployment options, and troubleshooting tips, refer to the original [Create React App README](https://github.com/facebook/create-react-app#readme).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project is an adaptation of a tutorial from Jonas Schmedtmann's "Crash Course: Build a Full-Stack Web App in a Weekend!" The original tutorial focused on building an application for posting facts, while this adaptation focuses on creating a platform for posting games.
