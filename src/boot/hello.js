import hello from 'hellojs'

export default ({ Vue }) => {
  hello.init({
    facebook: '151707949234327',
    google: 'afsg25yh2h'
  })

  Vue.prototype.$hello = hello
}
