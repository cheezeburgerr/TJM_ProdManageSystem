import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function LoginLayout({ children, user }) {

    return (
        <div className={`min-h-screen ${user === 'admin' ? 'bg-gray-900' : 'bg-teal-500'} sm:justify-center items-center sm:pt-0 bg-gray-100 dark:bg-gray-900`}>




            <div className="h-screen flex justify-center items-center">
                <div className={`w-full sm:max-w-md hover:scale-105 transition ease-in px-6 py-6 dark:bg-gray-800 bg-white overflow-hidden sm:rounded-lg`}>

                    {children}


                </div>
            </div>
        </div>
    );
}
