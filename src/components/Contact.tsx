"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import SmokeFadeIn from "./SmokeFadeIn";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <div className="w-full h-full items-center justify-center">
      <SmokeFadeIn>
        <form
          className="w-full max-w-md sm:max-w-lg mb-10 md:max-w-2xl lg:max-w-6xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-left text-4xl sm:text-5xl lg:text-6xl text-white mb-8 lg:mb-12">
            <p>Contact</p>
            <p className="pt-5 text-base">
              Get in touch, and I&apos;ll get back to you as soon as I can
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-1">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                {...register("name", { required: true })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-white"
            >
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              {...register("message", { required: true })}
            ></textarea>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className=" rounded-md bg-purple-500 py-3 px-8 text-lg font-semibold text-white outline-none hover:bg-purple-600 focus:ring-2 focus:ring-purple-200 focus:ring-offset-2 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </SmokeFadeIn>
    </div>
  );
};

export default Contact;
