import { bootstrapApplication } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { applyMotionClass } from './app/shared/utils/motion.utils';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

applyMotionClass();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
