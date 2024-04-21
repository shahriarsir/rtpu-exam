export const useCurrentTime = async () => {
  let time = await axios.get(
    "https://worldtimeapi.org/api/timezone/Asia/Dhaka"
  );

  let date = await new Date(time.data.datetime).getTime();
  return date;
};
