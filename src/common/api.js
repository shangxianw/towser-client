const api = {
  baseUrl: "//localhost:9090/"
}

api.getActivityList = api.baseUrl + "getActivityList";
api.getActivetyDetail = api.baseUrl + "getActivetyDetail";
api.startGame = api.baseUrl + "startGame";
api.getUserInfo = api.baseUrl + "getUserInfo";

// 扫雷相关
api.openBoomCell = api.baseUrl + "openBoomCell";

export default api