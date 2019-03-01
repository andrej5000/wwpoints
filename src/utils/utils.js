
export const padTimeNumbers = (num, size) => {

    let s = '0000' + num;

    return s.substr(s.length - size);
};


export const formatTime = (time) => {

    let h = Math.floor(time / (60 * 60 * 1000));
    time = time % (60 * 60 * 1000);

    let m = Math.floor(time / (60 * 1000));
    time = time % (60 * 1000);

    let s = Math.floor(time / 1000);

    // Need ms? Uncomment next line!
    //let ms = time % 1000;
    //return ... + ':' + this.padTimeNumbers(ms, 3);

    return (
        padTimeNumbers(h, 2) + 'h ' +
        padTimeNumbers(m, 2) + 'm ' +
        padTimeNumbers(s, 2) + 's '
    );
};


export const autoSelect = (event) => {

    // auto-select mobile Safari safe
    event.target.setSelectionRange(0, event.target.value.length);
};


export const getFormattedDate = (rawDate) => {

    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${day}.${month}.${year}`;
};
