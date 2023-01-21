import "server-only";

import "./globals.css";

import LayoutProviders from "./context/LayoutProviders";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html className="h-full bg-white">
			<body className="h-full">
				<LayoutProviders>
					{children}
				</LayoutProviders>
			</body>
		</html>
	);
}
