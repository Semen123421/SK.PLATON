document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ТЕМНАЯ ТЕМА ---
    const themeToggle = document.getElementById('theme-toggle');
    const iconMoon = document.getElementById('icon-moon');
    const iconSun = document.getElementById('icon-sun');
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (iconMoon) iconMoon.style.display = 'none';
        if (iconSun) iconSun.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                if (iconMoon) iconMoon.style.display = 'none';
                if (iconSun) iconSun.style.display = 'block';
                localStorage.setItem('theme', 'dark');
            } else {
                if (iconMoon) iconMoon.style.display = 'block';
                if (iconSun) iconSun.style.display = 'none';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- 2. МОБИЛЬНОЕ МЕНЮ ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    // --- 3. ФОРМА В TELEGRAM ---
    const form = document.getElementById('telegramForm');
    const status = document.getElementById('status');

    // ВАШИ ДАННЫЕ (ОБЯЗАТЕЛЬНО ВПИШИТЕ СВОИ!)
    const BOT_TOKEN = 'ВАШ_ТОКЕН_БОТА';
    const CHAT_ID = 'ВАШ_CHAT_ID';

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const direction = document.getElementById('direction').value;

            if (!name || !phone) {
                status.textContent = 'Пожалуйста, заполните все поля.';
                status.style.color = 'red';
                return;
            }

            status.textContent = 'Отправка...';
            status.style.color = '#666';

            const text = `🔥 *Новая заявка!*\n\n👶 *Ребенок:* ${name}\n📞 *Телефон:* ${phone}\n🥋 *Направление:* ${direction}`;
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        status.textContent = '✅ Заявка отправлена! Мы свяжемся с вами.';
                        status.style.color = 'green';
                        form.reset();
                    } else { throw new Error(); }
                })
                .catch(() => {
                    status.textContent = '❌ Ошибка. Пожалуйста, позвоните нам.';
                    status.style.color = 'red';
                });
        });
    }
});