import React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

type Props = {
  handleLogin: () => Promise<boolean>
  balance: string
}
export const Navbar = ({ handleLogin, balance }: Props) => {
  return (
    <Disclosure as="nav" className="bg-primaryBg fixed w-full z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  style={{ color: "white" }}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primaryBg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    <div className="text-secondaryText block px-3 py-2 rounded-md text-base font-medium">
                      {`Balance: ${balance}`}
                    </div>
                  <button
                        onClick={handleLogin}
                        className="bg-alternateText text-secondaryText hover:text-primaryText block px-3 py-2 rounded-md text-base font-medium"
                      >
                        Connect
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  className="text-secondaryText hover:text-alternateText block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
};
