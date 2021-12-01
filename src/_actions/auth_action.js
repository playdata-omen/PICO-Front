// action type
import { LOGIN, LOGOUT } from "./type"

// action creator
// simply creates an action
// function returning action
export const auth_actions = {
  login: () => ({ type: LOGIN }),
  logout: () => ({ type: LOGOUT })
}
