function setCookie(key, value) {
  const cookie = document.cookie;
  const objs = cookie.split(";");
  const obj = {}
  objs.forEach(item => {
    const { key, value } = item.split("=");
    if (key == null || value == null) return;
    obj.key = key;
    obj.value = value;
  })
  obj[key] = value;

  // 还原
  let strs = [];
  for (let i in obj) {
    strs.push(`${i}=${obj[i]}`);
  }
  document.cookie = strs.join(";");
}

function getCookie(key) {
  const cookie = document.cookie;
  const objs = cookie.split(";");
  for (let i = 0; i < objs.length; i++) {
    const [k, v] = objs[i].split("=");
    if (key === k.trim()) {
      return v.trim();
    }
  }
  return "";
}

export default {
  setCookie,
  getCookie
}