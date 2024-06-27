<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/harbanery/be-blanja-marketplace-app">
    <img src="./public/brandicon.png" alt="Logo Blanja" width="80">
  </a>

  <h1 align="center">Blanja</h1>

  <p align="center">
    Marketplace Implementation
    <br />
    <br />
    <a href="https://be-blanja-marketplace-app-develop.up.railway.app/" target="_blank">View Demo</a>
    ·
    <!-- <a href="https://mama-recipe-food.vercel.app/" target="_blank">View Front-End Demo</a>
    · -->
    <a href="https://github.com/harbanery/blanja-marketplace-app" target="_blank">View Front-End Repo</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ul>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#start-development-server">Start Development Server</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
    <ul>
        <!-- <li><a href="#features">Features</a></li> -->
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#documentation">Documentation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ul>
</details>

## About The Project

<!-- Description about Backend for Blanja -->

### Built With

[![Postgre][Postgre]][Postgre-url]

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm
- PostgreSQL

### Installation

1. Clone Repo

   ```sh
     git clone https://github.com/harbanery/be-mama-food-recipe-app.git
   ```

2. Install NPM packages

   ```sh
     npm install
   ```

3. Set up your database

   ```sh
     npx prisma migrate dev --name init
   ```

### Start Development Server

To start the development server:

```sh
     npm run dev
```

The server will start on port 3000 by default. You can use Postman to interact with the endpoints in [Documentation](#documentation).

## Usage

To use this project, follow the instructions below for understanding the project structure and how to use the provided API documentation.

### Project Structure

```
be-mama-food-recipe-app/
├── prisma/
│   └── schema.prisma
├── public/
│   └── index.html
├── src/
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── recipes.js
│   │   ├── upload.js
│   │   └── users.js
│   ├── herlpers/
│   │   ├── auth.js
│   │   └── common.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── recipes.js
│   │   ├── upload.js
│   │   └── users.js
│   ├── utils/
│   │   └── cloudinary.js
│   └── app.js
├── .gitignore
├── README.md
├── index.js
├── package-lock.json
├── package.json
├── vercel.json
└── yarn.lock
```

### Documentation

Access the API documentation for the **Blanja** project, created by [Raihan Yusuf](https://github.com/harbanery). Use this documentation to test endpoints and understand the structure and functionality of the available APIs in this project.

[![Blanja API Postman Documentation](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/34109484/2sA3XLFjmu#c0c52664-b3dc-4d2f-9309-93fc04212fdf)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgements

Feel free to check it out:

- [Img Shields](https://shields.io)
- [Choose an Open Source License](https://choosealicense.com/)
- [GitHub Pages](https://pages.github.com/)

<!-- MARKDOWN LINKS & IMAGES -->

[Postgre]: https://img.shields.io/badge/postgresql-336791?style=for-the-badge&logo=postgresql&logoColor=white
[Postgre-url]: https://www.postgresql.org/
