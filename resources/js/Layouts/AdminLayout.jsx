import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';

export default function EmployeeLayout({ user, children }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex">
            <aside>
                <div id="drawer-sidebar" className={`sticky top-0 z-50 bg-teal-500 text-white w-64 h-screen px-6 py-4 transition duration-300 ${isDrawerOpen ? 'transform translate-x-0' : '-translate-x-full sm:translate-x-0'
                    }`}>
                    <div className=" mb-4 py-2">
                        <h1 className="font-bold text-2xl">TJM Sportswear</h1>
                    </div>
                    <ul>
                        <li className="mb-3">
                            <Link href={route('employee.dashboard')} className="text-gray-200 hover:text-white">
                                Dashboard
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link href={route('employee.teams')} className="text-gray-200 hover:text-white">
                                Teams
                            </Link>
                        </li>
                        {user.department_id === 1 && (
                            <li className="mb-3">
                                <Link href={route('employee.production')} className="text-gray-200 hover:text-white">
                                    Production
                                </Link>
                            </li>
                        )}

                        {user.department_id === 4 && (
                            <li className="mb-3">
                                <Link href={route('employee.printers')} className="text-gray-200 hover:text-white">
                                    Printers
                                </Link>
                            </li>
                        )}
                        {(user.department_id === 2) && (
                            <div>
                                <li className="mb-3">
                                    <Link href={route('employee.pending')} className="text-gray-200 hover:text-white">
                                        Pending Teams
                                    </Link>
                                </li>
                            </div>
                        )}


                    </ul>
                </div>
            </aside>
            <main className="sm:w-full w-full absolute sm:relative left-0">
                <nav class="bg-gray-100 z-20 sticky top-0 p-4 flex flex-row-reverse">
                    <div class="flex flex-wrap items-center">
                        <button id="drawer-toggle" className="sm:hidden" onClick={toggleDrawer}><svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z" />
                        </svg></button>
                        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                        </button>
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400  dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.first_name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.show')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('employee.logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>


                </nav>
                <div className="p-8">{children}</div></main>
        </div >
    );
}
