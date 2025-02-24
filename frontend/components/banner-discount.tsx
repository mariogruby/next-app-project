"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
export function BannerDiscount() {
    const words = [
        {
            text: "Get",
        },
        {
            text: "up",
        },
        {
            text: "to",
        },
        {
            text: "-25%",
        },
        {
            text: "discount.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[20rem]  ">
            <TypewriterEffectSmooth words={words} />
            <p className="mx-5 text-neutral-600 dark:text-neutral-200 text-md sm:text-base">
            -20% on purchases of $100 or -25% on purchases of $150. Use code: <span className="font-bold">MYFIRSTBUY</span>
            </p>
            <div className="mt-5 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                <button className="w-40 h-10 rounded-xl  bg-neutral-900 border dark:border-white border-transparent text-white text-sm">
                    Shop now 
                </button>
                <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                    More info
                </button>
            </div>
        </div>
    );
}
