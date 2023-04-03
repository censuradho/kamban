
<h1 align="center" width="150">
  <img src="https://user-images.githubusercontent.com/49209628/229127418-a3e1764a-5999-4c6e-af16-cff78e4e7054.png" alt="logo" width="150" />
</h1>

<p align="center">
  Kanban is a project management tool that allows for the visualization and organization of tasks on an interactive board. With it, it's possible to create and track the progress of activities in different stages of a process, with a friendly and intuitive interface.
</p>
<p align="center">
  The board is divided into columns that represent the process stages, such as "To do", "In progress" and "Done".
</p>
<p align="center">
  The user can add cards to each column, representing the tasks that need to be completed. These cards can have a detailed description. From there, it's possible to move the cards between the columns as tasks are completed.
</p>

<p align="center">
<img src="https://img.shields.io/github/last-commit/censuradho/kanban?style=for-the-badge"/>&nbsp;&nbsp;&nbsp;
<img src="https://img.shields.io/github/repo-size/censuradho/kanban?style=for-the-badge"/>&nbsp;&nbsp;&nbsp;
<img src="https://img.shields.io/github/languages/count/censuradho/kanban?style=for-the-badge"/>
</p>

![image](https://user-images.githubusercontent.com/49209628/229138728-7ccf5ede-e067-4dc2-8a39-49a68de5ea4c.png)

## ✨ Features

### Web application

- 🔛 fully responsive
- 📦 manage board, columns & tasks
- 🌙☀️ switch between dark & light mode
- 🤝 Drag n' Drop tasks

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en)

### Clone

Clone this repo to your local machine using:

```bash
git clone https://github.com/censuradho/kanban.git
```

### Setup

#### Backend

all process takes place in backend folder

##### Environment vars

Create a `.env` file with follow content

DATABASE_URL="file:./dev.db"


##### Install dependencies

```
yarn
```

or

```bash
 npm install
```

##### Running migrations

```bash
yarn prisma migrate dev
```

or 

```bash
npx prisma migrate dev
```

##### Running development server

```bash
yarn start:dev
```
or

```bash
npm run start:dev
```

If you open browser on follow url [http://localhost:3333/](http://localhost:3333/), you should see a hello world message.

### Web application

all process takes place in web folder


##### Environment vars

NEXT_PUBLIC_BACKEND_URL=http://localhost:3333

you can see the full list of environment vars in the config/app.ts file

##### Install dependencies

```
yarn
```

or

```bash
 npm install
```

##### Running development server

```bash
yarn dev
```
or

```bash
npm run dev
```

If you open browser on follow url [http://localhost:3000/](http://localhost:3000/), you should see the home screen.

## 💫 Roadmap

Check our [issues](https://github.com/censuradho/kanban/issues) page for more details about what we're building.
