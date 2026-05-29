import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TotemComponent } from './totem.component';

const routes: Routes = [{ path: '', component: TotemComponent }];

@NgModule({
  declarations: [TotemComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TotemModule {}
