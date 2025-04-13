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
                <Link href="/category/cases" className="block">Cases</Link>
                <Link href="/category/cases-airpods" className="block">Airpods cases</Link>
                <Link href="/category/wallets" className="block">Wallets</Link>
            </PopoverContent>
        </Popover>
    );
}

export default ItemsMenuMobile;