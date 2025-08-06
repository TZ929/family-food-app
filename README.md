
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

### Phase 1: Project Setup & Core Backend
- [x] Create project repository and `README.md`.
- [x] Initialize Node.js backend with Express.
- [x] Set up MongoDB database and connect to the application.
- [x] Implement user registration and login functionality.
- [x] Implement JWT-based authentication and protected routes.
- [x] Set up basic API routes for users.

### Phase 2: Mobile App (iOS & Android) – Core Features

- [x] Initialize React Native project with Expo CLI
- [x] Configure environment variables for API base URL
- [x] Implement authentication flow (register, login) with JWT storage
- [x] Set up React Navigation (stack / tab) with Expo Router
- [x] Create Login screen and redirect root to /login
- [x] Create Register screen
- [x] Create Dashboard screen
- [x] Display user profile data retrieved from `/users/profile`
- [x] Add logout functionality and token management
- [x] Implement tab navigation (Home/Explore) for authenticated users

### Phase 3: Core Food & Recipe Features (Mobile)

- [x] Create food post creation screen (title, description, cook time)
- [x] Add food post listing with pull-to-refresh
- [x] Implement post creation with form validation
- [x] Add tab navigation for posts management
- [x] Add image upload functionality to food post creation
- [x] Implement image display in food post listings
- [x] Add camera and gallery image picker functionality
- [x] Configure Cloudinary for cloud image storage
- [ ] Create food post detail view screen
- [ ] Implement post editing and deletion (for post owners)
- [ ] Add recipe creation and editing functionality

### Phase 4: Family & Friends System

- [ ] Implement backend logic for creating and joining families
- [ ] Develop backend logic for adding/removing friends
- [ ] Create mobile interfaces for managing families and friends
- [ ] Adjust permissions based on user roles (Family, Friend)
- [ ] Implement family-specific feeds and friend feeds

### Phase 5: Ratings, Comments & Social Features

- [ ] Add backend routes for rating and commenting on posts
- [ ] Display ratings and comments on food posts
- [ ] Add image viewing and gallery functionality
- [ ] Implement post sharing and social features

### Phase 6: Community Features & Polish

- [ ] Implement the "Community Cookbook" feature
- [ ] Add functionality to publish recipes to the community
- [ ] Create recipe browsing and search functionality
- [ ] Add user profiles and cook statistics
- [ ] Implement recipe sharing and favoriting

### Phase 7: App Store Preparation & Deployment

- [ ] Optimize app performance and UI/UX
- [ ] Add app icons, splash screens, and branding
- [ ] Implement push notifications for family activities
- [ ] Add app store metadata and screenshots
- [ ] Prepare for App Store submission and review process
- [ ] Deploy backend to production cloud platform
