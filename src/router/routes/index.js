import authentication from './authentication'
import landing from './landing'
import teacher from './teacher'
import gigs from './gigs'
import errors from './errors'
import recommendations from './recommendations'
import account from './account'

export default [
  ...authentication,
  ...account,
  ...landing,
  ...teacher,
  ...gigs,
  ...errors,
  ...recommendations,
]
