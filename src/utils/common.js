const obj = {}
obj.milSecond = 1;
obj.second = obj.milSecond * 1000;
obj.minute = obj.second * 60;
obj.hour = obj.minute * 60;
obj.day = obj.hour * 24;

function timeStamp2LeftTime(t) {
  let tmpTime = t;
  let format = ``;
  const day = Math.floor(tmpTime / obj.day);
  if (day > 0) {
    format += `${day}天`;
    tmpTime -= obj.day * day;
  } else if (format) {
    format += `0天`;
  }

  const hour = Math.floor(tmpTime / obj.hour);
  if (hour > 0) {
    format += `${hour}小时`;
    tmpTime -= obj.hour * hour;
  } else if (format) {
    format += `0小时`;
  }

  const minute = Math.floor(tmpTime / obj.minute);
  if (minute > 0) {
    format += `${minute}分`;
    tmpTime -= obj.minute * minute;
  } else if (format) {
    format += `0分`;
  }

  const second = Math.floor(tmpTime / obj.second);
  if (second > 0) {
    format += `${second}秒`;
    tmpTime -= obj.second * second;
  } else if (format) {
    format += `0秒`;
  }
  tmpTime;
  return format;
}

export default {
  timeStamp2LeftTime
}