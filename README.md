# Schedule Application (Backend)


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Scheduling a Task](#scheduling-a-task)
- [Advanced Configuration](#advanced-configuration)

## Introduction

The Schedule Application is a Node.js backend application that allows you to schedule tasks for execution at specified times. It uses Redis as the backend database to store and manage scheduled tasks. This README provides an overview of the application and how to use it.

## Features

- Schedule tasks to run at specific times.
- Automatic task execution based on a cron job.
- RESTful API for managing scheduled tasks.
- Integration with Redis for data storage.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following prerequisites installed on your system:

- Node.js (v14 or higher)
- Redis (v5 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GhaythBenAbid/Schedule-IT
   cd Schedule-IT
## Usage

### API Endpoints

The application provides the following API endpoints:

-   `POST /schedule`: Schedule a task.
-   `GET /tasks`: Retrieve a list of scheduled tasks.
-   `GET /tasks/:taskId`: Retrieve details of a specific task.
-   `DELETE /tasks/:taskId`: Cancel a scheduled task.

### Scheduling a Task

To schedule a task, make a POST request to the `/schedule` endpoint with the following JSON payload:

jsonCopy code

`{
  "taskId": "unique-task-id",
  "scheduleTime": "2023-09-26T12:00:00Z"
}` 

Replace `"unique-task-id"` with a unique identifier for your task and `"scheduleTime"` with the desired timestamp.

Example CURL command:

`curl -X POST http://localhost:3000/schedule -H "Content-Type: application/json" -d '{
  "taskId": "task123",
  "scheduleTime": "2023-09-26T12:00:00Z"
}'` 

## Advanced Configuration

You can further configure the application by modifying the `index.js` file. Adjust the cron schedule, add authentication, or customize task execution logic as needed for your project.
