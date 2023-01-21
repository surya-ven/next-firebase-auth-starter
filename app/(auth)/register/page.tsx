"use client";

import { useState } from "react";
import { useChildAuth, AuthChildContext } from "../../context/AuthChildProvider";
import SignUpForm from "../../components/SignUpForm";
import SignInProviders from "../../components/SignInProviders";

export default function SignUp() {
	// destructurer user from useChildAuth
	const { register } = useChildAuth() as AuthChildContext;
	const [data, setData] = useState<{
		email: string;
		password: string;
	}>({
		email: "",
		password: "",
	});
	// const push = usePush();

	const handleSignUp = async (e: React.FormEvent<HTMLInputElement>) => {
		e.preventDefault();

		console.log("data", data);

		try {
			const success = await register(data.email, data.password);
			console.log("register success: ", success);
			// if (success) push("/dashboard");
		} catch (err) {
			console.log(err);
		}
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
								Sign Up
							</h2>
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
											Or sign up with email
										</span>
									</div>
								</div>
							</div>

							<div className="mt-6">
								<SignUpForm
									data={data}
									setData={setData}
									handleSignUp={handleSignUp}
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
