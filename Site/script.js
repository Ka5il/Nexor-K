// Получаем элемент canvas и его контекст
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры canvas равными размерам окна
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Пересчитываем количество столбцов
    const newColumns = Math.floor(canvas.width / fontSize);
    
    // Обновляем массив drops
    if (newColumns > drops.length) {
        // Добавляем новые столбцы
        for (let i = drops.length; i < newColumns; i++) {
            drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
        }
    } else if (newColumns < drops.length) {
        // Удаляем лишние столбцы
        drops.length = newColumns;
    }
}

// Символы для матричного эффекта
const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZйцукенгшщзхъфывапролджэячсмитьбю";
const charsArray = chars.split('');

// Настройки эффекта
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);

// Массив для хранения позиции каждого столбца
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
}

// Цвет символов - красный
const color = '#f00';
// Скорость падения (чем больше значение, тем быстрее)
const speed = 0.7;

// Переменная для управления временем
let lastTime = 0;
const frameInterval = 1000 / 30; // 30 FPS

// Функция отрисовки кадра
function draw(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    
    if (deltaTime > frameInterval) {
        // Полупрозрачный черный фон для создания эффекта следа
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Устанавливаем цвет и шрифт
        ctx.fillStyle = color;
        ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // Отрисовываем символы для каждого столбца
        for (let i = 0; i < drops.length; i++) {
            // Случайный символ
            const text = charsArray[Math.floor(Math.random() * charsArray.length)];
            
            // Координаты для отрисовки символа
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Отрисовываем символ только если он в пределах видимости
            if (y < canvas.height && y > -fontSize) {
                ctx.fillText(text, x, y);
            }
            
            // Если символ ушел за нижнюю границу или случайное условие - сбрасываем его
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Увеличиваем позицию для следующего кадра с учетом скорости
            drops[i] += speed;
        }
        
        lastTime = timestamp;
    }
}

// Переменная для управления анимацией
let animationId = null;

// Функция анимации
function animate(timestamp) {
    draw(timestamp);
    animationId = requestAnimationFrame(animate);
}

// Функция запуска анимации
function startAnimation() {
    if (!animationId) {
        resizeCanvas();
        lastTime = 0;
        animationId = requestAnimationFrame(animate);
    }
}

// Функция остановки анимации
function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Запускаем анимацию после загрузки страницы
window.addEventListener('load', () => {
    startAnimation();
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    resizeCanvas();
});

// Обработчик видимости страницы
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAnimation();
    } else {
        startAnimation();
    }
});

// Добавляем интерактивность для социальных ссылок
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Создаем эффект вспышки при клике
            const flash = document.createElement('div');
            flash.style.position = 'fixed';
            flash.style.top = '0';
            flash.style.left = '0';
            flash.style.width = '100%';
            flash.style.height = '100%';
            flash.style.background = 'rgba(255, 0, 0, 0.1)';
            flash.style.zIndex = '10000';
            flash.style.pointerEvents = 'none';
            flash.style.animation = 'flashEffect 0.3s ease-out';
            
            document.body.appendChild(flash);
            
            // Удаляем элемент после анимации
            setTimeout(() => {
                if (flash.parentNode) {
                    document.body.removeChild(flash);
                }
            }, 300);
            
            // Переходим по ссылке после анимации
            setTimeout(() => {
                window.open(link.href, '_blank');
            }, 150);
        });
    });
});

// Добавляем стили для анимации вспышки
if (!document.querySelector('#flash-styles')) {
    const style = document.createElement('style');
    style.id = 'flash-styles';
    style.textContent = `
        @keyframes flashEffect {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}