import win from 'window-event-mediator'

export default ({ app }, inject) => {
  inject('win', win)
}
