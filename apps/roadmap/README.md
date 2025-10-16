# Replyke Forum Starter

## Overview
This is a basic starter project for a multi-topic board/forum where users can post, vote, and comment on posts. It is built using [Replyke](https://replyke.com), allowing developers to quickly set up and customize a discussion platform for their needs.

## Getting Started
To get this project running, follow the steps below:

### 1. Create a Replyke Project
1. Head over to [Replyke's Dashboard](https://dashboard.replyke.com).
2. Create a new project.
3. Copy the project ID and add it to your `.env` file:
   ```sh
   VITE_PUBLIC_REPLYKE_PROJECT_ID=your_project_id_here
   ```

### 2. Configure Authentication
Replyke supports both built-in authentication and external user systems. This project relies on an external user system and, for simplicity, uses a mock array of users.

To make authentication work:
1. Generate a **secret key** in the [Replyke Dashboard](https://dashboard.replyke.com).
2. Add the key to your `.env` file:
   ```sh
   VITE_PUBLIC_REPLYKE_SECRET_KEY=your_secret_key_here
   ```
3. This project uses `useSignTestingJwt` to sign JWTs directly in the client. **This approach is for testing and development only.**

### 3. Important Security Note
For production, **never sign JWTs in the client.**
- Move the signing process to your server.
- Rotate the secret key before moving to production, as any key used on the client is no longer secure.

## Customization
Replyke offers extensive customization. Developers can modify styles, integrate their own authentication system, or extend functionality to suit their brand and requirements.

Explore [Replyke's Documentation](https://docs.replyke.com) to learn more about customization options.

## License
This project is open for modification and customization. Ensure compliance with Replyke's terms of service when deploying.