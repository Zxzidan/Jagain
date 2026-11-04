import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { home, register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <>
            <Head title="Masuk ke Jagain" />

            {/* Top Brand Logo */}
            <div className="mb-7">
                <Link
                    href={home()}
                    className="inline-block group focus:outline-hidden"
                >
                    <img
                        src="/images/logo.png"
                        alt="jagain"
                        className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                </Link>
            </div>

            {/* Title & Subtitle Header */}
            <div className="mb-7">
                <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                    Hey, Hello<span className="inline-block hover:rotate-12 transition-transform">👋</span>
                </h1>
                <p className="mt-1.5 text-sm text-gray-500 font-normal">
                    Enter your email and password to sign in.
                </p>
            </div>

            {status && (
                <div className="mb-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-center text-sm font-medium text-emerald-800">
                    {status}
                </div>
            )}

            {/* Passkey trigger if supported */}
            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-4"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="h-11 sm:h-12 w-full px-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:bg-white focus:border-[#10e57a] focus:ring-2 focus:ring-[#10e57a]/20 text-sm transition-all outline-hidden text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Password
                                </label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    placeholder="••••••••"
                                    className="h-11 sm:h-12 px-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:bg-white focus:border-[#10e57a] focus:ring-2 focus:ring-[#10e57a]/20 text-sm transition-all text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me & Forgot Password Row */}
                            <div className="flex items-center justify-between pt-1">
                                <label
                                    htmlFor="remember"
                                    className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600 font-medium"
                                >
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="size-4 rounded border-gray-300 data-[state=checked]:bg-[#10e57a] data-[state=checked]:border-[#10e57a] data-[state=checked]:text-black"
                                    />
                                    <span>Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
                                        tabIndex={5}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            {/* Action Buttons Row */}
                            <div className="grid grid-cols-2 gap-3.5 pt-2">
                                <button
                                    type="submit"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                    className="h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#10e57a] to-[#05d96c] hover:brightness-105 active:scale-[0.99] text-gray-950 font-bold text-sm tracking-normal transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-xs border-0"
                                >
                                    {processing ? (
                                        <Spinner className="size-4 text-gray-950" />
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>

                                <Link
                                    href={register()}
                                    tabIndex={6}
                                    className="h-11 sm:h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm tracking-normal transition-all flex items-center justify-center text-center shadow-xs active:scale-[0.99]"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: '',
    description: '',
};
