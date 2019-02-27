
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
        padTimeNumbers(h, 2) + ':' +
        padTimeNumbers(m, 2) + ':' +
        padTimeNumbers(s, 2)
    );
};


export const autoSelect = (event) => {

    // auto-select mobile Safari safe
    event.target.setSelectionRange(0, event.target.value.length);
};
