# COLORS Lab

**Summary:** A LAMP stack application for managing colors. Supports user authentication, as well as adding and searching in the colors database.

## Deployment
**Live link:** [http://jacoblamp.me](http://jacoblamp.me)

## Technology Used
- Linux
- Apache
- MySQL
- PHP
- HTML, CSS, JavaScript

## Project Structure
```sh
.
├── api
│   ├── AddColor.php
│   ├── Login.php
│   └── SearchColors.php
└── public
    ├── color.html
    ├── css
    │   └── styles.css
    ├── images
    │   └── background.png
    ├── index.html
    └── js
        ├── code.js
        └── md5.js
```

## Setup Instructions

### Create Database

```sh
create database COP4331; 
use COP4331;
```

### Create Colors Table
```sh
CREATE TABLE `COP4331`.`Colors`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`Name` VARCHAR(50) NOT NULL DEFAULT '' ,
`UserID` INT NOT NULL DEFAULT '0' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```

### Create Users table

```sh
CREATE TABLE `COP4331`.`Users`
(
`ID` INT NOT NULL AUTO_INCREMENT ,
`FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
`LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
`Login` VARCHAR(50) NOT NULL DEFAULT '' ,
`Password` VARCHAR(50) NOT NULL DEFAULT '' ,
PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
```

### Create Initial User
```sh
USE COP4331;
insert into Users (FirstName,LastName,Login,Password) VALUES ('Bobby','Tables','bables','123');
```

### Create Database User and Grant Permissions
```sh
USE COP4331;
CREATE USER 'your_database_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON COP4331.* TO 'your_database_user'@'localhost';
```

Copy `api/.env.example` to `api/.env` and set `DB_HOST`, `DB_USER`,
`DB_PASSWORD`, and `DB_NAME` to match your database. The local `.env` is ignored
by Git. In deployment, set these as environment variables in the web server
instead of storing them in a file.

### Update base URL
Change the constant `urlBase` variable in `code.js` to match your hosted location.

## API
Endpoint|Purpose
-|-
Login.php|Handle user login
SearchColors.php|Search for colors from a query
AddColor.php|Add a color to the database

## AI Assistance Disclosure

This project was developed with assistance from generative AI tools:

- **Tool**: ChatGPT, GPT-5.6 Sol (OpenAI, chatgpt.com)
- **Dates**: 27 August to 27 September 2026
- **Scope**: Project setup, debugging, advising on best practices

All AI-generated code was reviewed, tested, and modified to meet assignment requirements. Final implementation reflects my understanding of the concepts.

## License
This project is licensed under the MIT License. See `LICENSE.md` for details.
