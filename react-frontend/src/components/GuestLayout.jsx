import {Fragment, useState} from 'react'
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {Dialog, Disclosure, Menu, Transition} from "@headlessui/react";
import {Navigate, NavLink, Outlet} from "react-router-dom";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {userStateContext} from "../context/ContextProvider.jsx";

const navigation = [
    { name: 'Product', href: '/product' },
    { name: 'Features', href: '/features' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Company', href: '/company' },
    { name: 'Contact', href: '/contact' },
]

const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Dashboard', href: '/user/dashboard' },
    { name: 'Settings', href: '/user/settings' },
    { name: 'Sign out', href: '#' },
]
const userLoginNavigation = [
    { name: 'Log in', href: '/login' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function GuestLayout() {
    const { currentUser, setCurrentUser, token, setToken } = userStateContext()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const isUserImage = currentUser.image !== '' && currentUser.image !== 'null';

    return (
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <NavLink to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </NavLink>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <NavLink key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    {
                        token ?
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <Disclosure as="nav">
                                    {({ open }) => (
                                        <>
                                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                <div className="flex h-16 items-center justify-between">
                                                    <div className="hidden md:block">
                                                        <div className="ml-4 flex items-center md:ml-6">
                                                            <button
                                                                type="button"
                                                                className="relative rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                            >
                                                                <span className="absolute -inset-1.5" />
                                                                <span className="sr-only">View notifications</span>
                                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>

                                                            {/* Profile dropdown */}
                                                            <Menu as="div" className="relative ml-3">
                                                                <div>
                                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                                        <span className="absolute -inset-1.5" />
                                                                        <span className="sr-only">Open user menu</span>
                                                                        {
                                                                            isUserImage ?
                                                                                <div className="flex items-center h-10 w-10 rounded-full overflow-hidden">
                                                                                    <img className="h-auto w-10 rounded-full" src={`http://127.0.0.1:8000/${currentUser.image}`} alt={currentUser.name} />
                                                                                </div>
                                                                                :
                                                                                <UserCircleIcon className="h-8 w-8 bg-white"/>
                                                                        }
                                                                    </Menu.Button>
                                                                </div>
                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-out duration-100"
                                                                    enterFrom="transform opacity-0 scale-95"
                                                                    enterTo="transform opacity-100 scale-100"
                                                                    leave="transition ease-in duration-75"
                                                                    leaveFrom="transform opacity-100 scale-100"
                                                                    leaveTo="transform opacity-0 scale-95"
                                                                >
                                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        {
                                                                            (token ?
                                                                                userNavigation : userLoginNavigation).map((item) => (
                                                                                item.name !== 'Sign out' ?
                                                                                    <Menu.Item key={item.name}>
                                                                                        {({ active }) => (
                                                                                            <NavLink
                                                                                                to={item.href} className={classNames(
                                                                                                active ? 'bg-gray-100' : '',
                                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                                            )}
                                                                                            >
                                                                                                {item.name}
                                                                                            </NavLink>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                    :
                                                                                    <Menu.Item key={item.name}>
                                                                                        {({ active }) => (
                                                                                            <NavLink onClick={handleLogout}
                                                                                                     to={item.href} className={classNames(
                                                                                                active ? 'bg-gray-100' : '',
                                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                                            )}
                                                                                            >
                                                                                                {item.name}
                                                                                            </NavLink>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                            ))
                                                                        }
                                                                    </Menu.Items>
                                                                </Transition>
                                                            </Menu>
                                                        </div>
                                                    </div>
                                                    <div className="-mr-2 flex md:hidden">
                                                        {/* Mobile menu button */}
                                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Open main menu</span>
                                                            {open ? (
                                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </Disclosure.Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <Disclosure.Panel className="md:hidden">
                                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                                    {navigation.map((item) => (
                                                        <Disclosure.Button
                                                            key={item.name}
                                                            as="button"
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'block rounded-md px-3 py-2 text-base font-medium'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </Disclosure.Button>
                                                    ))}
                                                </div>
                                                <div className="border-t border-gray-700 pb-3 pt-4">
                                                    <div className="flex items-center px-5">
                                                        <div className="flex-shrink-0">
                                                            {
                                                                isUserImage ?
                                                                    <div className="flex items-center h-10 w-10 rounded-full overflow-hidden">
                                                                        <img className="h-auto w-10 rounded-full" src={`http://127.0.0.1:8000/${currentUser.image}`} alt={currentUser.name} />
                                                                    </div>
                                                                    :
                                                                    <UserCircleIcon className="h-8 w-8 bg-white" />
                                                            }
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium leading-none text-gray-400">{currentUser.username}</div>
                                                            <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                        >
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">View notifications</span>
                                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-3 space-y-1 px-2">
                                                        {
                                                            (currentUser.name ?
                                                                userNavigation : userLoginNavigation).map((item) => (
                                                                item.name !== 'Sign out' ?
                                                                    <Disclosure.Button
                                                                        key={item.name}
                                                                        as="button"
                                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                                    >
                                                                        <NavLink to={item.href}>
                                                                            {item.name}
                                                                        </NavLink>
                                                                    </Disclosure.Button>
                                                                    :
                                                                    <Disclosure.Button
                                                                        key={item.name}
                                                                        as="button"
                                                                        onClick={handleLogout}
                                                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                                    >
                                                                        <NavLink to={item.href}>
                                                                            {item.name}
                                                                        </NavLink>
                                                                    </Disclosure.Button>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            :
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <NavLink to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </NavLink>
                            </div>
                    }
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <NavLink to="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </NavLink>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <Disclosure>
                                        <div className="border-t border-gray-700 pb-3 pt-4">
                                            <div className="flex items-center px-5">
                                                {
                                                    token &&
                                                    <div className="flex-shrink-0">
                                                        {
                                                            isUserImage ?
                                                                <div className="flex items-center h-10 w-10 rounded-full overflow-hidden">
                                                                    <img className="h-auto w-10 rounded-full" src={`http://127.0.0.1:8000/${currentUser.image}`} alt={currentUser.name} />
                                                                </div>
                                                                :
                                                                <UserCircleIcon className="h-8 w-8 bg-white" />
                                                        }
                                                    </div>
                                                }
                                                {
                                                    token &&
                                                    <div className="ml-3">
                                                        <div className="text-sm pb-1 font-medium leading-none text-gray-400">{currentUser.username}</div>
                                                        <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                                                    </div>
                                                }
                                                {
                                                    token &&
                                                    <button
                                                        type="button"
                                                        className="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                    >
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">View notifications</span>
                                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                }
                                            </div>
                                            <div className="mt-3 space-y-1 px-2">
                                                {
                                                    (token ?
                                                        userNavigation : userLoginNavigation).map((item) => (
                                                        item.name !== 'Sign out' ?
                                                            <NavLink
                                                                key={item.name}
                                                                to={item.href}
                                                                className="block rounded-md px-3 py-2 text-black font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                            >
                                                                {item.name}
                                                            </NavLink>
                                                            :
                                                            <NavLink
                                                                key={item.name}
                                                                to={item.href}
                                                                onClick={handleLogout}
                                                                className="block rounded-md px-3 py-2 text-black font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                            >
                                                                {item.name}
                                                            </NavLink>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Disclosure>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a52a2a] to-[#fd9d46] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <Outlet />
            </div>

        </div>

    )
}
