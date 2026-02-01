export function shortenTxt(
    txt?: string,
    frontSlice = 18,
    backSlice = 9
): string {
    if (!txt) return '';
    if (txt.length < frontSlice + backSlice) return txt;
    return txt.slice(0, frontSlice) + '...' + txt.slice(-backSlice);
}
  

export function shortenAddress(
    txt?: string,
    frontSlice = 9,
    backSlice = 9
): string {
    if (!txt) return '';
    if (txt.length < frontSlice + backSlice) return txt;
    return txt.slice(0, frontSlice) + '...' + txt.slice(-backSlice);
}
  

export function getWeeksFromStartDate(startDate: Date): number {
    const now = new Date()
    const diffMs = now.getTime() - startDate.getTime()
    const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
    return Math.max(1, diffWeeks + 1)
}


export function formatNumberWithCommas(value: string): string {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '')
    if (!numericValue) return ''
    // Format with commas
    return parseInt(numericValue, 10).toLocaleString('en-US')
}


export function calculateEndDate(startDate: Date, weeks: number): Date {
    // Defensive copy and ensure positive weeks
    const result = new Date(startDate.getTime());
    if (!Number.isFinite(weeks) || !startDate || isNaN(startDate.getTime())) {
      throw new Error("Invalid arguments passed to calculateEndDate");
    }
    result.setDate(result.getDate() + weeks * 7);
    return result;
}