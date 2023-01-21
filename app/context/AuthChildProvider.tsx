/*
 * AUTH CHILD PROVIDER
 * -------------------
 * Provides an optional abstraction layer for the Firebase Authentication service.
 * Must be encapsulated by the AuthProvider which provides the Firebase Auth service.
 * Not required, but useful for managing user state and authentication methods.
 *
 */

"use client";includes 

import { useContext, createContext, useState, useEffect } from "react";
import { googleProvider } from "../config/firebase";
import {
	signOut,
	Auth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithRedirect,
	GoogleAuthProvider,
	getRedirectResult,
	getAdditionalUserInfo,
	sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { usePathname } from "next/navigation";
import { useAuth } from "../utils/firebaseProviders";
import usePush from "../utils/usePush";

export interface ChildUser {
	uid: string;
	email: string;
	displayName: string | null;
}

export interface AuthChildContext {
	user: ChildUser | null;
	register: (email: string, password: string) => Promise<boolean>;
	logIn: (email: string, password: string) => Promise<boolean>;
	logOut: () => Promise<boolean>;
	googleLogIn: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
}

const AuthChildContext = createContext<AuthChildContext | undefined>(undefined);

export function useChildAuth() {
	return useContext(AuthChildContext);
}

export default function AuthChildProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// Initialize Firebase Authentication and get a reference to the service
	const [user, setUser] = useState<ChildUser | null>(null);
	const [loadingS, setLoadingS] = useState<Boolean>(true);
	const [loadingR, setLoadingR] = useState<Boolean>(true);
	const auth = useAuth();
	const pathname = usePathname();
	const push = usePush();

	console.log(
		"loadingS",
		loadingS,
		"loadingR",
		loadingR,
		"pathname",
		pathname,
		"user",
		user
	);

	// Redirect from Google Sign In if applicable
	useEffect(() => {
		signInRedirect(setLoadingR, auth);
	}, []);

	// Check if user is logged in
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user && user.email && user.uid) {
				setUser({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
				});
				if (
					pathname === "/register" ||
					pathname === "/login" ||
					pathname === "/reset"
				) {
					push("/dashboard");
				}
			} else {
				setUser(null);
				if (
					pathname !== "/register" &&
					pathname !== "/login" &&
					pathname !== "/reset"
				) {
					push("/login");
				}
			}
			setLoadingS(false);
		});

		return () => unsubscribe();
	}, [auth, push, pathname]);

	// Register a new user
	const register = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("userCredential", userCredential);
			const user = userCredential.user;
			console.log("user", user);

			return true;
		} catch (err) {
			// const errorCode = err?.code;
			// const errorMessage = err?.message;
			console.log("error", err);

			return false;
		}
	};

	// Log in a user
	const logIn = async (email: string, password: string): Promise<boolean> => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log("userCredential", userCredential);
			const user = userCredential.user;
			console.log("user", user);

			return true;
		} catch (err) {
			// const errorCode = err?.code;
			// const errorMessage = err?.message;
			console.log("error", err);

			return false;
		}
	};

	// Log in a user with Google
	const googleLogIn = async (): Promise<void> => {
		try {
			await signInWithRedirect(auth, googleProvider);
		} catch (err) {
			// const errorCode = err?.code;
			// const errorMessage = err?.message;
			console.log("error", err);

			// const email = err?.customData.email;
			setLoadingR(false);
		}
	};

	// Log out a user
	const logOut = async () => {
		setUser(null);
		try {
			await signOut(auth);

			return true;
		} catch (err) {
			// An error happened.
			console.log("error", err);

			return false;
		}
	};

	// Reset a user's password
	const resetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (err) {
			// An error happened.
			console.log("password reset error", err);
		}
	};

	return (
		<AuthChildContext.Provider
			value={{
				user,
				register,
				logIn,
				googleLogIn,
				logOut,
				resetPassword,
			}}
		>
			{loadingS ||
			loadingR ||
			(user &&
				(pathname === "/login" ||
					pathname === "/register" ||
					pathname === "/reset")) ||
			(!user && pathname === "/dashboard")
				? null
				: children}
		</AuthChildContext.Provider>
	);
}

// Get the redirect result from a redirect sign-in flow
async function signInRedirect(
	setLoadingR: (value: React.SetStateAction<Boolean>) => void,
	auth: Auth
) {
	try {
		const result = await getRedirectResult(auth);
		if (result) {
			console.log("result", result);

			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result?.user;

			// Determine if the user signed up or signed in
			const additionalUserInfo = getAdditionalUserInfo(result);
			const isNewUser = additionalUserInfo?.isNewUser;
		} else if (result === null) {
			// No login performed
		}
		setLoadingR(false);
	} catch (err) {
		// Redirect sign-in was unsuccessful
		console.log("redirect sign-in error:", err);
		const credential = GoogleAuthProvider.credentialFromError(
			err as FirebaseError
		);
		setLoadingR(false);
	}
};