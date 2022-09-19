export default {
  setCookie(key, value) {
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
}