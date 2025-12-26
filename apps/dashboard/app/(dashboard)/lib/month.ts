export type MonthParts = {
  year: number;
  month: number;
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export const normalizeMonthParam = (value?: string): string => {
  if (!value) {
    return formatMonthParam(new Date());
  }

  const match = /^\d{4}-\d{2}$/.exec(value);
  if (!match) {
    return formatMonthParam(new Date());
  }

  const [year, month] = value.split("-").map(Number);
  if (!year || !month || month < 1 || month > 12) {
    return formatMonthParam(new Date());
  }

  return `${year}-${String(month).padStart(2, "0")}`;
};

export const parseMonthParam = (value: string): MonthParts => {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
};

export const formatMonthParam = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const getMonthLabel = (value: string): string => {
  const { year, month } = parseMonthParam(value);
  return monthFormatter.format(new Date(year, month - 1, 1));
};

export const addMonths = (value: string, delta: number): string => {
  const { year, month } = parseMonthParam(value);
  const date = new Date(year, month - 1 + delta, 1);
  return formatMonthParam(date);
};
