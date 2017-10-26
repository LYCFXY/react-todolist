/*id*/
import AV from 'leancloud-storage'
  var APP_ID = 'uwz1CerVr1A46ATQDaGvJGCX-gzGzoHsz'
  var APP_KEY = 'jqPSPWVfYyXanlmRM4IX2Se3'
  AV.init({
    appId: APP_ID,
    appKey: APP_KEY
  })

export default AV

/*注册把用户名密码发送到服务器*/
export function signUp(email, username, password, successFn, errorFn){
     // 新建 AVUser 对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);
    // 设置邮箱
    user.setEmail(email);

    user.signUp().then(function (loginedUser) {
          let user = getUserFromAVUser()
          successFn.call(null, user)
    }, function (error) {
          errorFn.call(null, error)
    })

    return
}


function getUserFromAVUser(AVUser){
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

/*获取用户名*/
export function getCurrentUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}

/*退出，但是……*/
export function signOut(){
    AV.User.logOut()
    return undefined
}


/*登录验证*/
export function signIn(username, password, successFn, errorFn){

    AV.User.logIn(username, password).then(
      function (loginedUser) {
            let user = getUserFromAVUser(loginedUser)
            successFn.call(null, user)
        }, function (error) {
            errorFn.call(null, error)
    })
}


/*邮箱重置密码*/
export function sendPasswordResetEmail(email, successFn, errorFn){
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call()
    }, function (error) {
        errorFn.call(null, error)
   })
 }

// 所有跟 Todo 相关的 LeanCloud 操作都放到这里
export const TodoModel = {
    //获取数据
    getByUser(user, successFn, errorFn){
      // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
      let query = new AV.Query('Todo')

      query.equalTo('deleted', false);

      query.find().then((response) => {
        let array = response.map((t) => {
          return {id: t.id, ...t.attributes}
        })
        successFn.call(null, array)
      }, (error) => {
        errorFn && errorFn.call(null, error)
      })
    },
    //存储数据
    create({status, title, deleted}, successFn, errorFn){
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)

        // 根据文档 https://leancloud.cn/docs/acl-guide.html#单用户权限设置
        // 这样做就可以让这个 Todo 只被当前用户看到
        let acl = new AV.ACL()

        acl.setPublicReadAccess(false) // 注意这里是 false
        /*公共不可读写*/

        acl.setReadAccess(AV.User.current(), true)
        /*当前用户可读*/

        acl.setWriteAccess(AV.User.current(), true)
        /*当前用户可写*/

        todo.setACL(acl);

        todo.save().then(function (response){
            successFn.call(null, response.id)
        }, function(error){
            errorFn && errorFn.call(null, error)
        });
    },
    /*更新数据*/
    update({id, title, status, deleted}, successFn, errorFn){
        // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
        let todo = AV.Object.createWithoutData('Todo', id)
        title !== undefined && todo.set('title', title)
        status !== undefined && todo.set('status', status)
        deleted !== undefined && todo.set('deleted', deleted)


        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => errorFn && errorFn.call(null, error))
    },

    /*删除数据*/
    destroy(todoId, successFn, errorFn){
      // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象
      let todo = AV.Object.createWithoutData('Todo', todoId)

      todo.destroy().then(function (response) {
        successFn && successFn.call(null)
      }, function (error) {
        errorFn && errorFn.call(null, error)
      });
      TodoModel.update({id: todoId, deleted: true}, successFn, errorFn);
    }
 }