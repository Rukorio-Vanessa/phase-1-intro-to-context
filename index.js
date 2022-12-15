// Your code here
function createEmployeeRecord(row){
    return{
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(employeeRowData){
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}


function createTimeInEvent(employeeRec, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRec.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRec
}


function createTimeOutEvent(employeeRec, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRec.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRec
}


function hoursWorkedOnDate(employeeRec, dateSought){
    const outEvent = employeeRec.timeOutEvents.find(function(e){
        return e.date === dateSought
    })
    const inEvent = employeeRec.timeInEvents.find(function(e){
        return e.date === dateSought
    })
    return (outEvent.hour - inEvent.hour) / 100

}


function wagesEarnedOnDate(employeeRec, dateSought){
    const rawWage = hoursWorkedOnDate(employeeRec, dateSought)
        * employeeRec.payPerHour
    return parseFloat(rawWage.toString())
}



function allWagesFor(employeeRec){
    const eligibleDates = employeeRec.timeInEvents.map(function(e){
        return e.date
    })

    const payOwed = eligibleDates.reduce(function(reminder, date){
        return reminder + wagesEarnedOnDate(employeeRec, date)
    }, 0)

    return payOwed
}


function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(reminder, rec){
        return reminder + allWagesFor(rec)
    }, 0)
}
