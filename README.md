<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/harbanery/be-blanja-marketplace-app">
    <img src="./public/brandicon.png" alt="Logo Blanja" width="250">
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

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Running the Application](#running-the-application)
  - [Test Account](#test-account)
- [Usage](#usage)
  - [Features](#features)
  - [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#Contact)
- [Acknowledgements](#acknowledgements)

<!-- <details>
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
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#documentation">Documentation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ul>
</details> -->

## About The Project

**Blanja** is a web-based marketplace application that provides a platform for sellers and buyers to conduct online transactions for various products. This API allows developers to access and manage the various features and functions available on **Blanja**, including users, products, categories, carts, and orders.

### Built With

[![Go][Go]][Go-url]
[![Fiber][Fiber]][Fiber-url]
[![GORM][GORM]][GORM-url]
[![Postgre][Postgre]][Postgre-url]
[![Cloudinary][Cloudinary]][Cloudinary-url]

<!-- [![Midtrans][Midtrans]][Midtrans-url] -->

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
     git clone https://github.com/harbanery/blanja-marketplace-app.git
   ```

2. Install NPM packages

   ```sh
     npm install
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
be-blanja-marketplace-app/
├── public/
│   └── brandicon.png
├── src/
│   ├── configs/
│   │   └── db.go
│   ├── controllers/
│   │   ├── AddressController.go
│   │   ├── CartController.go
│   │   ├── CartProductController.go
│   │   ├── CategoryController.go
│   │   ├── CheckoutController.go
│   │   ├── ColorController.go
│   │   ├── CustomerController.go
│   │   ├── OrderController.go
│   │   ├── ProductController.go
│   │   ├── SellerController.go
│   │   ├── SizeController.go
│   │   ├── UploadController.go
│   │   └── UserController.go
│   ├── helpers/
│   │   ├── jwt.go
│   │   ├── migration.go
│   │   ├── params.go
│   │   ├── transaction.go
│   │   ├── upload.go
│   │   ├── url.go
│   │   └── validation.go
│   ├── middlewares/
│   │   ├── jwt.go
│   │   └── xssClean.go
│   ├── models/
│   │   ├── Address.go
│   │   ├── Cart.go
│   │   ├── CartProduct.go
│   │   ├── Category.go
│   │   ├── Checkout.go
│   │   ├── Color.go
│   │   ├── Customer.go
│   │   ├── Image.go
│   │   ├── Order.go
│   │   ├── Product.go
│   │   ├── Seller.go
│   │   ├── Size.go
│   │   └── User.go
│   ├── routes/
│   │   └── main.go
│   └── utils/
│       ├── cloudinary.go
│       ├── midtrans.go
│       └── cloudinary.go
├── tmp/
│   ├── build-errors.log
│   ├── main.exe
│   └── ngrok.exe
├── .air.toml
├── .env
├── .gitignore
├── .golangci.yml
├── go.mod
├── go.sum
├── LICENSE
├── main.go
└── README.md
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
[Go]: https://img.shields.io/badge/go-00ADD8?style=for-the-badge&logo=go&logoColor=white
[Go-url]: https://golang.org/
[Fiber]: https://img.shields.io/badge/fiber-057A7A?style=for-the-badge&logo=fiber&logoColor=white
[Fiber-url]: https://gofiber.io/
[GORM]: https://img.shields.io/badge/gorm-000000?style=for-the-badge&logo=go&logoColor=white
[GORM-url]: https://gorm.io/
[Cloudinary]: https://img.shields.io/badge/cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white
[Cloudinary-url]: https://cloudinary.com/
[Midtrans]: https://img.shields.io/badge/midtrans-0C9CB4?style=for-the-badge&logo=midtrans&logoColor=white
[Midtrans-url]: https://github.com/veritrans/go-midtrans

<!-- ![Go](https://img.shields.io/badge/go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Fiber](https://img.shields.io/badge/fiber-057A7A?style=for-the-badge&logo=fiber&logoColor=white)
![GORM](https://img.shields.io/badge/gorm-000000?style=for-the-badge&logo=go&logoColor=white)
![Cloudinary](https://img.shields.io/badge/cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Midtrans](https://img.shields.io/badge/midtrans-0C9CB4?style=for-the-badge&logo=midtrans&logoColor=white) -->
