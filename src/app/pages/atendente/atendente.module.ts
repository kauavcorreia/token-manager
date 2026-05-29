import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AtendenteComponent } from './atendente.component';

const routes: Routes = [{ path: '', component: AtendenteComponent }];

@NgModule({
  declarations: [AtendenteComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AtendenteModule {}
