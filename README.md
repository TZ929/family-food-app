
# Family Food & Recipe Sharing App

This application is designed to bring families and friends together through the joy of cooking and sharing food. It allows the family cook to showcase their culinary creations, while family members can provide feedback and appreciation. Friends can follow along, and recipes can be shared with the broader app community.

## Core Features

### 1. User & Family Management
- **User Authentication:** Secure sign-up and login for all users (email/password, social logins).
- **Family Creation:** Users can create a "Family" group and invite members.
- **Friend System:** Users can add friends from other families to view their posts.
- **Roles & Permissions:**
    - **Cook:** Can post food, recipes, and manage their own content.
    - **Eater (Family Member):** Can rate and comment on food posted within their family.
    - **Friend:** Can view food posts, ratings, and cook's stats but cannot rate or comment.
    - **Community Member (All Users):** Can view and share recipes in the community section.

### 2. Food & Recipe Sharing
- **Food Posts:** Cooks can create posts with:
    - A picture of the dish.
    - Title and description.
    - Cook time.
    - A detailed recipe (optional, can be kept private or shared publicly).
- **Recipe Sharing:**
    - Recipes can be attached to a food post.
    - Recipes can be published to a public "Community Cookbook" for all users to see.
- **Interactive Elements:**
    - **Ratings:** Family members can rate dishes on a scale (e.g., 0.0 to 10.0 ratings)
    - **Comments:** Family members can leave comments on food posts.

### 3. Social & Community
- **Family Feed:** A private feed for each family to see their own food posts.
- **Friend Feed:** A feed showing posts from friends.
- **Community Cookbook:** A public space where users can browse recipes shared by others across the platform.

## Proposed Technology Stack

- **Backend:** Node.js with Express.js for the API.
- **Database:** MongoDB for flexible data storage (users, families, posts, recipes).
- **Frontend:** React (or React Native for a mobile app) for a dynamic user interface.
- **Cloud Storage:** A service like AWS S3 or Cloudinary for storing images.
- **Deployment:** A cloud platform like Heroku, Vercel, or AWS.

## Development Plan

### Phase 1: Project Setup & Core Backend (Current)
- [x] Create project repository and `README.md`.
- [x] Initialize Node.js backend with Express.
- [x] Set up MongoDB database and connect to the application.
- [x] Implement user registration and login functionality.
- [x] Implement JWT-based authentication and protected routes.
- [x] Set up basic API routes for users.

### Phase 2: Mobile App (iOS & Android) – Core Features

- [x] Initialize React Native project with Expo CLI
- [ ] Configure environment variables for API base URL
- [ ] Implement authentication flow (register, login) with JWT storage
- [ ] Set up React Navigation (stack / tab)
- [ ] Create basic screens (Login, Register, Dashboard)
- [ ] Display user profile data retrieved from `/users/profile`

### Phase 3: Core Frontend Web (optional)

- [ ] Set up a React web application (if web dashboard is desired)
- [ ] Create basic UI components (e.g., Navbar, Buttons, Cards)
- [ ] Implement user registration and login pages
- [ ] Create a simple dashboard for authenticated users
- [ ] Implement the ability to create, view, edit, and delete food posts (without images first)

### Phase 4: Family & Friends System

- [ ] Implement backend logic for creating and joining families
- [ ] Develop backend logic for adding/removing friends
- [ ] Create frontend interfaces for managing families and friends (mobile and/or web)
- [ ] Adjust permissions based on user roles (Family, Friend)

### Phase 5: Ratings, Comments & Image Uploads

- [ ] Add backend routes for rating and commenting on posts
- [ ] Integrate a file storage solution for image uploads
- [ ] Update the frontend to allow users to upload images with their posts
- [ ] Display ratings and comments on food posts

### Phase 6: Community Features & Deployment

- [ ] Implement the "Community Cookbook" feature
- [ ] Add functionality to publish recipes to the community
- [ ] Refine the UI/UX (mobile and/or web)
- [ ] Prepare the application for deployment (App Store, Play Store, web hosting)
- [ ] Deploy the application to a cloud provider
