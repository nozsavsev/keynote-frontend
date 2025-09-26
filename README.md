# NAUTH - Frontend

A modern, secure, and feature-rich authentication and authorization microservice designed to be the backbone of nozsa.com security.

This is the frontend for the NAUTH service, built with Next.js and TypeScript.

## Features

- **Core Authentication**: Robust and secure authentication suite, featuring Two-Factor Authentication (2FA), seamless Google Login integration, and passwordless login with temporary codes. User credentials are protected using the strong Argon2id hashing algorithm.
- **Advanced Session Management**: All sessions are validated against the database for enhanced security, with the ability to instantly revoke any session in real-time.
- **Authorization & Permissions**: A flexible and powerful permission system allows for fine-grained access control. Nauth offers centralized permission management and can authenticate other applications on the same domain, storing and managing permissions across all services.
- **Comprehensive User Management**: Administrators have access to a comprehensive set of tools to effectively manage users, including the ability to delete accounts, set passwords, and trigger critical email actions like verification and password resets.
- **Customizable Transactional Emails**: Nauth includes a built-in email template system for all transactional emails. Anyone with the right permissions can customize templates for various actions, ensuring consistent branding and communication.
- **Extensible Service Integration**: Designed for extensibility, Nauth allows authorized users (admins only) to register other applications on the domain to use nauth as an authentication system. These services can then register their own permissions in real-time.

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: The development server runs with `NODE_TLS_REJECT_UNAUTHORIZED=0` to allow self-signed certificates.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn build`

Builds the app for production to the `.next` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start`

Starts the application in production mode. The application should be compiled with `yarn build` first.

### `yarn lint`

Checks the code for formatting and linting issues using Biome.

### `yarn format`

Formats the code using Biome.
