# players API

Players

## Base URL

`https://api/v1/players`

## Endpoints

### 1. Create user

- **Endpoint:** `/api/v1/players/users/signup`
- **Method:** `POST`
- **Requirements for req body: name, email, password, passwordConfirm.
- **Description:** register user.

### 2. Login user

- **Endpoint:** `/api/v1/players/users/login`
- **Method:** `POST`
- **Requirements for req body: email, password.
- **Description:** user login.

### 3. Get all players

- **Endpoint:** `/api/v1/players/?page=1`
- **Method:** `GET`
- **Description:** gets all players.

### 4. Create new player

- **Endpoint:** `/api/v1/players`
- **Method:** `POST`
- **Requirements for req body: name, lastName, age, ranking, team.
- **Description:** create new player in database.

### 5. Get player by id

- **Endpoint:** `/api/v1/players/:id/card`
- **Method:** `GET`
- **Description:** get player by id.

### 6. Update player data

- **Endpoint:** `/api/v1/players/:id/card`
- **Method:** `PATCH`
- **Requirements for req body: name, lastName, age, ranking, team.
- **Description:** update player info.

### 7. Delete player data

- **Endpoint:** `/api/v1/players/:id/card`
- **Method:** `DELETE`
- **Description:** deletes player.

### 8. Get all players by team

- **Endpoint:** `/api/v1/players/teamPlayers/:team`
- **Method:** `GET`
- **Description:** get all players by team.

### 9. Get all youngest players

- **Endpoint:** `/api/v1/players/Youngest-Players`
- **Method:** `GET`
- **Description:** get all youngest players.

### 10. Get top 10 players

- **Endpoint:** `/api/v1/players/top-10-players`
- **Method:** `GET`
- **Description:** get top 10 players.