export default function ({
  $auth,
  redirect
}) {
  if (!$auth.loggedIn) {
    return redirect('/auth/login')
  }
  if ($auth.user.role !== 'user') {
    return redirect('/auth/login')
  }
}
