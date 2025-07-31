# Chat App

A real-time chat application built with React and Firebase, optimized for deployment on Vercel.

## Features

- Real-time messaging with Firebase Realtime Database
- User authentication with Google and Facebook
- Online/offline status tracking
- Push notifications support
- Responsive design with RSuite UI components

## Tech Stack

- **Frontend**: React 18, React Router, RSuite
- **Backend**: Firebase (Authentication, Realtime Database, Storage, Cloud Messaging)
- **Styling**: SCSS, RSuite CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Authentication and Realtime Database enabled

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Update the Firebase config in `src/misc/firebase.js` with your project credentials
   - Enable Google and Facebook authentication in Firebase Console
   - Set up Realtime Database rules

4. Start the development server:
```bash
npm start
```

## Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. Connect your GitHub repository to Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a React app and configure build settings

3. Deploy:
   - Vercel will automatically deploy on every push to the main branch
   - Your app will be available at `https://your-app-name.vercel.app`

### Method 2: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

## Environment Variables

The app uses the following environment variables (configured in `.env.local`):

- `GENERATE_SOURCEMAP=false` - Disables source maps in production
- `BROWSER=none` - Prevents automatic browser opening in development

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── misc/               # Utilities and Firebase config
├── pages/              # Page components
└── styles/             # SCSS stylesheets
```

## Firebase Configuration

Make sure your Firebase project has:

1. **Authentication** enabled with Google and Facebook providers
2. **Realtime Database** with appropriate security rules
3. **Storage** for file uploads
4. **Cloud Messaging** for push notifications (optional)

## Build Optimization

The project is optimized for production with:

- Source maps disabled for smaller bundle size
- Proper caching headers via Vercel configuration
- Error boundaries and proper error handling
- Code splitting and lazy loading where applicable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.