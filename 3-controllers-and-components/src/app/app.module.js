import { AppService } from 'app/app.service'

import { ftApp } from 'app/app.component'
import { ftHeader } from 'app/header.component'
import { ftBody } from 'app/body.component'
import { ftMultiplier } from 'app/multiplier.component'
import { ftAutoclicker } from 'app/autoclicker.component'
import { ftReset } from 'app/reset.component'

import { config } from 'app/app.config'

export default ng
  .module('ft.buttons', [require('angular-cookies')])
  .service('appService', AppService)
  .component('ftApp', ftApp)
  .component('ftHeader', ftHeader)
  .component('ftBody', ftBody)
  .component('ftMultiplier', ftMultiplier)
  .component('ftAutoclicker', ftAutoclicker)
  .component('ftReset', ftReset)
  .config(config)
  .name
