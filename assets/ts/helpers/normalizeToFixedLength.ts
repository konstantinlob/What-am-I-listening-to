// doesn't mutate input
export const normalizeToFixedLength = (array: any[], length: number, padding: any = null) => {
    const buffer = Array(length - array.length).fill(padding);
    return [...array.slice(0, length), ...buffer];
};
