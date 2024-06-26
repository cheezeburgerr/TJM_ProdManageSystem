import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex justify-center items-center  pt-1 px-8 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-teal-400 dark:bg-teal-600 text-white dark:text-gray-100 font-extrabold focus:border-teal-700 hover:bg-gray-700 dark:hover:bg-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
