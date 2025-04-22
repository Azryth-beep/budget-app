export const formatNumber = (value: number, format: { currency: string; decimals: number; separator: string }) => {
    return `${format.currency}${value.toFixed(format.decimals).replace('.', format.separator)}`;
};