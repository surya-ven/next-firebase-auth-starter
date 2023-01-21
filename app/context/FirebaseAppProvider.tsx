"use client";

import { FirebaseApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getFirebaseApp } from "../config/firebase";

const FirebaseAppContext = createContext<FirebaseApp | undefined>(
	undefined
);

export function useFirebaseApp() {
	return useContext(FirebaseAppContext);
}

export default function FirebaseAppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const app = getFirebaseApp();

    return (
        <FirebaseAppContext.Provider value={app}>
            {children}
        </FirebaseAppContext.Provider>
    );
}