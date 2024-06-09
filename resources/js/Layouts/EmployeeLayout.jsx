import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import DashboardLink from '@/Components/DashboardLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { Checkbox, CheckmarkDone, Cube, CubeOutline, Home, Hourglass, Image, Print, PrintOutline, Time, TimeOutline } from 'react-ionicons';


export default function EmployeeLayout({ user, children }) {


    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex">
            {/* {route().current('employee.dashboard') && (
                <div className='w-full h-56 bg-teal-500 absolute top-0 -z-[0]'>hello</div>
            )} */}
            <aside>
                <div id="drawer-sidebar" className={`sticky top-0 z-50 bg-gray-50 w-64 h-screen transition duration-300 ${isDrawerOpen ? 'transform translate-x-0' : '-translate-x-full sm:translate-x-0'
                    }`}>
                    <div className=" mb-4 py-2">
                        <h1 className="font-bold text-2xl flex gap-2 text-teal-500 px-6 py-4 "><img src='/images/TJM_LOGO.png' className='h-8' />Sportswear</h1>
                    </div>

                    <ul>
                        <li className="mb-2">
                            <DashboardLink href={route('employee.dashboard')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.dashboard')}>
                                <span><Home color={'teal'} height="20px" /></span>Dashboard
                            </DashboardLink>
                        </li>
                        <li className="mb-2">
                            <DashboardLink href={route('employee.teams')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.teams')}>
                                <span><Cube color={'teal'} height="20px" /></span>Orders
                            </DashboardLink>
                        </li>
                        {user.department_id === 1 && (
                            <li className="mb-2">
                                <DashboardLink href={route('employee.production')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.production')}>
                                    <span><Time color={'teal'} height="20px" /></span>Production
                                </DashboardLink>
                            </li>
                        )}

                        {user.department_id === 4 && (
                            <li className="mb-2">
                                <DashboardLink href={route('employee.printers')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.printers')}>
                                    <span><Print color={'teal'} height="20px" /></span>Printers
                                </DashboardLink>
                            </li>
                        )}


                        {(user.department_id === 2) && (
                            <div>
                                <li className="mb-2">
                                    <DashboardLink href={route('employee.pending')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.pending')}>
                                        <span><Hourglass color={'teal'} height="20px" /></span>Pending Teams
                                    </DashboardLink>
                                </li>
                                <li className="mb-2">
                                    <DashboardLink href={route('employee.finished')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.finished')}>
                                        <span><CheckmarkDone color={'teal'} height="20px" /></span>Finished Teams
                                    </DashboardLink>
                                </li>
                            </div>
                        )}


                        {(user.department_id === 5) && (
                            <div>
                                <li className="mb-2">

                                    <DashboardLink href={route('employee.checking')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.checking')}>
                                        <span><Checkbox color={'teal'} height="20px" /></span>Checking
                                    </DashboardLink>
                                </li>
                                <li className="mb-2">
                                    <DashboardLink href={route('employee.finalchecking')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.finalchecking')}>
                                        <span><CheckmarkDone color={'teal'} height="20px" /></span>Final Checking
                                    </DashboardLink>
                                </li>
                                <li className="mb-2">
                                    <DashboardLink href={route('employee.finished')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.finished')}>
                                        <span><CheckmarkDone color={'teal'} height="20px" /></span>Finished Teams
                                    </DashboardLink>
                                </li>
                            </div>
                        )}

                        {(user.department_id === 1) && (
                            <div>
                                <li className="mb-2">
                                    <DashboardLink href={route('employee.gallery')} className="text-gray-500 hover:text-gray-900 inline-flex gap-2 px-6" active={route().current('employee.pending')}>
                                        <span><Image color={'teal'} height="20px" /></span>Gallery
                                    </DashboardLink>
                                </li>
                            </div>
                        )}


                    </ul>
                </div>
            </aside>
            <main className="sm:w-full w-full absolute sm:relative left-0">

                <nav class="bg-gray-100 z-20 sticky top-0 p-3 flex flex-row-reverse">
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
                                                <img src={user.profile_image ? `/images/employees/${user.profile_image}` : '/images/customers/profile.jpg'} alt="" className='h-5 rounded-full me-2' />
                                                {user.name}

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

                <div className="p-2 md:p-8">
                    {children}</div></main>

        </div >
    );
}
