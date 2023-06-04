const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'User Management',
      path: '/user-management',
      icon: 'fluent-mdl2:workforce-management'
    },
    {
      path: '/question-management',
      title: 'Question Management',
      icon: 'material-symbols:list-alt-add-outline-rounded'
    },
    {
      title: 'Panel Management',
      path: '/panel-management',
      icon: 'material-symbols:admin-panel-settings-outline-rounded'
    },
    {
      title: 'Statistics',
      path: '/statistics',
      icon: 'wpf:statistics'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      icon: 'mdi:account-edit-outline',
      title: 'Competition Interface'
    }
  ]
}

export default navigation
