import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'layout', pathMatch:'full'},

  // lazy loaded modules
  
  {path:'layout', loadChildren: ()=> import('./layout/layout.module').then(m=> m.LayoutModule).catch(err=>{console.log(err)})
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
