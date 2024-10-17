import { useState } from "react"
import { dayType } from "../lib/Interfaces"

interface dayProps {
    day: dayType
}

export default function DayComp(props: dayProps) {

    const [event, setEvent] = useState()


    const showDate = () => {
        console.log(new Date(props.day.year, props.day.month, props.day.day).toDateString())
      }
  return (
    <div className={props.day.class} onClick={showDate}>
        {props.day.day}
    </div>
  )
}
