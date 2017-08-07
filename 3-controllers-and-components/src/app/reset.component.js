import 'app/reset.styles'
import templateUrl from 'app/reset.template'

const controller =
  class FtResetController {
    constructor ($log, appService) {
      'ngInject'
      this.service = appService
      $log.log('ft-reset is a go')
    }

    click () {
      this.service.reset()
    }
  }

export const ftReset = {
  controller,
  templateUrl,
  controllerAs: 'reset'
}
