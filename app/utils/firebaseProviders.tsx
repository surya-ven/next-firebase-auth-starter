"use client";

/*
	This is a modified version of a subset of the code found here:
	https://github.com/FirebaseExtended/reactfire/blob/main/src/sdk.tsx
	which at the time of writing is licensed under the MIT license.

	Many thanks to the authors of reactfire for their work.
*/

import { useContext, createContext } from "react";
import { Auth } from "firebase/auth";
import { AppCheck } from "firebase/app-check";
import { useFirebaseApp } from "../context/FirebaseAppProvider";

export type FirebaseSdks =
	// | Analytics
	// | Database
	// | Firestore
	// | FirebasePerformance
	// | FirebaseStorage
	// | Functions
	// | RemoteConfig
	AppCheck | Auth;

// Create a context object
const AuthSdkContext = createContext<Auth | undefined>(undefined);
const AppCheckSdkContext = createContext<AppCheck | undefined>(undefined);

// Create a provider for components to consume and subscribe to changes
function getSdkProvider<Sdk extends FirebaseSdks>(
	SdkContext: React.Context<Sdk | undefined>
) {
	return function SdkProvider(props: React.PropsWithChildren<{ sdk: Sdk }>) {
		if (!props.sdk) throw new Error("no sdk provided");

		const contextualAppName = useFirebaseApp()?.name;
		const sdkAppName = props?.sdk?.app?.name;

		if (!contextualAppName || !sdkAppName)
			throw new Error("getSdkProvider: no firebase app name found");

		if (sdkAppName !== contextualAppName)
			throw new Error(
				"sdk was initialized with a different firebase app"
			);

		return <SdkContext.Provider value={props.sdk} {...props} />;
	};
}

// Return context sdk value
function useSdk<Sdk extends FirebaseSdks>(
	SdkContext: React.Context<Sdk | undefined>
): Sdk {
	const sdk = useContext(SdkContext);

	if (!sdk) {
		throw new Error(
			"SDK not found. useSdk must be called from within a provider"
		);
	}

	return sdk;
}

export const AuthProvider = getSdkProvider<Auth>(AuthSdkContext);
export const AppCheckProvider = getSdkProvider<AppCheck>(AppCheckSdkContext);

export const useAuth = () => useSdk<Auth>(AuthSdkContext);
export const useAppCheck = () => useSdk<AppCheck>(AppCheckSdkContext);
