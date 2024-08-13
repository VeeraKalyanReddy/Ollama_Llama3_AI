import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  .catch((err: any) => console.error(err));