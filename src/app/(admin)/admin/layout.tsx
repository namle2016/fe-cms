import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
    title: "Admin | Yaly Men Emporium",
    description: "Yaly Men Emporium",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => <div >{children}</div >;

export default AdminLayout;