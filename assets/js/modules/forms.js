/**
 * GLOBAL GROWTH — FORMS
 * ---------------------------------------------------------------------------
 * Client-side validation and the submit stub.
 *
 * THERE IS NO BACKEND YET. submitForm() logs its payload and shows the success
 * state. Everything around it — validation, error messaging, focus management,
 * the disabled/pending button state — is real, so replacing the stub with a
 * fetch() is the only change the backend phase needs to make here.
 * See BACKEND_PROMPT.md.
 *
 * Markup contract:
 *   <form data-form="contact" novalidate>
 *     <div class="gg-field">
 *       <label class="gg-label" for="x">…</label>
 *       <input class="gg-input" id="x" name="x" required data-rule="email">
 *       <span class="gg-error" id="x-error"></span>
 *     </div>
 *     <button type="submit" class="gg-btn gg-btn--primary">Send</button>
 *   </form>
 *
 * Validation is driven by `required` and an optional `data-rule`. Errors are
 * announced through aria-invalid + aria-describedby, and the first invalid
 * field receives focus — a form that only colours a border red is unusable
 * for anyone not looking at it.
 */

import { qs, qsa, escapeHtml } from './utils.js';

/* ==========================================================================
   RULES
   Each returns an error message, or null when the value is acceptable.
   ========================================================================== */
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME = ['pdf', 'doc', 'docx'];

const RULES = {
  email: value =>
    // Deliberately permissive: the only authority on whether an address works
    // is whether mail reaches it. This catches typos, not exotic addresses.
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
      ? null
      : 'Enter a valid email address so we can reply to you.',

  phone: value => {
    const digits = value.replace(/[^\d]/g, '');
    if (digits.length === 0) return null; // optional unless also required
    return digits.length >= 10 && digits.length <= 13
      ? null
      : 'Enter a valid phone number, including the area or country code.';
  },

  minlength: (value, field) => {
    const min = Number(field.dataset.min || 20);
    return value.trim().length >= min
      ? null
      : `Please give us a little more detail — at least ${min} characters.`;
  },

  file: field => {
    const file = field.files?.[0];
    if (!file) return field.required ? 'Attach your CV so we can review it.' : null;

    const extension = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_RESUME.includes(extension)) {
      return `That file type is not accepted. Please attach a ${ALLOWED_RESUME.join(', ')} file.`;
    }
    if (file.size > MAX_FILE_BYTES) {
      return `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB. Please keep it under 5 MB.`;
    }
    return null;
  },

  consent: field =>
    field.checked ? null : 'We need your consent before we can act on this.'
};

/* ==========================================================================
   FIELD STATE
   ========================================================================== */
const fieldOf = control => control.closest('.gg-field');

const setError = (control, message) => {
  const field = fieldOf(control);
  if (!field) return;
  const slot = qs('.gg-error', field);

  field.classList.toggle('is-error', Boolean(message));
  field.classList.remove('is-success');

  if (message) {
    control.setAttribute('aria-invalid', 'true');
    if (slot) {
      slot.textContent = message;
      if (!slot.id) slot.id = `${control.name || control.id}-error`;
      control.setAttribute('aria-describedby', slot.id);
    }
  } else {
    control.removeAttribute('aria-invalid');
    // Clear the message and the association, not just the visual state. The
    // .gg-error slot is display:none once .is-error is gone, but a stale
    // string left behind is still reachable through aria-describedby — a
    // screen reader would announce an error the user has already fixed.
    control.removeAttribute('aria-describedby');
    if (slot) slot.textContent = '';
  }
};

/** Clearing an error is the same operation as setting one, with no message.
 *  Delegating rather than duplicating means the clean-up above (dropping the
 *  stale text and the aria-describedby link) can only ever be done in one
 *  place — the earlier duplicate silently skipped it. */
const setValid = control => setError(control, null);

/** Runs every applicable rule against one control. */
const validateControl = control => {
  const isCheckbox = control.type === 'checkbox';
  const isFile = control.type === 'file';
  const value = isCheckbox || isFile ? '' : control.value;

  if (isCheckbox) {
    const message = control.required ? RULES.consent(control) : null;
    message ? setError(control, message) : setValid(control);
    return !message;
  }

  if (isFile) {
    const message = RULES.file(control);
    message ? setError(control, message) : setValid(control);
    return !message;
  }

  if (control.required && value.trim() === '') {
    const label = qs(`label[for="${control.id}"]`, control.form)?.textContent.replace(/\*/g, '').trim();
    setError(control, `${label || 'This field'} is required.`);
    return false;
  }

  // An empty optional field is valid; only run format rules on real input.
  if (value.trim() === '') { setValid(control); return true; }

  const rule = control.dataset.rule;
  const message = rule && RULES[rule] ? RULES[rule](value, control) : null;
  message ? setError(control, message) : setValid(control);
  return !message;
};

/* ==========================================================================
   SUBMIT STUB
   ========================================================================== */

/**
 * Stands in for the API call. Replace the body with a real fetch() when the
 * backend lands; the resolved/rejected shape is what the caller already
 * expects, so nothing else in this module has to change.
 *
 * @param {string} formName  the data-form value, used as the routing key
 * @param {Object} payload   plain object of field values
 * @returns {Promise<{ok: boolean, reference: string}>}
 */
export const submitForm = (formName, payload) => {
  console.groupCollapsed(`[Global Growth] submitForm("${formName}") — STUB, no backend`);
  console.table(payload);
  console.info('This will become: await fetch("/api/' + formName + '", { method: "POST", body: … })');
  console.groupEnd();

  // A short delay so the pending state is visible and gets exercised.
  return new Promise(resolve => {
    setTimeout(() => resolve({
      ok: true,
      reference: `GG-${Date.now().toString(36).toUpperCase()}`
    }), 700);
  });
};

/* ==========================================================================
   FORM WIRING
   ========================================================================== */
const collect = form => {
  const payload = {};
  new FormData(form).forEach((value, key) => {
    if (value instanceof File) {
      payload[key] = value.name ? { name: value.name, size: value.size, type: value.type } : null;
    } else if (payload[key] !== undefined) {
      payload[key] = [].concat(payload[key], value);
    } else {
      payload[key] = value;
    }
  });
  return payload;
};

const wireForm = form => {
  const name = form.dataset.form || 'form';
  const controls = qsa('input, textarea, select', form).filter(c => c.type !== 'hidden');
  const submitButton = qs('[type="submit"]', form);
  const status = qs('[data-form-status]', form);
  const originalLabel = submitButton?.innerHTML;

  // Validate on blur, but only re-validate on input once a field has already
  // errored — correcting a mistake should clear the error immediately, while
  // typing a fresh field should not be nagged at mid-word.
  controls.forEach(control => {
    control.addEventListener('blur', () => validateControl(control));
    control.addEventListener('input', () => {
      if (fieldOf(control)?.classList.contains('is-error')) validateControl(control);
    });
    if (control.type === 'checkbox' || control.type === 'file') {
      control.addEventListener('change', () => validateControl(control));
    }
  });

  // File input reports the chosen file rather than staying silent.
  qsa('.gg-file', form).forEach(wrap => {
    const input = qs('input[type="file"]', wrap);
    const nameSlot = qs('.gg-file__name', wrap);
    input?.addEventListener('change', () => {
      const file = input.files?.[0];
      wrap.classList.toggle('has-file', Boolean(file));
      if (nameSlot) nameSlot.textContent = file ? file.name : 'Choose a file or drag it here';
    });
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const results = controls.map(validateControl);
    const firstInvalid = controls[results.indexOf(false)];

    if (firstInvalid) {
      if (status) {
        status.className = 'gg-form-note gg-form-note--error';
        status.innerHTML =
          '<svg class="gg-icon" aria-hidden="true" focusable="false"><use href="#i-alert-circle"></use></svg>' +
          `<span>${results.filter(r => !r).length} field(s) need attention. Please check the highlights below.</span>`;
        status.hidden = false;
      }
      firstInvalid.focus();
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
    }
    if (status) status.hidden = true;

    try {
      const result = await submitForm(name, collect(form));

      if (status) {
        status.className = 'gg-form-note gg-form-note--success';
        status.innerHTML =
          '<svg class="gg-icon" aria-hidden="true" focusable="false"><use href="#i-check-circle"></use></svg>' +
          `<span><strong>Thank you — that has reached us.</strong> Your reference is ${escapeHtml(result.reference)}. ` +
          'Our team responds within two working days.</span>';
        status.hidden = false;
        status.focus?.();
      }

      form.reset();
      qsa('.gg-field', form).forEach(field => field.classList.remove('is-error', 'is-success'));
      qsa('.gg-file', form).forEach(wrap => {
        wrap.classList.remove('has-file');
        const slot = qs('.gg-file__name', wrap);
        if (slot) slot.textContent = 'Choose a file or drag it here';
      });
    } catch (error) {
      console.warn('[Global Growth] submit failed:', error);
      if (status) {
        status.className = 'gg-form-note gg-form-note--error';
        status.innerHTML =
          '<svg class="gg-icon" aria-hidden="true" focusable="false"><use href="#i-alert-circle"></use></svg>' +
          '<span>We could not send that. Please try again, or email us directly.</span>';
        status.hidden = false;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalLabel;
      }
    }
  });
};

export const init = () => {
  qsa('[data-form]').forEach(wireForm);
};
