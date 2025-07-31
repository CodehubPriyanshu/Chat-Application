# Chat Application

A modern real-time chat application built with React and Firebase.

## Features

- 🔐 **Authentication**: Google and Facebook login
- 💬 **Real-time messaging**: Instant message delivery
- 🎤 **Voice messages**: Record and send audio messages
- 📁 **File sharing**: Upload and share files
- 👥 **Room management**: Create and join chat rooms
- 🟢 **Online status**: See who's online
- 📱 **Responsive design**: Works on desktop and mobile
- 🔔 **Push notifications**: Get notified of new messages

## Tech Stack

- **Frontend**: React 18, React Router 5
- **Backend**: Firebase (Authentication, Realtime Database, Storage, Cloud Messaging)
- **UI Library**: RSuite
- **Styling**: SCSS
- **Build Tool**: Create React App
- **Linting**: ESLint with Prettier

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with the following services enabled:
  - Authentication (Google & Facebook providers)
  - Realtime Database
  - Storage
  - Cloud Messaging

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_VAPID_KEY=your_vapid_key
   ```

4. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Google and Facebook providers
   - Set up Realtime Database with appropriate security rules
   - Enable Storage for file uploads
   - Configure Cloud Messaging for push notifications

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run lint` - Runs ESLint to check code quality
- `npm run format` - Formats code with Prettier
- `npm run format:lint` - Formats and lints code

## Firebase Security Rules

### Realtime Database Rules
```json
{
  "rules": {
    "profiles": {
      "$uid": {
        ".read": "auth != null",
        ".write": "$uid === auth.uid"
      }
    },
    "rooms": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "messages": {
      "$roomId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    },
    "status": {
      "$uid": {
        ".read": "auth != null",
        ".write": "$uid === auth.uid"
      }
    },
    "fcm_tokens": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat/{roomId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── chat-window/    # Chat interface components
│   ├── dashboard/      # Dashboard components
│   └── rooms/          # Room management components
├── context/            # React Context providers
├── misc/               # Utilities and Firebase config
├── pages/              # Page components
└── styles/             # SCSS stylesheets
```

## Key Components

- **ProfileProvider**: Manages user authentication state
- **RoomsProvider**: Manages chat rooms data
- **Chat**: Main chat interface
- **Sidebar**: Navigation and room list
- **AudioMsgBtn**: Voice message recording

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Issues

- Voice messages use WebM format (may not be supported in all browsers)
- Some older browsers may not support all features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms
The built files in the `build` folder can be deployed to any static hosting service.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.