import { weekType } from '../lib/Interfaces'
import DayComp from './DayComp'

interface Props {
    item: weekType
}

export default function WeekComp(props: Props) {
  return (
    <div className='cal-row'>
{ props.item.day ? props.item.day.map((day, idx) =><DayComp key={idx + 1} day={day}/>) : <></>}
    </div>
  )
}
