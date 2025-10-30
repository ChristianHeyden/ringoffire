import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-65b7d","appId":"1:789949012780:web:c14b57d0398389f471aa89","storageBucket":"ring-of-fire-65b7d.firebasestorage.app","apiKey":"AIzaSyDc_mK8uoNUdm47Ngy9QAXPylfpMmBP8xY","authDomain":"ring-of-fire-65b7d.firebaseapp.com","messagingSenderId":"789949012780"})), 
  provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions())]
};
