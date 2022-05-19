import { testAPI } from '../lib/notes'


export async function getTimeAndDate() {
    //this funtion need to return the current time and date

    let today = new Date();


    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();


    today = yyyy + '-' + mm + '-' + (dd);

    const testData = await testAPI()
    const datesArr = []

    //use a while loop to help get a date that works

    for (let i in await testData) {
        datesArr.push(i)
    }
    return datesArr[0]
}

// function checkHoliday(currentDate) {
//     // 
//     const twentyTwoClosed = ['2022-01-17', '2022-02-21', '2022-04-15', '2022-05-30', '2022-06-20', '2022-07-04', '2022-09-5', '2022-11-24', '2022-12-26']
//     for (let i in twentyTwoClosed) {
//         if (currentDate === twentyTwoClosed[i]) {
//             return false
//         }
//         return true
//     }
// }

// function weekdayFilter(currentDate) {
//     const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
//     for (let i in weekDays) {
//         if (currentDate.indexOf(weekDays[i]) == -1) {
//             return false
//         }
//     }
//     return true
// }