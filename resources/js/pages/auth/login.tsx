import { Form, Head, Link, router } from '@inertiajs/react';
import { ArrowRight, Building2, ShieldCheck, Sparkles, User } from 'lucide-react';
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

const demoAccounts = [
    {
        key: 'admin',
        title: 'Admin',
        badge: 'Pusat',
        email: 'admin@jagain.id',
        password: 'password',
        desc: 'Komando & GIS',
        themeClass: 'bg-emerald-50/70 border-emerald-200 hover:border-[#0c4e33] hover:bg-emerald-50 focus:ring-[#0c4e33]',
        iconBg: 'bg-[#0c4e33] text-white',
        badgeClass: 'bg-emerald-100 text-[#0c4e33]',
        icon: ShieldCheck,
    },
    {
        key: 'opd',
        title: 'OPD / BPBD',
        badge: 'Satgas',
        email: 'opd.kalbar@jagain.id',
        password: 'password',
        desc: 'Petugas Lapangan',
        themeClass: 'bg-amber-50/70 border-amber-200 hover:border-amber-500 hover:bg-amber-50 focus:ring-amber-500',
        iconBg: 'bg-amber-500 text-white',
        badgeClass: 'bg-amber-100 text-amber-800',
        icon: Building2,
    },
    {
        key: 'warga',
        title: 'Warga',
        badge: 'Publik',
        email: 'warga@jagain.id',
        password: 'password',
        desc: 'Pelapor Karhutla',
        themeClass: 'bg-sky-50/70 border-sky-200 hover:border-sky-500 hover:bg-sky-50 focus:ring-sky-500',
        iconBg: 'bg-sky-600 text-white',
        badgeClass: 'bg-sky-100 text-sky-800',
        icon: User,
    },
];

export default function Login({ status, canResetPassword }: Props) {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loadingRole, setLoadingRole] = useState<string | null>(null);

    const handleDemoLogin = (account: (typeof demoAccounts)[number]) => {
        setEmailValue(account.email);
        setPasswordValue(account.password);
        setLoadingRole(account.key);

        router.post(
            store.url(),
            {
                email: account.email,
                password: account.password,
                remember: true,
            },
            {
                preserveScroll: true,
                onError: () => {
                    setLoadingRole(null);
                },
                onFinish: () => {
                    setLoadingRole(null);
                },
            }
        );
    };

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
            <div className="mb-6">
                <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                    Hey, Hello<span className="inline-block hover:rotate-12 transition-transform">👋</span>
                </h1>
                <p className="mt-1.5 text-sm text-gray-500 font-normal">
                    Enter your email and password to sign in.
                </p>
            </div>

            {/* Quick Demo Accounts Selection */}
            <div className="mb-6 rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-3 sm:p-3.5 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-[#0c4e33]" />
                        <span className="text-xs font-bold text-neutral-900 tracking-tight">
                            Akun Demo Cepat (1-Klik Masuk)
                        </span>
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-500 bg-white border border-neutral-200 px-2 py-0.5 rounded-full">
                        Pass: <code className="font-mono text-neutral-800">password</code>
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {demoAccounts.map((account) => {
                        const Icon = account.icon;
                        const isLoading = loadingRole === account.key;

                        return (
                            <button
                                key={account.key}
                                type="button"
                                disabled={loadingRole !== null}
                                onClick={() => handleDemoLogin(account)}
                                className={`group relative flex flex-col justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                    account.themeClass
                                } hover:shadow-xs active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed`}
                            >
                                <div className="flex items-center justify-between w-full mb-1.5">
                                    <div className={`p-1.5 rounded-lg ${account.iconBg} shrink-0`}>
                                        <Icon className="size-3.5" />
                                    </div>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${account.badgeClass}`}>
                                        {account.badge}
                                    </span>
                                </div>

                                <div className="w-full">
                                    <div className="text-xs font-bold text-neutral-900 leading-tight">
                                        {account.title}
                                    </div>
                                    <div className="text-[10px] text-neutral-500 font-mono truncate mt-0.5" title={account.email}>
                                        {account.email}
                                    </div>
                                </div>

                                <div className="mt-2 pt-1.5 border-t border-black/5 flex items-center justify-between w-full text-[10px] font-bold text-neutral-600 group-hover:text-neutral-900">
                                    <span>{isLoading ? 'Masuk...' : 'Masuk'}</span>
                                    {isLoading ? (
                                        <Spinner className="size-2.5 text-[#0c4e33]" />
                                    ) : (
                                        <ArrowRight className="size-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Divider: atau masuk manual */}
            <div className="relative mb-5 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    atau masuk manual
                </span>
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
