import 'app/autoclicker.styles'
import templateUrl from 'app/autoclicker.template'

const controller =
  class FtAutoclickerController {
    constructor ($log, appService) {
      'ngInject'
      this.service = appService
      $log.log('ft-autoclicker is a go')
    }

    get clickers () {
      return this.service.config.clickers
    }

    get autocost () {
      return this.service.config.auto_cost
    }

    click () {
      this.service.autoclick()
    }
  }

export const ftAutoclicker = {
  controller,
  templateUrl,
  controllerAs: 'autoclicker'
}
