export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path:"/account",
    routes: [
      {
        name: 'settings',
        path: '/account/settings',
        component: './User/Settings',
      },
    ]
  },
  {
    path: '/',
    redirect: '/jokes',
  },
  {
    path: '/jokes',
    name: 'Jokes',
    icon: 'smile',
    // component: '@/pages/Jokes',
    hideInMenu: true,
    routes: [
      {
        name: 'Joke',
        path: '/jokes',
        component: '@/pages/Jokes',
      },
      {
        name: 'Joke',
        path: '/jokes/:jokeId',
        component: '@/pages/Jokes/views',
      },
      {
        name: 'Joke',
        path: '/jokes/joke',
        component: '@/pages/Jokes/views',
      },
    ]
  },
 
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
