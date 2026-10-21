document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Мобильное меню (Бургер) ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });

        // Закрываем меню при клике на ссылку
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // --- 2. Отправка формы в Telegram ---
    const form = document.getElementById('telegramForm');
    const status = document.getElementById('status');

    // ЗАМЕНИТЕ НА СВОИ ДАННЫЕ (см. инструкцию ниже)
    const BOT_TOKEN = 'ВАШ_ТОКЕН_БОТА';
    const CHAT_ID = 'ВАШ_CHAT_ID';

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const direction = document.getElementById('direction').value;

            // Валидация
            if (!name || !phone) {
                status.textContent = 'Пожалуйста, заполните все поля.';
                status.style.color = 'red';
                return;
            }

            status.textContent = 'Отправка...';
            status.style.color = '#666';

            const text = `🔥 *Новая заявка с сайта!*\n\n👶 *Ребенок:* ${name}\n📞 *Телефон:* ${phone}\n🥋 *Направление:* ${direction}`;
            
            // Используем Markdown для красивого форматирования в ТГ
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        status.textContent = '✅ Заявка отправлена! Мы скоро свяжемся с вами.';
                        status.style.color = 'green';
                        form.reset();
                    } else {
                        throw new Error('Ошибка Telegram');
                    }
                })
                .catch(error => {
                    status.textContent = '❌ Ошибка. Пожалуйста, позвоните нам: +7 (999) 123-45-67';
                    status.style.color = 'red';
                    console.error(error);
                });
        });
    }
});