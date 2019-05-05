import UserRoute from './routes/user.route'
import AdminRoute from './routes/admin.route'
import PostRoute from './routes/post.route'

export default (app)=>{
  UserRoute(app)
  AdminRoute(app)
  PostRoute(app)
}