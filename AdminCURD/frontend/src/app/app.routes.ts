import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authgardGuard } from './commonservice/authgard/authgard.guard';

// export const routes: Routes = [

//     {
//         path:'',
//         redirectTo:'login',
//         pathMatch:'full'
//     },
//     {
//         path:'login',
//         // component:LoginComponent
//         loadComponent: ()=> import('./login/login.component').then(c=>c.LoginComponent)
//     }, 
//     {
//         path: '',
//         // component: LayoutComponent,
//         loadComponent: ()=> import('./login/login.component').then(c=>c.LoginComponent),
//         children: [
//             {
//                 path: 'users',
//                 // component: UsersComponent,
//                 loadChildren: ()=> import('./usermanager/components/users/users.component').then(c=>c.UsersComponent),
//                 canActivate: [authgardGuard]
//             }
//         ]
//     }


// ];

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
    },
    {
        path: '',
        loadComponent: () => import('./layout/layout.component').then(c => c.LayoutComponent),
        children: [
            {
                path: 'users',
                loadComponent: () => import('./usermanager/usermodule/users/users.component').then(c => c.UsersComponent),
                canActivate: [authgardGuard]
            },
            {
                path: 'company',
                loadComponent: () => import('./usermanager/companymodule/company/company.component').then(c=>c.CompanyComponent),
                canActivate: [authgardGuard]
            },
            {
                path: 'group',
                loadComponent: () => import('./usermanager/groupmodule/group/group.component').then(c=>c.GroupComponent),
                canActivate: [authgardGuard]
            },
            {
                path: 'home',
                loadComponent: () => import('./home/home.component').then(c=>c.HomeComponent),
                canActivate: [authgardGuard]
            }
        ]
    }
];
