# example-repo
A simple front-end e-commerce demo for a stationery shop called "The Doodle Depot". The app showcases a product catalogue, a shopping cart with local and session storage, basic caching, and a font preference selector for the current session. 
# example-repo: The Doodle Depot
A simple front-end e-commerce demo for a stationery shop called "The Doodle Depot". The app showcases a product catalogue, a shopping cart with local and session storage, basic caching, and a font preference selector for the current session.
---
## Table of Contents
- ### [Features](#features)
- ### [Tech Stack](#tech-stack)
- ### [Project Structure](#project-structure)
- ### [Prerequisites](#prerequisites)
- ### [Running the Project](#running-the-project)
- ### [Usage](#usage)
- ### [Notes and Limitations](#notes-and-limitations)
- ### [Possible Future Enhancements](#possible-future-enhancements)
- ### [Author](#author)
---
## Features
**Product Catalogue**

<img width="605" height="570" alt="Products Page" src="https://github.com/user-attachments/assets/3f60421e-01c7-4d20-b5a8-633f5632281c" />


- Four demo products (colour pencils, eraser, pen, pencil).
- Products rendered dynamically from a JavaScript array.
- Each product displays name, price and image.
- "Add to Cart" button for each product.

**Shopping Cart**

<img width="470" height="174" alt="Shopping Cart" src="https://github.com/user-attachments/assets/802443b8-0e93-4007-9020-7b015964e827" />

- Items stored in 'localStorage' so the cart persists across page reloads.
- "Remove" button on each cart item.
- "Clear Cart" button to empty the cart.
- "Displays a **"Your cart is empty."** message when there are no items.
- Dynamic **"Total Price"** section that recalculates whenever the cart changes.

**User Login & Cookies**

<img width="467" height="217" alt="Initial Login" src="https://github.com/user-attachments/assets/7f23a0bf-fcff-4ba0-86bb-36fc4e1c8150" />

- Prompts the user for their name on first load, and stores it in a cookie.

<img width="469" height="154" alt="Welcome back" src="https://github.com/user-attachments/assets/3ab092de-42be-4b8c-9cf4-c6dd8dc99b3d" />


- Greets user with "Welcome back, \<name\>!" on subsequent visits.

 **Caching & Performance**

<img width="467" height="178" alt="Cache notification" src="https://github.com/user-attachments/assets/ffeffe32-605c-4781-8fa6-7e39962137b7" />

 
 - Alerts the user that the page uses cached product images and styles to speed up loading.
 - Service worker-style caching logic for HTML, JS, CSS and product images using the Cache API.

**Session-based Font Preference**

<img width="254" height="61" alt="Font Selection" src="https://github.com/user-attachments/assets/db589062-0faa-4b1b-a1fd-76390f061e40" />


- Dropdown for selecting a font (Arial, Courier New, Georgia, Times New Roman, Verdana).
- Selection is stored in sessionStorage and applied via a CSS custom property, affecting the main font for the session only.

**Styling and Layout**
- Responsive layout using Bootstrap grid.
- Custom CSS for product cards, cart cards, buttons and typography.
- Colour scheme themed for a playful stationery shop.

## Tech Stack
- **HTML5** for page structure and layout
- **CSS3** & **Bootstrap 4** for styling and responsive grid.
- **JavaScript(ES6)** for DOM manipulation, cart logic, cookies, storage and caching.
- **Browser APIs**
  - document.cookie for user name.
  - localStorage for cart persistence.
  - sessionStorage for font preference.
  - Cache API in a service worker style snippet.

## Project Structure

├── doodleDepot.html   # Main HTML file and app layout

├── doodleDepot.css    # Custom styles for layout and components

├── doodleDepot.js     # Application logic (products, cart, cookies, caching, fonts)

└── Images/

    ├── DoodleDepot Logo.png
    
    ├── colourpencils.png
    
    ├── eraser.png
    
    ├── pen.png
    
    └── pencil.png
- `doodleDepot.html`
  - Header with logo, title, nav buttons (Home, Products, Cart) and font dropdown.
  - `PRODUCTS` section containing a container where product cards are dynamically inserted.
  - `SHOPPING CART` section containing a container where cart items are dynamically inserted, plus a Clear Cart button.
  - `TOTAL PRICE` section showing the current total.
- `doodleDepot.css`
    - Defines the base font (`--base-font`) and colour palette.
    - Styles logo, header, navigation buttons, product cards, cart cards and the clear-cart button.
    - Styles the total price section and "Your cart is empty" message.
- `doodleDepot.js`
  - Defines the `products` array with id, name, image filename and price.
  - Handles:
    - User login via cookies (`setCookie`, `getCookie`,`checkLogin`).
    - Product rendering (`displayProducts`).
    - Cart actions (`addToCart`, `displayCart`, `removeCart`, `clearCart`).
    - Total price calculation (`displayTotalPrice`).
    - Font preference logic (`applyFontPreference` and event listeners for `fontSelect`).
    - Example caching logic using Cache API and `install`/`fetch` event listeners.
  - Initialises everything on `DOMContentLoaded`.

## Prerequisites
- Any modern web browser
- A simple local web server such as **Live Server** in VS Code.

## Running the Project
1. Clone or download the project files into a folder.
2. Make sure the `Images` folder and the HTML/CSS/JS files are in the same directory structure.
3. Start a local server in the project folder.
4. Open your browser and go to: http://127.0.0.1:5500/Level%201%20-%20Introduction%20to%20Programming%20with%20HTML,%20CSS%20and%20JavaScript/M03T06%20%E2%80%93%20JSON%20and%20Web%20Storage%20APIs/Practical%20Task/doodleDepot.html
5. On first load, you'll be prompted for your name (stored in cookies).
6. You'll also see an alert about caching product images and styles.
7. Browse the **Products** section and add items to your cart.

## Usage
### Adding Products to Cart
1. Scroll to the **PRODUCTS** section.
2. Click **"Add to Cart"** on any product card.
3. A message will confirm that the item was added.
4. The **SHOPPING CART** section will update with the new item.
5. The **Total Price** will update automatically.
### Removing Items
- In the **SHOPPING CART** section, click **"Remove"** on a specific item to delete only that item from the cart
- Click the **"Clear Cart"** button to clear all items from the **SHOPPING CART** section, after confirming the prompt to remove all items.
### Changing Font Preference (Session Only)
1. In the header's **Font** dropdown, choose a font.
2. The base font of the page updates immediately.
3. The chosen font is stored `sessionStorage` and persists as long as the browser tab/window is open.

## Notes and Limitations
- The project is **front-end only**. There is no real payment or backend available.
- Cart data is stored in `logalStorage` on the user's device and clearing browser storage will reset the data.
- Cookie and caching logic is designed as simple exercise and is not production-ready.

## Possible Future Enhancements
- Quantity selectors for cart items.
- Product filtering and categories.
- More robust cookie consent banner.
- Proper service worker registration with offline support.
- Input validation and better UI feedback.

## Author
- Alma Coertzen: Front-end Student Developer.
