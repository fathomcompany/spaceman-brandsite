import { getAlt } from '~/utils/images'

export default ({ app }, inject) => {
  inject('imgAlt', getAlt)
}
