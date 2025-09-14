;(function(){
	'use strict';

	const SELECTORS = {
		overlay: '[data-success-overlay]',
		dialog: '.success-dialog',
		close: '[data-success-close]',
		button: '.success-button'
	};

	const state = {
		lastFocused: null
	};

	const bySel = (root, sel) => root.querySelector(sel);

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
		const firstInteractive = dialog.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
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
		
		// Закрытие по клику на overlay
		overlay.addEventListener('click', (e) => { 
			if (e.target === overlay) close(); 
		});
		
		// Закрытие по кнопке закрытия
		const btnClose = overlay.querySelector(SELECTORS.close);
		if (btnClose) btnClose.addEventListener('click', close);
		
		// Закрытие по кнопке "Понятно"
		const btnSuccess = overlay.querySelector(SELECTORS.button);
		if (btnSuccess) btnSuccess.addEventListener('click', close);
	};

	// Public API
	window.ModalSuccess = {
		open,
		close
	};

	// Инициализация
	document.addEventListener('DOMContentLoaded', () => {
		attach();
	});

})();
