export enum Timeframe {
    Month,
    HalfYear,
    Year,
};

export const timeRange = {
    [Timeframe.Month]: "short_term",
    [Timeframe.HalfYear]: "medium_term",
    [Timeframe.Year]: "long_term",
};
