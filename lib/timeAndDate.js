export function getTimeAndDate() {
    //this funtion need to return the current time and date

    // this gets the day of the week and there will be logic that shows the last market day i.e(friday) 
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    let prnDt = new Date().toLocaleTimeString('en-us', options);
    if (prnDt.indexOf('Sunday') != -1) { console.log('weekend') }


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    //TODO: Think more about how you want to deal with time and markets
    if (prnDt.indexOf('Sunday') != -1) { dd -= 1 }
    if (prnDt.indexOf('Monday') != -1) { dd -= 2 }
    if (dd != 1) { dd - 1 }


    //TODO: need a better logic for determing the date. Needs to pick the most recent week day the market was open
    let devDate = '2022-02-28'
    today = yyyy + '-' + mm + '-' + (dd);
    return devDate
}