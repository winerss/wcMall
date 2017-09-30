exports.install = function (Vue, options) {
  Vue.prototype.distinguish = function () {
     // 身份判定
    this.axios.post('http://www.ethedot.com/chatshop/Index/getsession')
    .then(function (response) {
      if (response.data === null) {
      //  console.log(window.location.href)
      //  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2c0543b872cb100e&redirect_uri=http%3A%2F%2Fwww.ethedot.com%2Fchatshop%2FApi%2FLogin%2Fweixinlogin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect'
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
