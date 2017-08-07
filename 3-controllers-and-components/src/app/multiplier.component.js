import 'app/multiplier.styles'
import templateUrl from 'app/multiplier.template'

const controller =
  class FtMultiplierController {
    constructor ($log, appService) {
      'ngInject'
      this.service = appService
      $log.log('ft-multiplier is a go')
    }

    get multi () {
      return this.service.config.multipler
    }

    get cost () {
      return this.service.config.cost
    }

    click () {
      this.service.multiply()
    }
  }

export const ftMultiplier = {
  controller,
  templateUrl,
  controllerAs: 'multiplier'
}
