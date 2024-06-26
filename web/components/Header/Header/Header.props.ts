import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    setActive: (e: boolean) => void;
}