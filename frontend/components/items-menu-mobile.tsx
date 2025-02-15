import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href="/categories/cases" className="block">Cases</Link>
                <Link href="/categories/airpods-cases" className="block">Airpods cases</Link>
                <Link href="/categories/wallets" className="block">Wallets</Link>
            </PopoverContent>
        </Popover>
    );
}

export default ItemsMenuMobile;