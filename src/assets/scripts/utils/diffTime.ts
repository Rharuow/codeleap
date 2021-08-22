export function diffTime(date1: Date, date2:Date) {
    const diff = (date1.getTime() - date2.getTime()) * -1

    const mo = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
    const dd = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hh = Math.floor(diff / 1000 / 60 / 60);
    const mm = Math.floor(diff / 1000 / 60);
    const ss = Math.floor(diff / 1000);
    if(ss < 60 ) return `${ss} second ago`
    if(mm < 60 ) return `${mm} minutes ago`
    if(hh < 24 ) return `${hh} hours ago`
    if(dd < 31 ) return `${dd} days ago`
    return `${mo} months ago`
}