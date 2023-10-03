import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { appReducer } from './store/app.reducer';
import { AuhtEffects } from './auth/state/auth.effects';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { AuthGuard } from './services/auth.guard';
import { CustomSerializer } from './store/router/custom-serializer';
import { LoggingInterceptor } from './services/Interceptors/logging.interceptor';
import { RefreshTokenInterceptor } from './services/Interceptors/refreshToken.interceptor';
import { AccessTokenInterceptor } from './services/Interceptors/accessToken.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuhtEffects]),
    StoreModule.forRoot(appReducer),
    // ngrx/router
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RefreshTokenInterceptor,
    //   multi: true,
    // },
    AuthGuard,
    AuthService,
    PostsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
