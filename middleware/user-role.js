export default function ({
  $auth,
  redirect
}) {
  if (!$auth.loggedIn) {
    return redirect('/auth/login')
  }
  if (!$auth.user.roles.includes('user')) {
    return redirect('/auth/login')
  }
}
