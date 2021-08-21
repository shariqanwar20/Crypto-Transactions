import React from "react";
import { Formik } from "formik";
import { tokenType, transactionType } from "../../constants";

type Props = {
  handleSubmit: (values: any) => Promise<void>
  setToken: any
}

export default ({ handleSubmit, setToken }: Props) => {
  return (
    <div
      className="bg-secondaryBg py-8 h-screen"
      style={{
        position: "relative",
      }}
    >
      <Formik
        initialValues={{
          toAddress: "",
          amountToSend: 0,
          token: tokenType.dai,
        }}
        // validationSchema={validationSchema}
        onSubmit={(values: transactionType) => {
          handleSubmit(values);
        }}
      >
        {({ values, touched, errors, handleSubmit, handleChange }) => (
          <form
            className="w-full lg:w-4/5 px-5 mx-auto space-y-6 py-12"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            onSubmit={handleSubmit}
          >
            <div className="lg:grid lg:grid-cols-4 lg:gap-2 justify-between text-center">
              <select
                name="token"
                value={values.token}
                onChange={(e) => {
                  setToken(e.target.value)
                  handleChange(e)
                }}
                className="w-full col-span-1 my-6 lg:my-0 bg-primaryBg rounded text-primaryText focus:ring-primaryText focus:ring-6 focus:ring-offset-0 pl-4 font-semibold text-xl"
              >
                <option value="DAI" className="w-full col-span-1 my-6 lg:my-0 bg-primaryBg text-primaryText pl-4 font-semibold text-xl">Dai</option>
                <option value="ETHER" className="w-full col-span-1 my-6 lg:my-0 bg-primaryBg text-primaryText pl-4 font-semibold text-xl">Ether</option>
              </select>
              <input
                type="text"
                name="toAddress"
                value={values.toAddress}
                onChange={handleChange}
                placeholder="Enter Reciever's Wallet Address"
                className="w-full col-span-2 my-6 lg:my-0 bg-primaryBg rounded text-primaryText focus:ring-primaryText focus:ring-6 focus:ring-offset-0 pl-4 font-semibold text-xl"
                style={{ height: "4.1rem" }}
              />
              <input
                type="number"
                name="amountToSend"
                value={values.amountToSend}
                onChange={handleChange}
                placeholder="Enter amount of tokens"
                className="w-full col-span-1 my-6 lg:my-0 bg-primaryBg rounded text-primaryText focus:ring-primaryText focus:ring-6 focus:ring-offset-0 pl-4 font-semibold text-xl"
                style={{ height: "4.1rem" }}
              />
            </div>
            <button
              type="submit"
              className="py-4 px-4 text-lg md:text-xl md:px-10 text-center font-semibold rounded-full shadow-md text-primaryText border-2 border-alternateText hover:bg-alternateText"
            >
              Send Amount
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
