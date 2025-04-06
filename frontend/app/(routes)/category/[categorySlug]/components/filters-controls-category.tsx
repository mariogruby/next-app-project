import FilterModel from "./filter-model";
import { usePathname } from "next/navigation"

type  FiltersControlsCategoryProps = {
    setFilterModel: (model: string) => void
}
const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const {setFilterModel} = props;
    const pathname = usePathname();
    const showRadioGroup = pathname === "/category/cases"; // this is because products that are not cases, that do not have assigned models
    return (
        <div className={showRadioGroup ? "sm:w-[350px] md:w-[150px] sm:mt-5 p-6" : "hidden"}>
            <FilterModel setFilterModel={setFilterModel} />
        </div>
    );
}

export default FiltersControlsCategory;