(() => {
  $('.accordion__tab.active').find('.accordion__content').slideToggle('');
  $('.accordion__title').click((ev) => {
    if (!$(ev.currentTarget).closest('.accordion__tab').hasClass('active')) {
      $(ev.currentTarget).closest('.accordion__tab').find('.accordion__content').slideToggle();
      $(ev.currentTarget).closest('.accordion__tab').addClass('active').siblings('.accordion__tab.active').removeClass('active')
      .find('.accordion__content').slideToggle();
    }
    else $(ev.currentTarget).closest('.accordion__tab').removeClass('active').find('.accordion__content').slideToggle();
  })
})()
