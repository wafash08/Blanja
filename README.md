<br />
<div align="center">
    <img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/main/BlanjaFE/src/assets/blanja-logo.png" width="500px"/>
  <br />
  <h1>Blanja</h1>
    <a href="https://blanja-website-project.netlify.app/">View Demo</a>
    .
    <a href="https://github.com/echestratus/BlanjaWebsiteProject/tree/feature/back-end">Api Demo</a>
</div>

  ## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
- [Documentation](#documentation)
- [Feature](#key-features)
- [Related Project](#related-project)
- [License](#license)
- [Contact](#contact)
- [Contribution](#contribution)
 
## About The Project

The Blanja website is an e-commerce platform developed by the team during a bootcamp at Pijar Camp. Blanja offers various products from different categories, providing an easy and secure online shopping experience. By utilizing modern technology and best practices in web development, we successfully created a responsive and user-friendly platform.

Developers:
<p align="center" display=flex>
  <table>
  <tr>
    <td><a href="https://github.com/echestratus" target="_blank">Farhan Nur Hakim</a></td>
    <td><a href="https://github.com/wafash08" target="_blank">Wafa Saefulhaq</a></td>
    <td><a href="https://github.com/nizuma666" target="_blank">Syaifulloh Ismail</a></td>
    <td><a href="https://github.com/harbanery" target="_blank">Raihan Yusuf</a></td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/80629118?v=4"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/74017000?v=4"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/137192782?v=4"/></td>
    <td><img src="https://avatars.githubusercontent.com/u/89146375?v=4"/></td>
  </tr>
  <tr>
    <td>Front-End</td>
    <td>Front-End</td>
    <td>Full-Stack</td>
    <td>Back-End</td>
  </tr>
  </table>
</p>

### Built With

- [Vite](https://vitejs.dev/)
- [React.js](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Installation
1. Clone this repository

```sh
git clone --single-branch --branch feature/front-end https://github.com/echestratus/BlanjaWebsiteProject.git
```

2. Install NPM packages

```sh
npm install
```

3. Add .env file at root folder project, and add following

```sh
VITE_BE_URL=[Backend API]
```

4. Run this command to run the server locally

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

## Documentation

<p align="center" display=flex>
  <table>
  <tr>
    <td>Login</td>
    <td>Register Customer</td>
  </tr>
  <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/LoginPage.png" /></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/RegisterCustomerPage.png"/></td>
  </tr>
  <tr>
    <td>Register Seller</td>
    <td>Home</td>
  </tr>
    <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/RegisterSellerPage.png"/></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/HomePage.png"/></td>
  </tr>
    <tr>
    <td>Detail Product</td>
    <td>Cart</td>
  </tr>
    <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/DetailProductPage.png"/></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/CartPage.png"/></td>
  </tr>
  <tr>
    <td>Checkout</td>
    <td>My Profile Customer</td>
  </tr>
  <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/CheckoutPage.png"/></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/MyProfileCustomerPage.png"/></td>
  </tr>
  <tr>
    <td>Shipping Address</td>
    <td>My Order</td>
  </tr>
  <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/ChooseAddressPage.png"/></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/MyOrderPage.png"/></td>
  </tr>
  <tr>
    <td>Store Profile</td>
    <td>My Product</td>
  </tr>
  <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/StoreProfilePage.png"/></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/MyProductPage.png"/></td>
  </tr> 
  <tr>
    <td>Selling Product</td>
    <td>Update Product</td>
  </tr>
  <tr>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/SellinProductPage.png"/></td>
    <td><img src="https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/public/UpdateProductPage.png"/></td>
  </tr> 
  </table>
</p>

## Blanja Web Application - Feature Overview

Blanja is a comprehensive e-commerce platform designed to connect customers with a diverse array of products from multiple sellers. Our website offers a seamless shopping experience for customers and robust tools for sellers to manage their storefronts. Below is an overview of the key features available on Blanja:

### Key Features

#### User Authentication

- **Role-Based Login and Registration**: Users can register or log in as either a customer or a seller, with functionalities tailored to each role.

#### Product Discovery

- **View Products**: Browse products from various registered sellers.
- **Search and Filter**: Efficiently search and filter products to find exactly what you're looking for.

#### Product Details

- **Detailed Product View**: Access comprehensive details for each product to make informed purchasing decisions.

#### Shopping Cart and Checkout

- **Add to Cart**: Easily add products to your shopping cart.
- **Checkout Process**: Proceed to checkout to review and purchase your selected products.

#### Payment and Shipping

- **Secure Payment**: Complete your purchase with secure payment options.
- **Address Management**: Add, edit, and set a primary shipping address for your orders.

#### User Profile Management

- **Profile Overview and Editing**: View and update your user profile information.
- **Order History**: View the status and details of past orders.

#### Seller-Specific Features

- **Store Profile Management**: Sellers can view and edit their store profiles.
- **Product Management for Sellers**:
  - **View Seller's Products**: Access a list of products associated with the seller's account.
  - **Add New Products**: Add new items to the store for sale.
  - **Edit Existing Products**: Update or edit the details of products in the seller's inventory.

### About Blanja

Blanja provides an efficient and enjoyable shopping experience for customers and a comprehensive suite of tools for sellers. Whether you're looking to buy a product or sell your goods online, Blanja is designed to meet your e-commerce needs.

## Related Project
:rocket: [`Backend Blanja`](https://github.com/echestratus/BlanjaWebsiteProject/tree/feature/back-end)

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/echestratus/BlanjaWebsiteProject/blob/feature/front-end/LICENSE) for more information.

## Contact

Feel free to contact us if there is any question you want to ask regarding this project or if you just want to get in touch.

### Email 
- Farhan Nur Hakim: farhanz.nh.13@gmail.com
- Wafa Saefulhaq: saefulhaqwafa@gmail.com
- Syaifulloh Ismail: syaifullohismail123@gmail.com
- Raihan Yusuf: ryusuf05@gmail.com
### LinkedIn 
- Farhan Nur Hakim: [https://www.linkedin.com/in/farhan-nur-hakim/](https://www.linkedin.com/in/farhan-nur-hakim/)
- Wafa Saefulhaq: [https://www.linkedin.com/in/mwafasaefulhaq/](https://www.linkedin.com/in/mwafasaefulhaq/)
- Syaifulloh Ismail: [https://www.linkedin.com/in/syaifulloh-ismail/](https://www.linkedin.com/in/syaifulloh-ismail/)
- Raihan Yusuf: [www.linkedin.com/in/raihan-yusuf](www.linkedin.com/in/raihan-yusuf)

## Contribution
### How to Contribute

Contributing project to github is pretty straight forward.
1. **Fork the Repository**: Click the "Fork" button at the top-right corner of this page to create your own copy of the repository.
2. **Installation**: Do the installation process right [here](#installation).
3. **Create a new branch**: Create a new branch to work on your changes.
    ```sh
    git branch -M feature/your-feature-name
    ```
4. **Make changes**: Implement your changes or new features in your branch.
5. **Commit your changes**: After making your changes, commit them with a descriptive message.
   ```sh
   git add .
   git commit -m "Add description of your changes"
   ```
6. **Push to GitHub**: Push your changes to your forked repository.
   ```sh
   git push origin feature/your-feature-name
   ```
7. **Create Pull Request**: Go to the original repository and open a pull request to merge your changes.
    - Navigate to your fork on GitHub.
    - Click on the "New Pull Request" button.
    - Select the base repository and branch you want to merge into.
    - Provide a detailed description of your changes and click "Create Pull Request".

