import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => {

    const dataFooter = [
        {
            id: 1,
            name: "About Us",
            link: "#"
        },
        {
            id: 2,
            name: "Products",
            link: "#"
        },
        {
            id: 3,
            name: "My Account",
            link: "#"
        },
        {
            id: 4,
            name: "Privacy policies",
            link: "#"
        }
    ]
    return (
        <footer className="mt-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className=" sm:flex sm:items-center sm:justify-between">
                    <p>
                        <span className="font-bold">
                            E-store
                        </span>
                        E-commerce
                    </p>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        {dataFooter.map((data) => (
                            <li key={data.id}>
                                <Link href={data.link} className="hover:underline me-4 md:me-6">{data.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <Separator className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    &copy; 2025
                    <Link href="https://github.com/mariogruby">mariogruby. </Link>All rights reserved
                </span>
            </div>
        </footer>
    );
}

export default Footer;