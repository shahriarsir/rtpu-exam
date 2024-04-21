import moment from "moment";
export const useDateFormat = () => {
  const formattedDate = (date) => {
    return moment(date).format("DD MMMM YYYY, h:mm a");
  };
  const formattedDateC = (date) => {
    return moment(date).format("MMMM Do YYYY");
  };
  return { formattedDate, formattedDateC };
};
