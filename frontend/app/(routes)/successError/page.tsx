"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
    const router = useRouter()

    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex-col-reverse justify-center gap-2 sm:flex-row">
                <div className="flex justify-center sm:min-w-[400px] p-5">
                    <Image src="/failed.svg" alt={"failed"} width={150} height={500} />
                </div>
                <div className="justify-items-center">
                    <h1 className="text-5xl text-center text-neutral-900">
                        An error occurred while making the payment
                    </h1>
                    <p className="my-3 text-center text-neutral-900 md:p-2">
                        Please try again, and if the error persists, contact support and an agent will contact you as soon as possible.
                    </p>
                    <p className="my-3 text-center font-bold text-neutral-900 md:p-2">
                        support@test.info
                    </p>
                    <Button className="h-[50px] w-[150px]" onClick={() => router.push('/')}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;