$(document).ready(function() {
  this.config = {
    total: 0,
    scale: 1,
    multipler: 1.2,
    cost: 0,
    auto_cost: 0,
    auto_enabled: true,
    cost_enabled: true,
    clickers: 0,
    reset: true
  }
  let Cookies2 = Cookies.noConflict()
  let checkStats = () => {
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
    $('#total')
      .html('Total: ' + this.config.total)
    $('#increment_button')
      .html('+' + this.config.scale)
    $('#cost')
      .html('Cost: ' + this.config.cost)
    $('#auto_cost')
      .html('Cost: ' + this.config.auto_cost)
    $('#auto_clicks')
      .html('Clickers: ' + this.config.clickers)
  }
  let save = () => {
    Cookies2.set('config', this.config)
  }
  let loadCookies = () => {
    this.config = Cookies2.getJSON('config')
    console.log(this.config)
    checkStats()
  }
  loadCookies()
  setInterval(save, 1000 * 60)
  $(window).on('unload', save)
  // $(window).on('load', loadCookies)
  $('#increment_button').click(() => {
    this.config.total += this.config.scale
    this.config.reset = false
    checkStats()
  })

  $('#multiplier_button').click(() => {
    if (this.config.cost_enabled) {
      this.config.total -= this.config.cost
      this.config.cost += 10
      this.config.scale *= this.config.multipler
      this.config.reset = false
      checkStats()
    }
  })
  $('#autoclicker_button').click(() => {
    if (this.config.auto_enabled) {
      this.config.total -= this.config.auto_cost
      this.config.auto_cost += 100
      this.config.clickers += 1
      this.config.reset = false
      checkStats()
      let increment = () => {
        $('#increment_button').click()
      }
      setInterval(increment, 1000)
    }
  })
  $('#reset_button').click(() => {
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
    }
    save()
    checkStats()
  })
})
