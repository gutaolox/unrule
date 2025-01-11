import React, { ReactNode } from 'react';

interface IfProps {
    condition: boolean;
    children: ReactNode;
}

const If: React.FC<IfProps> = ({ condition, children }) => {
    return condition ? <>{children}</> : null;
};

export default If;