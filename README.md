# Keynote - Real-time PDF Presentation Platform

A modern, interactive presentation platform that transforms PDF presentations into engaging, real-time experiences. Built with Next.js, TypeScript, and integrated with NAUTH authentication system.

## Overview

Keynote revolutionizes how presentations are delivered by providing real-time synchronization, mobile viewing, and interactive features that boost audience engagement. Upload your PDFs, present remotely, and connect with your audience like never before.

## Key Features

### Presentation Management

- **Easy PDF Upload**: Drag and drop PDF files with instant processing
- **Real-time Control**: Remote presentation control from any device
- **Live Synchronization**: Perfect sync across all connected devices
- **Presenter Notes**: Private notes visible only to the presenter

### Interactive Features

- **Raise Hand**: Audience members can raise hands for questions
- **Temporary Control**: Grant audience members temporary presentation control
- **Mobile Optimization**: Optimized viewing experience on mobile devices

### Technical Capabilities

- **No Software Installation**: Works directly in web browsers
- **Universal Access**: Compatible with any device and operating system
- **Unlimited Audience**: Support for unlimited spectator connections
- **Real-time Communication**: SignalR-powered live updates

### Authentication & Security

- **NAUTH Integration**: Secure authentication via NAUTH microservice
- **Session Management**: Advanced session validation and management
- **Permission System**: Fine-grained access control
- **User Management**: Comprehensive user administration tools

## How It Works

1. **Upload & Connect**: Upload your PDF presentation and connect your screen or projector
2. **Present & Control**: Control your presentation remotely from any device with real-time synchronization
3. **Engage & Interact**: Audience members join on their devices, raise hands, and can request temporary control

## Getting Started

### Prerequisites

- Node.js 24+ and Yarn
- NAUTH authentication service running
- Keynote backend service running

### Installation

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

### Environment Setup

Configure your environment variables for NAUTH and Keynote backend connections.

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

### Additional Scripts

PowerShell scripts are available in the `./scripts` folder for various development tasks:

- `RunPermissionGenerator.ps1` - Generate permissions for the application
- `RunPrettier.ps1` - Run Prettier code formatting
- `UpdateKeynoteApi.ps1` - Update Keynote API client
- `UpdateNauthApi.ps1` - Update NAUTH API client

## Architecture

Keynote is built as a modern web application with the following architecture:

- **Frontend**: Next.js with TypeScript, Tailwind CSS, and shadcn/ui components
- **Authentication**: Integrated with NAUTH microservice for secure user management
- **Real-time Communication**: SignalR for live presentation synchronization
- **Backend**: ASP.NET Core API for presentation management and real-time features

## Related Projects

- **NAUTH Backend**: [https://github.com/nozsavsev/nauth-asp](https://github.com/nozsavsev/nauth-asp) - Authentication and authorization microservice
- **NAUTH Frontend**: [https://github.com/nozsavsev/nauth-frontend](https://github.com/nozsavsev/nauth-frontend) - Authentication service frontend

© 2024 Keynote. All rights reserved.
