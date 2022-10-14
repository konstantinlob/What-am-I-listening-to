// mutates array and returns it for convenience
export const addArrayPadding = (array: any[], length: number, padding: any = null) => {
    array.concat(Array(length - array.length).fill(padding));
    return array;
};
