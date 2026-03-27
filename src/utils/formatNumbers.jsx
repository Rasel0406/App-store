const COMPACT_FORMATTER = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')

export const formatDownloads = (value = 0) => COMPACT_FORMATTER.format(value)

export const formatPlainNumber = (value = 0) => NUMBER_FORMATTER.format(value)

export const formatRating = (value = 0) => Number(value).toFixed(1)
