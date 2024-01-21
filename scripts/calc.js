export function calc(year, month, day) {

    const targetDate = new Date(year, month, day)

    console.log(targetDate)

    const currentDate = new Date()

    const timeDifference = currentDate - targetDate

    const timeDifferenceDate = new Date(timeDifference)

    const yearsDifference = timeDifferenceDate.getUTCFullYear() - 1970
    const monthsDifference = timeDifferenceDate.getUTCMonth()
    const daysDifference = timeDifferenceDate.getUTCDate() - 1 // to account for the initial day

    console.log(`Years: ${yearsDifference} | Months: ${monthsDifference} | Days: ${daysDifference}`)
}