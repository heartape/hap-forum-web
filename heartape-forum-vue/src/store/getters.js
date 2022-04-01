const getters = {
  device: state => state.app.device,
  uid: state => state.user.uid,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
