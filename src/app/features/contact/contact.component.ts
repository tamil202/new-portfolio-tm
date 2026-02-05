import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  inject,
  DestroyRef,
  signal,
  computed
} from '@angular/core';
import { PortfolioStore } from '@core/data/portfolio.store';
import { scrollReveal } from '@shared/animations/gsap.utils';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="contact section" id="contact">
      <div class="container">
        <h2 class="section-title">Get in Touch</h2>
        <p class="section-subtitle">Let’s build something fast, reliable, and user-friendly.</p>
        <div #contactContent class="contact-content">
          <div class="contact-info">
            <p class="contact-intro">
              Have a project in mind or want to discuss an opportunity?
              I'd love to hear from you.
            </p>
            <div class="contact-meta">
              <div class="meta-row">
                <span class="meta-label">Location</span>
                <span class="meta-value">Bangalore, Karnataka</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Timezone</span>
                <span class="meta-value">IST (UTC+05:30)</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Availability</span>
                <span class="meta-value">Open to full-time and contract roles</span>
              </div>
            </div>
            <div class="contact-links">
              @for (link of socialLinks(); track link.platform) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener"
                  class="social-link">
                  {{ link.platform }}
                </a>
              }
              @for (link of quickLinks; track link.label) {
                <a
                  [href]="link.url"
                  target="_blank"
                  rel="noopener"
                  class="social-link">
                  {{ link.label }}
                </a>
              }
            </div>
          </div>

          <form class="contact-form" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input
                id="name"
                type="text"
                class="form-input"
                [class.error]="nameTouched() && !nameValid()"
                [value]="name()"
                (input)="name.set($any($event.target).value)"
                (blur)="nameTouched.set(true)"
                name="name"
                placeholder="Your name"
                required>
              @if (nameTouched() && !nameValid()) {
                <span class="form-error">Please enter your name</span>
              }
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                type="email"
                class="form-input"
                [class.error]="emailTouched() && !emailValid()"
                [value]="email()"
                (input)="email.set($any($event.target).value)"
                (blur)="emailTouched.set(true)"
                name="email"
                placeholder="you@example.com"
                required>
              @if (emailTouched() && !emailValid()) {
                <span class="form-error">Please enter a valid email</span>
              }
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                class="form-input form-textarea"
                [class.error]="messageTouched() && !messageValid()"
                [value]="message()"
                (input)="message.set($any($event.target).value)"
                (blur)="messageTouched.set(true)"
                name="message"
                placeholder="Your message..."
                rows="5"
                required></textarea>
              @if (messageTouched() && !messageValid()) {
                <span class="form-error">Please enter a message (min 10 characters)</span>
              }
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="!formValid() || isSubmitting()">
              @if (isSubmitting()) {
                Sending...
              } @else {
                Send Message
              }
            </button>

            @if (submitSuccess()) {
              <p class="form-success">Opening your email client...</p>
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      background: var(--color-bg-alt);
    }

    .section-subtitle {
      color: var(--color-text-muted);
      text-align: center;
      margin-top: -1.5rem;
      margin-bottom: 2.5rem;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    @media (min-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr 1.5fr;
        align-items: start;
      }
    }

    .contact-intro {
      color: var(--color-text-muted);
      line-height: 1.8;
      margin-bottom: 1.5rem;
    }

    .contact-meta {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
      padding: 0.75rem 0.9rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: rgba(59, 130, 246, 0.03);
      font-size: 0.85rem;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      font-size: 0.85rem;
    }

    .meta-label {
      color: var(--color-text-muted);
    }

    .meta-value {
      color: var(--color-text);
      font-weight: 500;
      text-align: right;
      max-width: 60%;
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .social-link {
      color: var(--color-text);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .social-link:hover {
      color: var(--color-accent);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text);
    }

    .form-input {
      padding: 0.875rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      font-size: 1rem;
      background: var(--color-bg);
      color: var(--color-text);
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      font-family: inherit;
    }

    .form-input::placeholder {
      color: var(--color-text-muted);
      opacity: 0.6;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-input.error {
      border-color: #ef4444;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .form-error {
      font-size: 0.8125rem;
      color: #ef4444;
    }

    .form-success {
      font-size: 0.875rem;
      color: #10b981;
      text-align: center;
    }

    .btn {
      padding: 0.875rem 2rem;
      border-radius: 8px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      font-size: 1rem;
      font-family: inherit;
    }

    .btn-primary {
      background: var(--color-accent);
      color: white;
      box-shadow: 0 0 18px rgba(59, 130, 246, 0.35);
    }

    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ContactComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly contactContent = viewChild.required<ElementRef>('contactContent');
  readonly socialLinks = this.store.socialLinks;
  readonly quickLinks = [
    { label: 'Resume (PDF)', url: '/assets/Tamilvanan_Resume.pdf' },
    { label: 'Open VSX', url: 'https://open-vsx.org/' }
  ];

  // Form data as signals for reactivity
  readonly name = signal('');
  readonly email = signal('');
  readonly message = signal('');

  // Touch state signals
  readonly nameTouched = signal(false);
  readonly emailTouched = signal(false);
  readonly messageTouched = signal(false);

  // Validation computed signals
  readonly nameValid = computed(() => this.name().trim().length > 0);
  readonly emailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email());
  });
  readonly messageValid = computed(() => this.message().trim().length >= 10);
  readonly formValid = computed(() =>
    this.nameValid() && this.emailValid() && this.messageValid()
  );

  readonly isSubmitting = signal(false);
  readonly submitSuccess = signal(false);

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    const trigger = scrollReveal(
      this.contactContent(),
      (target) => gsap.from(target, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      })
    );

    this.destroyRef.onDestroy(() => {
      trigger?.kill();
    });
  }

  onSubmit(): void {
    // Touch all fields
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.messageTouched.set(true);

    if (!this.formValid()) {
      return;
    }

    this.isSubmitting.set(true);

    // Build mailto URL with form data
    const toEmail = 'tdev@tamix.in';
    const userName = this.name();
    const userEmail = this.email();
    const userMessage = this.message();

    const subject = encodeURIComponent(`Portfolio Contact from ${userName}`);
    const body = encodeURIComponent(
      `From: ${userName}\n` +
      `Email: ${userEmail}\n\n` +
      `Message:\n${userMessage}`
    );

    const mailtoUrl = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    // Open email client immediately
    window.open(mailtoUrl, '_self');

    this.isSubmitting.set(false);
    this.submitSuccess.set(true);

    // Reset form
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.nameTouched.set(false);
    this.emailTouched.set(false);
    this.messageTouched.set(false);

    // Hide success message after 3 seconds
    setTimeout(() => {
      this.submitSuccess.set(false);
    }, 3000);
  }
}
