import React from "react";

type Props = {
  handleLogin: () => Promise<boolean>;
  balance: string;
};
export const Navbar = ({ handleLogin, balance }: Props) => {
  return (
        <div className="bg-primaryBg">
          <div className="max-w-7xl mx-auto px-2 sm:px-6">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center items-stretch justify-between">
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
                <div className="block ml-6">
                  <div className="flex space-x-2">
                    <div className="text-secondaryText block px-3 py-2 rounded-md text-base font-medium">
                      {`Balance: ${Number(balance).toFixed(4)}`}
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
        </div>
  );
};
