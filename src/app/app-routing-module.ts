import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'totem', pathMatch: 'full' },
  { path: 'totem',     loadChildren: () => import('./pages/totem/totem.module').then(m => m.TotemModule) },
  { path: 'painel',    loadChildren: () => import('./pages/painel/painel.module').then(m => m.PainelModule) },
  { path: 'atendente', loadChildren: () => import('./pages/atendente/atendente.module').then(m => m.AtendenteModule) },
  { path: 'relatorio', loadChildren: () => import('./pages/relatorio/relatorio.module').then(m => m.RelatorioModule) },
  { path: '**', redirectTo: 'totem' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
