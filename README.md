# RESTful HTTP API for Photo Database

This repository contains a RESTful HTTP API for a photo database, providing web access to manage the database using Create, Retrieve, Update, and Delete (CRUD) operations. The API is implemented using Node.js and SQLite3.

## Features

1. Retrieve the full data set (all rows currently stored in the local photo database).
2. Add data for a new photo item (Create).
3. List the data of a specific item (Retrieve).
4. Change data of a specific item (Update).
5. Remove data of a specific item (Delete).

## API Documentation

Please refer to the [API Documentation](documentation.html) for details on how to use the API, including endpoint URIs, HTTP methods, and content-types of the resource representations.

## Installation and Usage

### Prerequisites

- Node.js (a recent version)
- npm

### Steps

1. Clone the repository:

```bash
git clone https://github.com/NicSob/web_tech.git
```
Navigate to the project directory:
```bash
cd web_tech
```
Install the dependencies:
```bash
npm install
```
Start the server:
```bash
npm start
```
The server will run on http://localhost:3000/.
