# Tic-tac-toe

The good old tic-tac-toe game built with Next.js.

## Persistent Storage

The game state is written to IDB as actions are performed. There is a in-memory cache facilitated by [Tanstack Query](https://tanstack.com/query/v3/) purely to enable UI component reactiveness, but could also be useful if network data comes into play.

There are 2 records in the IDB storage:
* Unfinished game
  - This is fetched from IDB at the root route '/', if it is not falsy, the player gets redirected to the '/play' route, which loads the `UnfinishedGame` data into the `<Board />` component.
  - This is removed from IDB when a winner is announced, which is computed with every change to the game board.
  - If a user visits the '/play' route with a falsy `UnfinishedGame` value in IDB, the app redirects back to the root '/' route, which handles game initialisation.
* Games
  - This is a list of `Game` data, which contains all the moves that took place in each game.
  - A new game is added to this list when a winner is announced.
  - Currently there is no UI to inspect this list.

## Testing

Unit, component (shadow) and e2e tests are carried out in this repo. I did not get to completely test out all the code but the setup should allow for easy additional of test cases.

### Unit & component tests (Vitest)

Vitest is really easy to set up with minimal configuration, it also has compatible API with Jest, so we can incrementally migrate if needed.

### E2E tests (Cypress)

Cypress is one of the recommended testing frameworks by Vercel, and it also has a nice UI layer to visualise tests results out-of-the-box.

## Code Coerage



The code coverage results are uploaded to [Codecov](https://app.codecov.io/gh/imding/tic-tac-toe)
