
# FoodApp

Welcome to FoodApp! This web application allows users to browse, order, and manage food items from various restaurants. Designed with a modern and intuitive interface, FoodApp offers a seamless experience for both users and restaurant managers.

## Features

### User Features
- **Browse Food Items**: View a variety of food items from different categories.
- **Order Food**: Easily place orders for food items.
- **Responsive Design**: The app is fully responsive and works well on both desktop and mobile devices.

### Admin Features
- **Manage Categories**: Add and manage food categories.
- **Manage Food Items**: Add, update, and remove food items.
- **User Management**: View and manage user accounts.

## Screenshots

Here are some screenshots of the FoodApp in action:

1. **SignUp page**
   ![SignUp page](https://drive.google.com/uc?id=1-d1rtKXdIGr9psKV6J7XqTc3r1QRrF1J)

2. **Login Page**
   ![Login Page](https://ibb.co/X2c4Y8z)

3. **Home page**
   ![Food Items Table](https://drive.google.com/uc?id=1cbEf_oMguuOtct6Tp2rFQFTZdNN4N50r)
   
4. **Admin Dashboard**
   ![Admin Dashboard](https://drive.google.com/uc?id=1eyR2rOox72AGGFYzOnFHstSh_rOLVo8c)
   
5. **Vendor Dashboard**
   ![Admin Dashboard](https://drive.google.com/uc?id=1W3HLo5EO6Fuka9gkeRQRgX9NzysZqCpm)



6. **Add Category Item**
   ![Add Category Item](https://drive.google.com/uc?id=1V1fbkkrK_j9yXXY3AUD82KqoUS-ulNXr)



7. **Add Company Form**
   ![Add Company Form](https://drive.google.com/uc?id=1abtMMjoSWdGVAedgJSltw5cs20IV_U9k)

8. **Check out window**
   ![Check out window](https://drive.google.com/uc?id=1ad_yxoW3aBgN8ec6E_1DbRGmSDRAVw18)

9. **Category Management**
   ![Category Management](https://drive.google.com/uc?id=1cYbkZvOgM_2FFtvlFI6m-ycItRtSqKe_)




## Installation

To get started with FoodApp, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/foodapp.git
    cd foodapp
    ```

2. **Install Dependencies**

    - For the backend (Node.js/Express):
      
      ```bash
      cd backend
      npm install
      nodemon index.js
      ```

    - For the frontend (React):
      
      ```bash
      cd frontend
      npm install
      npm run
      ```

3. **Set Up Environment Variables**

    Create a `.env` file in both `server` and `client` directories with the necessary environment variables. For example:

    **Server (.env)**

    ```plaintext
    MONGO_URI=mongodb://localhost:27017/foodapp
    JWT_SECRET=your_jwt_secret
    ```

    **Client (.env)**

    ```plaintext
    REACT_APP_API_URL=http://localhost:4000/api
    ```

4. **Run the Application**

    - Start the backend server:

      ```bash
      cd backend
      npm i
      nodemon index.js
      ```

    - Start the frontend application:

      ```bash
      cd frontend
  
      npm start
      ```

    Open your browser and navigate to `http://localhost:3000` to see the application in action.

