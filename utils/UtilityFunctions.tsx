export function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRl",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    currencyDisplay: "symbol",
    currencySign: "accounting",
  });
}
