import '../styles/calendar.scss'
import { useEffect, useState } from "react"
import { dayType, weekType } from "../lib/Interfaces"
import WeekComp from "./WeekComp"

export default function Calendar() {

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // const [calendar, setCalendar] = useState<dayType[]>([])
    const [week, setWeek] = useState<weekType[]>([])
    const [monthStr, setMonthStr] = useState('')
    const [yearN, setYearN] = useState<number | null>()
    const [nav, setNav] = useState(0)

    const load = () => {
      setWeek([])
        const dt = new Date()

        if(nav !== 0) {
          dt.setMonth(new Date().getMonth() + nav)
        }

        // const day = dt.getDate()
        let month = dt.getMonth()
        const year = dt.getFullYear()
        setYearN(year)

        const firstDayOfMonth = new Date(year, month, 1)
        const daysInMonth= new Date(year, month + 1, 0).getDate()
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate()

        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })

        setMonthStr(dt.toLocaleDateString('en-us', { month: 'long' }))

        const paddingDays: number = weekdays.indexOf(dateString.split(',')[0])

        let prevYear = year
        if(month === 0) { prevYear = year - 1 }
        // month === 1 ? prevYear = year - 1 : prevYear = year
        let weekRow : weekType[] | null = []
        let dayElement : dayType[] | null = []
        let weekCount = 1
        for(let i = 1; i <= paddingDays + daysInMonth; i++) {


            if(i > paddingDays) {
              
              dayElement.push({
                index: i,
                day: i - paddingDays,
                month: month,
                year: year,
                class: 'day'
              })

              if(dayElement.length === 7) {
                weekRow.push({
                  id: weekCount,
                  day: dayElement
                })
                weekCount++
                dayElement = []
              }

            

            } else {
              let prevMonth = month - 1
              if(month === 0) { prevMonth = 11 }

              dayElement.push({
                index: i,
                day: lastDayOfPrevMonth - paddingDays + i,
                month: prevMonth,
                year: prevYear,
                class: 'day padding'
              })

           

            }


        }

        let rest = paddingDays + daysInMonth
        let count = 1
        let nextYear = 0
        if(month > 10) nextYear = year + 1 
        let nextMonth = month + 1
        if(month === 11) nextMonth = 0
        else nextYear = year 
        while(rest % 7) {
            dayElement.push({
              index: 40 + count,
              day: count,
              month: nextMonth,
              year: nextYear,
              class: 'day padding'
            })
            rest++
            count++
        }

        weekRow.push({
          id: weekCount,
          day: dayElement
        })

        // setCalendar(dayElement)
        setWeek(weekRow)
        // console.log(weekRow)

    }

    useEffect(() => {
     load()

    }, [nav])

    const nextMonth = () => {
      setNav(nav + 1)
    }

    const prevMonth = () => {
      setNav(nav - 1)
    }

  return (
    <div className="calendar">

    <div id="cal-header">
      <div id="cal-month">{monthStr} {yearN}</div>
      <div id="cal-btns">
        <button id="backButton" onClick={prevMonth}>Back</button>
        <button id="nextButton" onClick={nextMonth}>Next</button>
      </div>
    </div>

    <div id="cal-day-header">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>

        { week ? week.map((item) => <WeekComp key={item.id} item={item} />) : ''}

    <div id="newEventModal">
      <h2>New Event</h2>

      <input id="eventTitleInput" placeholder="Event Title" />

      <button id="saveButton">Save</button>
      <button id="cancelButton">Cancel</button>
    </div>

    <div id="deleteEventModal">
      <h2>Event</h2>

      <p id="eventText"></p>

      <button id="deleteButton">Delete</button>
      <button id="closeButton">Close</button>
    </div>

    <div id="modalBackDrop"></div>

  </div>
  
  )
}
