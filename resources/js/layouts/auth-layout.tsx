import React from 'react';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';
import type { AuthLayoutProps } from '@/types';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: AuthLayoutProps) {
    const pageLayout =
        React.isValidElement(children) &&
        typeof (children.type as { layout?: { title?: string; description?: string } })?.layout === 'object'
            ? (children.type as { layout?: { title?: string; description?: string } }).layout
            : null;

    const resolvedTitle = title || pageLayout?.title || '';
    const resolvedDescription = description || pageLayout?.description || '';

    return (
        <AuthSplitLayout title={resolvedTitle} description={resolvedDescription}>
            {children}
        </AuthSplitLayout>
    );
}
