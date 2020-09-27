import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'auth', pathMatch:'full'},

  // lazy loaded modules
  {path: 'auth' , loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule).catch(err=>{console.log(err)})},
  {path:'layout', loadChildren: ()=> import('./layout/layout.module').then(m=> m.LayoutModule).catch(err=>{console.log(err)})
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
