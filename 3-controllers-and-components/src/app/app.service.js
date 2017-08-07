export class AppService {

  constructor ($interval,$cookies) {
    'ngInject'
    this.$interval = $interval
    this.$cookies = $cookies
    this.init()
  }

  config = {
    total: 0,
    scale: 1,
    multipler: 1.2,
    cost: 0,
    auto_cost: 0,
    auto_enabled: true,
    cost_enabled: true,
    clickers: 0,
    reset: true,
    stop_clickers: []
  }
  saveCookies() {
    this.$cookies.putObject('config',this.config)
  }


  loadCookies() {
    console.log('Loading cookies')
    let saved = this.$cookies.getObject('config')
    if(saved==null) {
      this.reset()
    }
    else {
      this.config = saved
      this.config.stop_clickers = []
      for(let i=0; i<this.config.clickers; ++i) {
        let promise = this.$interval(() => {
          this.increment()
        }, 1000)
        this.config.stop_clickers.push(promise)
      }
    }
  }

  checkStats() {
    if (this.config.cost < this.config.total) {
      this.config.cost_enabled = true
      $('#multiplier_button').css({'opacity': '0.87'})
    } else {
      this.config.cost_enabled = false
      $('#multiplier_button').css({'opacity': '0.2'})
    }
    if (this.config.auto_cost < this.config.total) {
      this.config.auto_enabled = true
      $('#autoclicker_button').css({'opacity': '0.87'})
    } else {
      this.config.auto_enabled = false
      $('#autoclicker_button').css({'opacity': '0.2'})
    }
    if (this.config.reset === false) {
      $('#reset_button').css({'opacity': '0.87'})
    } else {
      $('#reset_button').css({'opacity': '0.2'})
    }
  }
  increment() {
    this.config.total += this.config.scale
    this.config.reset = false
    this.checkStats()
  }
  multiply() {
    if (this.config.cost_enabled) {
      this.config.total -= this.config.cost
      this.config.cost += 10
      this.config.scale *= this.config.multipler
      this.config.reset = false
      this.checkStats()
    }
  }
  autoclick() {
    console.log('Initialize new AutoClicker')
    if (this.config.auto_enabled) {
      this.config.total -= this.config.auto_cost
      this.config.auto_cost += 100
      this.config.clickers += 1
      this.config.reset = false
      this.checkStats()
      let promise = this.$interval(() => {
        this.increment()
      }, 1000)
      this.config.stop_clickers.push(promise)
    }
  }
  reset() {
    if (this.config.reset === false) {
      this.config.total = 0
      this.config.scale = 1
      this.config.multipler = 1.2
      this.config.cost = 0
      this.config.auto_cost = 0
      this.config.auto_enabled = true
      this.config.cost_enabled = true
      this.config.clickers = 0
      this.config.reset = true
      while(this.config.stop_clickers.length>0) {
        console.log("stoping clicker");
        var promise = this.config.stop_clickers.pop()
        this.$interval.cancel(promise)
      }
      this.saveCookies()
    }
    this.checkStats()
  }
  init() {
    console.log('page Loading')
    this.loadCookies()
    this.$interval(() => {this.saveCookies()}, 1000 * 30)
  }
}
