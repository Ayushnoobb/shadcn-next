import moment from "moment"
import NepaliDate from "nepali-date-converter";

export const getTomorrowEnglishDate = () => {
    const today = moment();
    var new_date = moment(today, "YYYY-MM-DD").add(
        1,
        "days"
    );
    var day = new_date.format("DD");
    var month = new_date.format("MM");
    var year = new_date.format("YYYY");

    return year + "-" + month + "-" + day
};
export const getYesterdayEnglishDate = () => {
    const today = moment();
    var new_date = moment(today, "YYYY-MM-DD").subtract(
        1,
        "days"
    );
    var day = new_date.format("DD");
    var month = new_date.format("MM");
    var year = new_date.format("YYYY");

    return year + "-" + month + "-" + day;
};

export const AdToBs = (date: string) => {
    const momentDate = moment(date, "YYYY-MM-DD")
    const jsDate = momentDate.toDate()
    return new NepaliDate(jsDate).format("YYYY-MM-DD")
}