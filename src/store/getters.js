const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username,
  companyName: state => state.user.userInfo.companyName,
  staffPhoto: state => state.user.userInfo.staffPhoto

}
export default getters
