# Next.js 13 AppDir Firebase Auth Starter

Authentication is hard. 

Are you a builder/founder who just wants to get your startup off the ground with a reasonable amount of "future-proofed" authentication enabled? Don't do it yourself (unless you're a security startup!).

After spending weeks researching authentication services, I found there was only one service that sufficiently met the three criteria I was optimising for:
- Security
- Price
- Usability/learning curve

Firebase.


## Features

- Uses Next.js 13 AppDir (experimental)
- Includes the core Firebase, Auth, and AppCheck providers
- Includes an (optional) AuthChildProvider which provides an additional layer of abstraction for the Auth provider. It also includes helper functions for checking logging in, logging out, google log in with redirect, and restting password. Handles redirects automatically based on auth state.
- A TailwindUI Login and Registration form example with a mock dashboard

## Setup


1. Clone this repository ```git clone https://github.com/surya-ven/next-firebase-auth-starter.git && cd next-firebase-auth-starter```
2. Add in your Firebase API Keys to  app/firebase.config.ts
3. Configure .firebaserc and firebase.json files

For development:
4. Configure the firebase emulator suite using this guide: https://firebase.google.com/docs/emulator-suite
5. Follow these steps to setup a debug environment for AppCheck on the web: https://firebase.google.com/docs/app-check/web/debug-provider 
6. Run ```npm run dev```

For production:
4. Remove or comment out the "connectAuthEmulator" function call in app/config/firebase.ts
5. Run ```npm run build && npm run start```

## License

MIT

