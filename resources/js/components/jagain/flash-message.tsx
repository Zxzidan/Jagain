import { usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FlashMessage() {
    const { flash } = usePage<{ flash?: { success?: string | null; error?: string | null } }>().props;
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        setDismissed(false);
    }, [flash?.success, flash?.error]);

    if (dismissed || (!flash?.success && !flash?.error)) {
        return null;
    }

    const isSuccess = Boolean(flash?.success);
    const message = flash?.success || flash?.error;

    return (
        <div
            className={`mb-4 flex items-center justify-between rounded-lg border p-4 text-sm transition-all ${
                isSuccess
                    ? 'border-[#216B49]/30 bg-[#E8F1EB] text-[#174B35] dark:border-[#216B49]/40 dark:bg-[#174B35]/20 dark:text-emerald-200'
                    : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-200'
            }`}
        >
            <div className="flex items-center gap-2.5">
                {isSuccess ? (
                    <CheckCircle2 className="size-5 shrink-0 text-[#216B49] dark:text-emerald-400" />
                ) : (
                    <AlertCircle className="size-5 shrink-0 text-rose-600 dark:text-rose-400" />
                )}
                <span className="font-medium">{message}</span>
            </div>
            <button
                type="button"
                onClick={() => setDismissed(true)}
                className="rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Tutup pesan"
            >
                <X className="size-4" />
            </button>
        </div>
    );
}
