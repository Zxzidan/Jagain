import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Spinner } from '@/components/ui/spinner';
import { home, login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Daftar Akun Jagain" />

            {/* Top Brand Logo */}
            <div className="mb-6">
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
            <div className="mb-6">
                <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                    Mulai Kawal Hutan<span className="inline-block hover:rotate-12 transition-transform">👋</span>
                </h1>
                <p className="mt-1.5 text-sm text-gray-500 font-normal">
                    Lengkapi data diri untuk mendaftarkan akun warga pelapor.
                </p>
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-3.5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-3.5">
                            {/* Full Name Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="Budi Santoso"
                                    className="h-11 sm:h-12 w-full px-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:bg-white focus:border-[#10e57a] focus:ring-2 focus:ring-[#10e57a]/20 text-sm transition-all outline-hidden text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Alamat Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
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
                                    Kata Sandi
                                </label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    placeholder="Minimal 8 karakter"
                                    passwordrules={passwordRules}
                                    className="h-11 sm:h-12 px-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:bg-white focus:border-[#10e57a] focus:ring-2 focus:ring-[#10e57a]/20 text-sm transition-all text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Konfirmasi Kata Sandi
                                </label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    placeholder="Ulangi kata sandi"
                                    passwordrules={passwordRules}
                                    className="h-11 sm:h-12 px-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 focus:bg-white focus:border-[#10e57a] focus:ring-2 focus:ring-[#10e57a]/20 text-sm transition-all text-gray-900 placeholder:text-gray-400 shadow-2xs"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            {/* Action Buttons Row */}
                            <div className="grid grid-cols-2 gap-3.5 pt-2">
                                <button
                                    type="submit"
                                    tabIndex={5}
                                    disabled={processing}
                                    data-test="register-user-button"
                                    className="h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#10e57a] to-[#05d96c] hover:brightness-105 active:scale-[0.99] text-gray-950 font-bold text-sm tracking-normal transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-xs border-0"
                                >
                                    {processing ? (
                                        <Spinner className="size-4 text-gray-950" />
                                    ) : (
                                        'Sign Up'
                                    )}
                                </button>

                                <Link
                                    href={login()}
                                    tabIndex={6}
                                    className="h-11 sm:h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm tracking-normal transition-all flex items-center justify-center text-center shadow-xs active:scale-[0.99]"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: '',
    description: '',
};
