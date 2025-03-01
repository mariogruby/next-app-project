import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FiltersTypes } from "@/types/filters";
import { useSearchParams } from "next/navigation";

type FilterModelProps = {
    setFilterModel: (model: string) => void;
};

const FilterModel = (props: FilterModelProps) => {
    const { setFilterModel } = props;
    const { result, loading }: FiltersTypes = useGetProductField();
    const searchParams = useSearchParams();
    const selectedModel = searchParams.get("model") || "";

    return (
        <div className="my-5 w-[150px]">
            <p className="mb-3 font-bold">Model</p>

            {loading && !result ? (
                <p>Loading models...</p>
            ) : (
                <RadioGroup value={selectedModel} onValueChange={(value) => setFilterModel(value)}>
                    {result && (
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="all" />
                            <Label htmlFor="all">All</Label>
                        </div>
                    )}

                    {result?.data?.schema?.attributes?.model?.enum?.map((model: string) => (
                        <div key={model} className="flex items-center space-x-2">
                            <RadioGroupItem value={model} id={model} />
                            <Label htmlFor={model}>{model}</Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    );
};

export default FilterModel;

