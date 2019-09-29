import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule',  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'posts', loadChildren: './tab1/posts/posts.module#PostsPageModule' },
  { path: 'solicitudes', loadChildren: './solicitudes/solicitudes.module#SolicitudesPageModule' },
  { path: 'my-posts', loadChildren: './my-posts/my-posts.module#MyPostsPageModule' },
  { path: 'friends', loadChildren: './tab2/friends/friends.module#FriendsPageModule' },
  { path: 'chat', loadChildren: './tab3/chat/chat.module#ChatPageModule' },
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
