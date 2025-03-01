import FilterModel from "./filter-model";

type  FiltersControlsCategoryProps = {
    setFilterModel: (model: string) => void
}
const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const {setFilterModel} = props;
    return (
        <div className="sm:w-[350px] md:w-[150px] sm:mt-5 p-6">
            <FilterModel setFilterModel={setFilterModel} />
        </div>
    );
}

export default FiltersControlsCategory;