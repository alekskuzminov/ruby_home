;(function(){
	'use strict';

	const SELECTORS = {
		overlay: '[data-modal-overlay]',
		dialog: '.m-dialog',
		close: '[data-modal-close]',
		form: '.m-form',
		inputs: '.m-input',
		error: '.m-error',
		submit: '.m-submit',
		agree: '#m-agree'
	};

	const state = {
		lastFocused: null
	};

	const bySel = (root, sel) => root.querySelector(sel);
	const bySelAll = (root, sel) => Array.from(root.querySelectorAll(sel));

	const getDigitsCount = (value) => (value.match(/\d/g)||[]).length;
	const isNameValid = (v) => /^[A-Za-zА-Яа-яЁё\-\s]{2,}$/.test(v.trim());
	const isPhoneValid = (v) => getDigitsCount(v) >= 10;

	// Функция маски телефона
	const formatPhoneNumber = (value) => {
		// Удаляем все нецифровые символы
		const digits = value.replace(/\D/g, '');
		
		// Если номер начинается с 8, заменяем на 7
		let cleanDigits = digits;
		if (cleanDigits.startsWith('8')) {
			cleanDigits = '7' + cleanDigits.slice(1);
		}
		
		// Если номер не начинается с 7, добавляем 7
		if (!cleanDigits.startsWith('7')) {
			cleanDigits = '7' + cleanDigits;
		}
		
		// Ограничиваем длину до 11 цифр
		cleanDigits = cleanDigits.slice(0, 11);
		
		// Применяем маску
		if (cleanDigits.length === 0) return '';
		if (cleanDigits.length <= 1) return '+7';
		if (cleanDigits.length <= 4) return `+7 (${cleanDigits.slice(1, 4)}`;
		if (cleanDigits.length <= 7) return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4, 7)}`;
		if (cleanDigits.length <= 9) return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4, 7)}-${cleanDigits.slice(7, 9)}`;
		return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4, 7)}-${cleanDigits.slice(7, 9)}-${cleanDigits.slice(9, 11)}`;
	};

	const handlePhoneInput = (input) => {
		const cursorPosition = input.selectionStart;
		const oldValue = input.value;
		const newValue = formatPhoneNumber(input.value);
		
		input.value = newValue;
		
		// Восстанавливаем позицию курсора
		const lengthDiff = newValue.length - oldValue.length;
		const newCursorPosition = Math.max(0, cursorPosition + lengthDiff);
		input.setSelectionRange(newCursorPosition, newCursorPosition);
	};

	const setInvalid = (input, message) => {
		input.classList.add('is-invalid');
		const err = document.getElementById(input.getAttribute('aria-describedby'));
		if (err) err.textContent = message || '';
	};
	const clearInvalid = (input) => {
		input.classList.remove('is-invalid');
		const err = document.getElementById(input.getAttribute('aria-describedby'));
		if (err) err.textContent = '';
	};

	const validateField = (input) => {
		const name = input.name;
		const value = input.value;
		if (name === 'name') {
			if (!isNameValid(value)) { setInvalid(input, 'Введите 2+ букв, пробелов или дефис'); return false; }
			clearInvalid(input); return true;
		}
		if (name === 'phone') {
			if (!isPhoneValid(value)) { setInvalid(input, 'Введите минимум 10 цифр'); return false; }
			clearInvalid(input); return true;
		}
		if (name === 'email') {
			if (!input.checkValidity()) { setInvalid(input, 'Введите корректный email'); return false; }
			clearInvalid(input); return true;
		}
		return true;
	};

	const validateForm = (form) => {
		const inputs = bySelAll(form, SELECTORS.inputs);
		let valid = true;
		inputs.forEach(i => { if (!validateField(i)) valid = false; });
		const agree = form.querySelector(SELECTORS.agree);
		if (!agree.checked) valid = false;
		const submit = form.querySelector(SELECTORS.submit);
		if (submit) submit.disabled = !valid;
		return valid;
	};

	// Focus trap
	const trapFocus = (overlay) => {
		const focusable = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		const f = Array.from(focusable).filter(el => !el.hasAttribute('disabled'));
		if (f.length === 0) return () => {};
		const first = f[0];
		const last = f[f.length - 1];
		return (e) => {
			if (e.key !== 'Tab') return;
			if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
		};
	};

	const setScrollbarCompensation = () => {
		const supportsGutter = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('scrollbar-gutter: stable');
		const doc = document.documentElement;
		const measured = window.innerWidth - doc.clientWidth;
		const scrollbarWidth = supportsGutter ? 0 : Math.max(0, measured);
		document.body.style.setProperty('--scrollbar-comp', scrollbarWidth + 'px');
	};

	const clearScrollbarCompensation = () => {
		document.body.style.removeProperty('--scrollbar-comp');
	};

	const open = () => {
		const overlay = document.querySelector(SELECTORS.overlay);
		if (!overlay) return;
		state.lastFocused = document.activeElement;
		overlay.hidden = false;
		setScrollbarCompensation();
		document.body.classList.add('has-modal');
		requestAnimationFrame(() => overlay.classList.add('is-visible'));
		const dialog = bySel(overlay, SELECTORS.dialog);
		const firstInteractive = dialog.querySelector('input, button, [href], [tabindex]:not([tabindex="-1"])');
		(firstInteractive || dialog).focus();
		state.trap = trapFocus(overlay);
		document.addEventListener('keydown', handleKeydown);
		dialog.addEventListener('keydown', state.trap);
	};

	const close = () => {
		const overlay = document.querySelector(SELECTORS.overlay);
		if (!overlay) return;
		overlay.classList.remove('is-visible');
		setTimeout(() => { overlay.hidden = true; }, 180);
		document.body.classList.remove('has-modal');
		clearScrollbarCompensation();
		document.removeEventListener('keydown', handleKeydown);
		if (state.trap) {
			const dialog = bySel(overlay, SELECTORS.dialog);
			dialog.removeEventListener('keydown', state.trap);
		}
		if (state.lastFocused && typeof state.lastFocused.focus === 'function') state.lastFocused.focus();
	};

	const handleKeydown = (e) => {
		if (e.key === 'Escape') close();
	};

	const attach = () => {
		const overlay = document.querySelector(SELECTORS.overlay);
		if (!overlay) return;
		overlay.addEventListener('click', (e)=>{ if (e.target === overlay) close(); });
		const btnClose = overlay.querySelector(SELECTORS.close);
		if (btnClose) btnClose.addEventListener('click', close);
		const form = overlay.querySelector(SELECTORS.form);
		if (form) {
			// Обработчик маски для поля телефона
			const phoneInput = form.querySelector('#m-phone');
			if (phoneInput) {
				phoneInput.addEventListener('input', (e) => {
					handlePhoneInput(e.target);
					validateForm(form);
				});
			}
			
			form.addEventListener('input', (e)=>{
				const target = e.target;
				if (target.matches(SELECTORS.inputs)) validateForm(form);
			});
			// реагируем на изменение чекбокса согласия и радиокнопок
			form.addEventListener('change', (e)=>{
				const target = e.target;
				if (target.matches(SELECTORS.agree) || (target.matches('input[type="radio"]') && target.name === 'intent')) {
					validateForm(form);
				}
			});
			form.addEventListener('blur', (e)=>{
				const target = e.target; if (target.matches(SELECTORS.inputs)) validateField(target);
			}, true);
			form.addEventListener('submit', (e)=>{
				e.preventDefault();
				if (!validateForm(form)) return;
				
			// Симуляция отправки формы
			const data = new FormData(form);
				
				// Показываем модальное окно успеха
				if (window.ModalSuccess) {
					close(); // Закрываем текущее модальное окно
					setTimeout(() => {
						window.ModalSuccess.open();
					}, 200); // Небольшая задержка для плавного перехода
				}
				
				const event = new CustomEvent('modal:submit', { detail: data });
				document.dispatchEvent(event);
			});
			// установить корректное состояние кнопки при инициализации
			validateForm(form);
		}
	};

	const prefill = ({name, phone, email, intent}={}) => {
		const overlay = document.querySelector(SELECTORS.overlay);
		if (!overlay) return;
		if (name) overlay.querySelector('#m-name').value = name;
		if (phone) {
			const phoneInput = overlay.querySelector('#m-phone');
			phoneInput.value = formatPhoneNumber(phone);
		}
		if (email) overlay.querySelector('#m-email').value = email;
		if (intent) {
			const radio = overlay.querySelector(`input[name="intent"][value="${intent}"]`);
			if (radio) radio.checked = true;
		}
		validateForm(overlay.querySelector(SELECTORS.form));
	};

	// Public API
	window.ModalContact = {
		open,
		close,
		prefill
	};

	// Wire buttons in page (e.g., hero/request)
	document.addEventListener('DOMContentLoaded', () => {
		attach();
		// Try bind existing buttons to open
		const triggers = document.querySelectorAll('.hero__button, .property-card__cta, .header__button');
		triggers.forEach(btn => btn.addEventListener('click', () => open()));
	});

})();

