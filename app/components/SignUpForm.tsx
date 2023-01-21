export default function SignUpForm({
	data,
	setData,
	handleSignUp,
}: {
	data: { email: string; password: string };
	setData: React.Dispatch<
		React.SetStateAction<{ email: string; password: string }>
	>;
	handleSignUp: React.FormEventHandler;
}) {
	return (
		<form onSubmit={handleSignUp} className="space-y-6">
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email address
				</label>
				<div className="mt-1">
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						onChange={(e) =>
							setData((data) => ({
								...data,
								email: e.target.value,
							}))
						}
						value={data?.email}
						className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<div className="space-y-1">
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<div className="mt-1">
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						onChange={(e) =>
							setData((data) => ({
								...data,
								password: e.target.value,
							}))
						}
						value={data?.password}
						className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Sign up
				</button>
			</div>
		</form>
	);
}
