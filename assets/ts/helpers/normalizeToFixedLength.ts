// doesn't mutate input
export const normalizeToFixedLength = (array: any[], length: number, padding: any = null) => {
    const trimmedArray = array.slice(0, length);
    const buffer = Array(length - trimmedArray.length).fill(padding);
    return [...trimmedArray, ...buffer];
};
