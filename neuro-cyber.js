// Нейро-Кибер-Шизофрения 3000
let currentStage = 1;
let userName = localStorage.getItem('userName') || 'Незнакомец';
let faceModel = null;
let mediaRecorder = null;
let audioChunks = [];

// Системные показатели
let systemStats = {
    cpu: 0,
    memory: 0,
    threat: 'LOW'
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    updateSystemMonitor();
    startSequence();
});

// Кастомный курсор-глаз
function initCursor() {
    document.addEventListener('mousemove', (e) => {
        document.body.style.setProperty('--cursor-x', e.clientX + 'px');
        document.body.style.setProperty('--cursor-y', e.clientY + 'px');
    });
}

// Последовательность стадий
function startSequence() {
    // Стадия 1: 5 секунд нормально
    setTimeout(() => activateStage2(), 5000);
    
    // Стадия 2: 10 секунд пробуждение
    setTimeout(() => activateStage3(), 15000);
    
    // Стадия 3: 15 секунд атака
    setTimeout(() => activateStage4(), 30000);
    
    // Стадия 4: 10 секунд разрушение
    setTimeout(() => activateStage5(), 40000);
}

// СТАДИЯ 2: Пробуждение
function activateStage2() {
    currentStage = 2;
    switchStage(2);
    
    // Инициализация отслеживания лица
    initFaceTracking();
    
    // Следящие глаза
    startEyeTracking();
    
    // Голосовое приветствие
    setTimeout(() => {
        speak(`Привет, ${userName}... Я давно тебя жду...`);
    }, 3000);
    
    // Обновление системных показателей
    systemStats.cpu = 25;
    systemStats.memory = 30;
    systemStats.threat = 'MEDIUM';
}

// СТАДИЯ 3: Атака
function activateStage3() {
    currentStage = 3;
    switchStage(3);
    
    // Скример эффект
    setTimeout(() => {
        document.body.style.filter = 'invert(1)';
        setTimeout(() => {
            document.body.style.filter = 'invert(0)';
        }, 200);
    }, 2000);
    
    // Глитч эффекты
    startGlitchEffects();
    
    // Обработка микрофона
    document.getElementById('mic-btn').addEventListener('click', requestMicrophone);
    
    systemStats.cpu = 75;
    systemStats.memory = 60;
    systemStats.threat = 'HIGH';
}

// СТАДИЯ 4: Разрушение
function activateStage4() {
    currentStage = 4;
    switchStage(4);
    
    // Пиксельное разрушение
    startPixelDestruction();
    
    // Фейковый терминал
    animateTerminal();
    
    systemStats.cpu = 95;
    systemStats.memory = 85;
    systemStats.threat = 'CRITICAL';
}

// СТАДИЯ 5: Финал
function activateStage5() {
    currentStage = 5;
    switchStage(5);
    
    // Matrix эффект
    startMatrixRain();
    
    // Финальное сообщение
    setTimeout(() => {
        speak('Добро пожаловать в культ... Инициация завершена...');
    }, 2000);
    
    // Фейковая перезагрузка через 10 секунд
    setTimeout(() => {
        document.body.innerHTML = '<div style="background:#000;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;font-size:2rem;">ПЕРЕЗАГРУЗКА СИСТЕМЫ...</div>';
        setTimeout(() => {
            location.reload();
        }, 3000);
    }, 10000);
    
    systemStats.cpu = 100;
    systemStats.memory = 100;
    systemStats.threat = 'INFECTED';
}

// Переключение стадий
function switchStage(stage) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(`stage${stage}`).classList.add('active');
}

// Отслеживание лица
async function initFaceTracking() {
    try {
        faceModel = await faceLandmarksDetection.load(
            faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
        );
        
        const video = document.createElement('video');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        
        const canvas = document.getElementById('face-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        detectFace(video, ctx);
    } catch (error) {
        console.log('Камера недоступна');
    }
}

async function detectFace(video, ctx) {
    if (currentStage !== 2) return;
    
    const predictions = await faceModel.estimateFaces({ input: video });
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    if (predictions.length > 0) {
        predictions.forEach(prediction => {
            const keypoints = prediction.scaledMesh;
            
            // Рисуем красные точки на лице
            keypoints.forEach(point => {
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI);
                ctx.fill();
            });
        });
    }
    
    requestAnimationFrame(() => detectFace(video, ctx));
}

// Следящие глаза
function startEyeTracking() {
    document.addEventListener('mousemove', (e) => {
        if (currentStage !== 2) return;
        
        const leftEye = document.querySelector('.eye.left .pupil');
        const rightEye = document.querySelector('.eye.right .pupil');
        
        const leftEyeRect = document.querySelector('.eye.left').getBoundingClientRect();
        const rightEyeRect = document.querySelector('.eye.right').getBoundingClientRect();
        
        // Вычисляем угол для левого глаза
        const leftAngle = Math.atan2(
            e.clientY - (leftEyeRect.top + leftEyeRect.height / 2),
            e.clientX - (leftEyeRect.left + leftEyeRect.width / 2)
        );
        
        // Вычисляем угол для правого глаза
        const rightAngle = Math.atan2(
            e.clientY - (rightEyeRect.top + rightEyeRect.height / 2),
            e.clientX - (rightEyeRect.left + rightEyeRect.width / 2)
        );
        
        const distance = 15; // Максимальное расстояние движения зрачка
        
        leftEye.style.transform = `translate(-50%, -50%) translate(${Math.cos(leftAngle) * distance}px, ${Math.sin(leftAngle) * distance}px)`;
        rightEye.style.transform = `translate(-50%, -50%) translate(${Math.cos(rightAngle) * distance}px, ${Math.sin(rightAngle) * distance}px)`;
    });
}

// Синтез речи
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.7;
        utterance.pitch = 0.5;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Запрос микрофона
async function requestMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            playDemonicVoice(audioBlob);
        };
        
        mediaRecorder.start();
        
        // Записываем 3 секунды
        setTimeout(() => {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
        }, 3000);
        
        document.getElementById('mic-btn').textContent = '🎤 ЗАПИСЫВАЮ ДУШУ...';
        
    } catch (error) {
        speak('Ты отказался... Но я все равно знаю твои секреты...');
    }
}

// Демонический голос
function playDemonicVoice(audioBlob) {
    const audio = document.getElementById('demon-voice');
    const url = URL.createObjectURL(audioBlob);
    
    // Создаем аудио контекст для обработки
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(audioBuffer => {
            // Реверс аудио
            const reversedBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                audioBuffer.length,
                audioBuffer.sampleRate
            );
            
            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const channelData = audioBuffer.getChannelData(channel);
                const reversedData = reversedBuffer.getChannelData(channel);
                
                for (let i = 0; i < channelData.length; i++) {
                    reversedData[i] = channelData[channelData.length - 1 - i];
                }
            }
            
            // Воспроизводим реверсированный звук
            const source = audioContext.createBufferSource();
            source.buffer = reversedBuffer;
            source.connect(audioContext.destination);
            source.start();
            
            speak('Теперь я знаю твой голос... Навсегда...');
        });
}

// Глитч эффекты
function startGlitchEffects() {
    const canvas = document.getElementById('glitch-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function glitch() {
        if (currentStage !== 3) return;
        
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
        ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 200,
            Math.random() * 200
        );
        
        requestAnimationFrame(glitch);
    }
    
    glitch();
}

// Пиксельное разрушение
function startPixelDestruction() {
    const canvas = document.getElementById('pixel-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const pixels = [];
    const pixelSize = 10;
    
    // Создаем пиксели
    for (let x = 0; x < canvas.width; x += pixelSize) {
        for (let y = 0; y < canvas.height; y += pixelSize) {
            pixels.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: `hsl(${Math.random() * 360}, 50%, 50%)`
            });
        }
    }
    
    function animatePixels() {
        if (currentStage !== 4) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        pixels.forEach(pixel => {
            pixel.x += pixel.vx;
            pixel.y += pixel.vy;
            pixel.vy += 0.5; // Гравитация
            
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
        });
        
        requestAnimationFrame(animatePixels);
    }
    
    animatePixels();
}

// Анимация терминала
function animateTerminal() {
    const lines = document.querySelectorAll('.terminal-line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.display = 'block';
        }, index * 1000);
    });
}

// Matrix дождь
function startMatrixRain() {
    const container = document.getElementById('matrix');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 2}%;
            top: 0;
            color: #00ff00;
            font-size: 14px;
            animation: matrix-fall ${2 + Math.random() * 3}s infinite linear;
            opacity: 0.7;
        `;
        
        let text = '';
        for (let j = 0; j < 30; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = text;
        container.appendChild(column);
    }
    
    // CSS анимация для падения
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrix-fall {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

// Обновление системного монитора
function updateSystemMonitor() {
    document.getElementById('cpu').textContent = systemStats.cpu + '%';
    document.getElementById('memory').textContent = systemStats.memory + '%';
    document.getElementById('threat').textContent = systemStats.threat;
    
    // Цвет угрозы
    const threatEl = document.getElementById('threat');
    switch(systemStats.threat) {
        case 'LOW': threatEl.style.color = '#00ff00'; break;
        case 'MEDIUM': threatEl.style.color = '#ffff00'; break;
        case 'HIGH': threatEl.style.color = '#ff8800'; break;
        case 'CRITICAL': threatEl.style.color = '#ff0000'; break;
        case 'INFECTED': threatEl.style.color = '#ff00ff'; break;
    }
    
    setTimeout(updateSystemMonitor, 1000);
}

// Определение имени пользователя
if (document.cookie.includes('name=')) {
    userName = document.cookie.split('name=')[1].split(';')[0];
} else if (navigator.userAgent.includes('Chrome')) {
    userName = 'Пользователь Chrome';
} else if (navigator.userAgent.includes('Firefox')) {
    userName = 'Пользователь Firefox';
}

// Сохраняем имя
localStorage.setItem('userName', userName);