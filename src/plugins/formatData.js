const formatDate = (d) => {
  const date = new Date(d);

  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatNumber = (n) => {
  return Intl.NumberFormat("bn-BD").format(n);
};

const formatDateTime = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString("bn-BD", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const calculateDuration = (s, e) => {
  const start = new Date(s);
  const end = new Date(e);

  const diff = end.getTime() - start.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);

  if (days > 0) {
    return `${days} days`;
  } else if (hours > 0) {
    return `${hours} hours`;
  } else if (minutes > 0) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
};

// 08:36
function formatDuration(duration) {
  const time = new Date(`1970-01-01T${duration}Z`);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "UTC",
    timeZoneName: "short",
  };
  const formattedTime = new Intl.DateTimeFormat("bn-BD", options).format(time);
  return formattedTime.replace("UTC", "");
}
const millisecToTime = (millis,duration) => {

  if(millis>duration){
    millis = duration
  }


  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export {
  formatDate,
  formatNumber,
  formatDateTime,
  calculateDuration,
  formatDuration,
  millisecToTime,
};
