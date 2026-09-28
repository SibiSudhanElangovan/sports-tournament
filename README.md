# Sports Tournament Management REST API

## Project Description

A RESTful web application developed using Spring Boot and MySQL
to manage sports tournaments, teams, players, and matches.

The application provides CRUD operations through REST APIs.

## Technologies Used

- Java 21
- Spring Boot 4.1.1
- Spring Data JPA
- Hibernate
- MySQL 8.4
- Maven
- IntelliJ IDEA
- REST API
- cURL

## Project Architecture

Client
↓
Controller
↓
Service
↓
Repository
↓
MySQL Database

## Modules

### 1. Tournament

Manages tournament information.

Fields:
- id
- name
- location
- startDate
- endDate

### 2. Team

Manages participating teams.

Fields:
- id
- name
- coach
- city

### 3. Player

Manages players.

Fields:
- id
- name
- age
- role
- teamName

### 4. Match

Manages tournament matches.

Fields:
- id
- team1
- team2
- matchDate
- venue
- status

## REST API Endpoints

### Tournament

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/tournaments | Create tournament |
| GET | /api/tournaments | Get all tournaments |
| GET | /api/tournaments/{id} | Get tournament |
| PUT | /api/tournaments/{id} | Update tournament |
| DELETE | /api/tournaments/{id} | Delete tournament |

### Team

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/teams | Create team |
| GET | /api/teams | Get all teams |
| GET | /api/teams/{id} | Get team |
| PUT | /api/teams/{id} | Update team |
| DELETE | /api/teams/{id} | Delete team |

### Player

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/players | Create player |
| GET | /api/players | Get all players |
| GET | /api/players/{id} | Get player |
| PUT | /api/players/{id} | Update player |
| DELETE | /api/players/{id} | Delete player |

### Match

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/matches | Create match |
| GET | /api/matches | Get all matches |
| GET | /api/matches/{id} | Get match |
| PUT | /api/matches/{id} | Update match |
| DELETE | /api/matches/{id} | Delete match |

## Database

Database name:

sports_tournament

Tables:

- tournaments
- teams
- players
- matches

## Database Configuration

The application connects to MySQL using:

```text
Host: 127.0.0.1
Port: 3306
Database: sports_tournament