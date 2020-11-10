import hello from 'hellojs'

export default ({ Vue }) => {
  hello.init({
    facebook: '151707949234327',
    google: '689677381423-1cb7ejukrpjm3cckk0rmc8pfmftdkp4a.apps.googleusercontent.com'
  })

  Vue.prototype.$hello = hello
}
