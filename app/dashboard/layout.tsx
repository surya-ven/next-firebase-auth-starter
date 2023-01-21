"use client";

import { useEffect } from "react";
import { useChildAuth, AuthChildContext } from "../context/AuthChildProvider";
import usePush from "../utils/usePush";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { user, logOut } = useChildAuth() as AuthChildContext;
	const push = usePush();

	useEffect(() => {
		if (!user) {
			push("/login");
		}
	}, [user, push]);

	return (
		<>
			<div>
				<button
					onClick={async () => {
						const success = await logOut();

						if (success) push("/login");
					}}
					className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Log out
				</button>
			</div>
			{children}
		</>
	);
}
