import { Routes } from '@angular/router';
import { UsuarioComponent, UsuarioCreateComponent, UsuarioUpdateComponent } from './components';

export const UsuarioRoutes: Routes = [
    {
        path: 'usuarios',
        children: [
            {
                path: '',
                component: UsuarioComponent
            },
            {
                path: 'create',
                component: UsuarioCreateComponent
            },
            {
                path: 'edit/:id',
                component: UsuarioUpdateComponent
            }
        ]
    }
];
