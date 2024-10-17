
export interface dayType {
    index: number,
    day: number,
    month: number,
    year: number,
    class: string
}

export interface weekType {
    id: number,
    day: dayType[]
}

export interface eventType {
    id: number,
    date: dayType,
    des: string,
    end: dayType | null,
    del: dayType | null
}

export interface UserSavedInfo {
    id: string,
    userType: string,
    userAuth: string,
    eventID: Array<string> | null,
    listID: Array<string> | null
}