import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { provideHttpClient } from '@angular/common/http';
import { GeneralPipePipe } from './pipes/general-pipe.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [AppComponent, DataTableComponent, GeneralPipePipe],
	imports: [BrowserModule, AppRoutingModule, FormsModule],
	providers: [provideHttpClient()],
	bootstrap: [AppComponent]
})
export class AppModule {}
