
class MySQLDateTimeFormatter {
    public static format(date:Date):string {
        function pad(n) { return (n < 10) ? '0' + n : n; }

        let year    = date.getUTCFullYear();
        let month   = pad(date.getUTCMonth() + 1); // #getUTCMonth is zero indexed
        let day     = pad(date.getUTCDate());
        let hours   = pad(date.getUTCHours());
        let minutes = pad(date.getUTCMinutes());
        let seconds = pad(date.getUTCSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

export = MySQLDateTimeFormatter;