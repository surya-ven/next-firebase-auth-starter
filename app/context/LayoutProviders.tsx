"use client";

import { AuthProvider, AppCheckProvider } from "../utils/firebaseProviders";
import AuthChildProvider from "../context/AuthChildProvider";
import FirebaseAppProvider from "../context/FirebaseAppProvider";
import { getFirebaseAppCheck, getFirebaseAuth } from "../config/firebase";

export default function LayoutProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	const auth = getFirebaseAuth();
	const appCheck = getFirebaseAppCheck();

	return (
		<FirebaseAppProvider>
			<AppCheckProvider sdk={appCheck}>
				<AuthProvider sdk={auth}>
					<AuthChildProvider>{children}</AuthChildProvider>
				</AuthProvider>
			</AppCheckProvider>
		</FirebaseAppProvider>
	);
}
