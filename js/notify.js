;(function(){
	'use strict';

	const isLocal = ['localhost','127.0.0.1'].includes(window.location.hostname);
	const endpoint = isLocal ? 'http://localhost:3001/api/notify' : '/api/notify';

	const mapFormData = (fd) => {
		const obj = Object.fromEntries(fd.entries());
		obj.agree = obj.agree === 'on' || obj.agree === true || obj.agree === 'true';
		return obj;
	};

	const send = async (payload) => {
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			
			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
			}
			
			return res.json();
		} catch (error) {
			console.error('Network error:', error);
			throw new Error('Ошибка сети. Проверьте подключение к интернету.');
		}
	};

	const ensureGlobalErrorEl = () => {
		const form = document.querySelector('.m-form');
		if (!form) return null;
		let el = form.querySelector('.m-error--global');
		if (!el) {
			el = document.createElement('p');
			el.className = 'm-error m-error--global';
			el.setAttribute('role','status');
			el.setAttribute('aria-live','polite');
			const submit = form.querySelector('.m-submit');
			form.insertBefore(el, submit);
		}
		return el;
	};

	document.addEventListener('modal:submit', async (e) => {
		const submitBtn = document.querySelector('.m-submit');
		const initialText = submitBtn ? submitBtn.textContent : '';
		const globalErr = ensureGlobalErrorEl();
		
		try {
			// Show loading state
			if (submitBtn) { 
				submitBtn.disabled = true; 
				submitBtn.textContent = 'Отправляем...'; 
			}
			if (globalErr) globalErr.textContent = '';
			
		// Prepare and send data
		const data = mapFormData(e.detail);
			
			const res = await send(data);
			
			// Check response
			if (!res || res.ok !== true) {
				throw new Error(res?.message || 'Сервер вернул ошибку');
			}
			
			// Success state
			if (submitBtn) submitBtn.textContent = 'Отправлено!';
			if (globalErr) globalErr.textContent = 'Заявка успешно отправлена!';
			
			// Close modal after delay
			setTimeout(() => { 
				if (window.ModalContact) window.ModalContact.close(); 
			}, 1500);
			
		} catch(err) {
			console.error('Form submission error:', err);
			
			// Reset button state
			if (submitBtn) { 
				submitBtn.disabled = false; 
				submitBtn.textContent = initialText || 'Отправить'; 
			}
			
			// Show error message
			if (globalErr) {
				globalErr.textContent = err.message || 'Ошибка отправки. Попробуйте позже.';
			}
		}
	});
})();

