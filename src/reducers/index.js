export default (state = 0, action) => {
    switch (action.type) {
      case 'SELECTCITY':
        console.log(action)
        return state + 1
      case 'DECREASE':
        return state - 1
      default:
        return state
    }
  }