/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SuccessPage = () => {
    const router = useRouter()
    const { removeAll } = useCart()

    useEffect(() => {
        removeAll()
    }, [])


    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex-col-reverse justify-center gap-2 sm:flex-row">
                <div className="flex justify-center sm:min-w-[400px] p-5">
                    <Image src="/check.svg" alt={"Success"} width={150} height={500} />
                </div>
                <div className="justify-items-center">
                    <h1 className="text-5xl text-center text-neutral-900">Thanks for your purchase</h1>
                    <p className="my-3 text-center text-neutral-900 md:p-2">Your order is currently being prepared.</p>
                    <p className="my-3 text-center text-neutral-900 md:p-2">We'll email you an order confirmation with details and tracking info.</p>
                    <Button className="h-[50px] w-[150px]" onClick={() => router.push('/')}>
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;