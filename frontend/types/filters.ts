export type FiltersTypes = {
    result: ResultFilterTypes | null;
    loading: boolean;
    error: string;
}

export type ResultFilterTypes = {
    data: {
        schema: {
            attributes: {
                model: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    enum: any
                }
            }
        }
    }
}