import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioComponent } from './relatorio.component';

const routes: Routes = [{ path: '', component: RelatorioComponent }];

@NgModule({
  declarations: [RelatorioComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class RelatorioModule {}
