"use client";

import { useState } from "react";
import { useChildAuth, AuthChildContext } from "../../context/AuthChildProvider";

export default function Reset() {
	// destructurer user from useChildAuth
	const { resetPassword } = useChildAuth() as AuthChildContext;
	const [email, setEmail] = useState<string>("");

	return (
		<>
			<div className="flex min-h-full">
				<div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
					<div className="mx-auto w-full max-w-sm lg:w-96">
						<div>
							<img
								className="h-12 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt="Your Company"
							/>
							<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
								Reset your password
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								{`Enter the email address associated with your
									account, and we'll send you a link to reset
									your password.`}
							</p>
						</div>

						<div className="mt-8">
							<form
								onSubmit={() => resetPassword(email)}
								className="space-y-6"
							>
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
												setEmail(e.target.value)
											}
											value={email}
											className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										Continue
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="relative hidden w-0 flex-1 lg:block">
					<img
						className="absolute inset-0 h-full w-full object-cover"
						src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt=""
					/>
				</div>
			</div>
		</>
	);
}
