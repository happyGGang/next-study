import { parseISO, format } from 'date-fns'

// dateString => 2022-11-12 형태로 들어옴
export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
