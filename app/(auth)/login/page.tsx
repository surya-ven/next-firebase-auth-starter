"use client";

import { useState } from "react";
import { useChildAuth, AuthChildContext } from "../../context/AuthChildProvider";
import SignInForm from "../../components/SignInForm";
import SignInProviders from "../../components/SignInProviders";

export default function SignIn() {
	// destructurer user from useChildAuth
	const { logIn } = useChildAuth() as AuthChildContext;
	const [data, setData] = useState<{
		email: string;
		password: string;
	}>({
		email: "",
		password: "",
	});
	// const push = usePush();

	const handleSignIn = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		try {
			const success = await logIn(data.email, data.password);
			console.log("login success: ", success);
			// if (success) push("/dashboard");
		} catch (err) {
			console.log(err);
		}

		console.log(data);
	};

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
								Sign in to your account
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								Or{" "}
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									start your 14-day free trial
								</a>
							</p>
						</div>

						<div className="mt-8">
							<div>
								<SignInProviders />
								<div className="relative mt-6">
									<div
										className="absolute inset-0 flex items-center"
										aria-hidden="true"
									>
										<div className="w-full border-t border-gray-300" />
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="bg-white px-2 text-gray-500">
											Or continue with
										</span>
									</div>
								</div>
							</div>

							<div className="mt-6">
								<SignInForm
									data={data}
									setData={setData}
									handleSignIn={handleSignIn}
								/>
							</div>
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
