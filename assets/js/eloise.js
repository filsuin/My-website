document.addEventListener('DOMContentLoaded', () => {
    // Récupérer le thème sauvegardé ou utiliser 'light' par défaut
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    initializeLoveLanguages();
});

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Fonction pour créer des cœurs flottants
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Position horizontale aléatoire
    heart.style.left = `${Math.random() * 95}%`;
    // Position de départ verticale aléatoire
    heart.style.bottom = '0';
    // Rotation initiale aléatoire
    heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Vitesse de déplacement aléatoire
    const duration = 4 + Math.random() * 2;
    heart.style.animation = `float ${duration}s linear`;
    
    // Taille aléatoire
    const size = 20 + Math.random() * 15;
    heart.style.fontSize = `${size}px`;
    
    document.querySelector('.hearts-animation').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Ajuster l'intervalle pour une meilleure distribution
setInterval(createFloatingHeart, 400);

// Gestion des compliments
document.getElementById('complimentBtn').addEventListener('click', async function() {
    const complimentResult = document.getElementById('complimentResult');
    complimentResult.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération en cours...';

    try {
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [{
                    role: "system",
                    content: "Tu es une bonne personne créative qui ne se répète jamais et qui génère des compliments uniques et différents à chaque fois."
                }, {
                    role: "user",
                    content: `Génère un nouveau compliment pour ma copine Éloïse pour qu'elle ait toujours confiance en elle même quand ça ne vas pas trop. 
                             Le compliment doit être court (maximum 1 phrase),
                             Timestamp: ${Date.now()}`
                }],
                temperature: 0.9,
                max_tokens: 100
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        // Animation de transition
        complimentResult.style.opacity = '0';
        setTimeout(() => {
            complimentResult.innerHTML = data.choices[0].message.content.trim();
            complimentResult.style.opacity = '1';
        }, 300);

    } catch (error) {
        console.error('Error:', error);
        complimentResult.innerHTML = "Désolé, une erreur s'est produite. Mais tu restes la plus belle à mes yeux ! ❤️";
    }
});

const loveLanguages = [
    { lang: 'Français', text: 'Je t\'aime' },
    { lang: 'English', text: 'I love you' },
    { lang: 'Español', text: 'Te amo' },
    { lang: 'Deutsch', text: 'Ich liebe dich' },
    { lang: 'Italiano', text: 'Ti amo' },
    { lang: 'Português', text: 'Eu te amo' },
    { lang: '日本語', text: '愛してる' },
    { lang: '한국어', text: '사랑해' },
    { lang: '中文', text: '我爱你' },
    { lang: 'Русский', text: 'Я люблю тебя' },
    { lang: 'العربية', text: 'أحبك' },
    { lang: 'Hindi', text: 'मैं तुमसे प्यार करता हूं' },
    { lang: 'Nederlands', text: 'Ik hou van je' },
    { lang: 'Svenska', text: 'Jag älskar dig' },
    { lang: 'Ελληνικά', text: 'Σ\'αγαπώ' },
    { lang: 'Polski', text: 'Kocham cię' },
    { lang: 'Türkçe', text: 'Seni seviyorum' },
    { lang: 'Dansk', text: 'Jeg elsker dig' },
    { lang: 'Suomi', text: 'Minä rakastan sinua' },
    { lang: 'Czech', text: 'Miluji tě' },
    { lang: 'Vietnamese', text: 'Anh yêu em' },
    { lang: 'Thai', text: 'ฉันรักคุณ' },
    { lang: 'Indonesian', text: 'Aku cinta kamu' },
    { lang: 'Filipino', text: 'Mahal kita' },
    { lang: 'Romanian', text: 'Te iubesc' },
    { lang: 'Hungarian', text: 'Szeretlek' },
    { lang: 'Hebrew', text: 'אני אוהב אותך' },
    { lang: 'Persian', text: 'دوستت دارم' },
    { lang: 'Bengali', text: 'আমি তোমাকে ভালোবাসি' },
    { lang: 'Ukrainian', text: 'Я тебе кохаю' },
    { lang: 'Croatian', text: 'Volim te' },
    { lang: 'Lithuanian', text: 'Aš tave myliu' },
    { lang: 'Slovak', text: 'Ľúbim ťa' },
    { lang: 'Latvian', text: 'Es tevi mīlu' },
    { lang: 'Estonian', text: 'Ma armastan sind' },
    { lang: 'Albanian', text: 'Të dua' },
    { lang: 'Macedonian', text: 'Те сакам' },
    { lang: 'Bulgarian', text: 'Обичам те' },
    { lang: 'Georgian', text: 'მიყვარხარ' },
    { lang: 'Armenian', text: 'Ես քեզ սիրում եմ' },
    { lang: 'Icelandic', text: 'Ég elska þig' },
    { lang: 'Maltese', text: 'Inħobbok' },
    { lang: 'Swahili', text: 'Nakupenda' },
    { lang: 'Mongolian', text: 'Би чамд хайртай' },
    { lang: 'Uzbek', text: 'Men seni sevaman' },
    { lang: 'Kazakh', text: 'Мен сені сүйемін' },
    { lang: 'Azerbaijani', text: 'Səni sevirəm' },
    { lang: 'Kurdish', text: 'Ez te dihezbînim' },
    { lang: 'Nepali', text: 'म तिमीलाई माया गर्छु' },
    { lang: 'Tamil', text: 'நான் உன்னை காதலிக்கிறேன்' },
    { lang: 'Telugu', text: 'నేను నిన్ను ప్రేమిస్తున్నాను' },
    { lang: 'Kannada', text: 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ' },
    { lang: 'Malayalam', text: 'ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു' },
    { lang: 'Marathi', text: 'मी तुझ्यावर प्रेम करतो' },
    { lang: 'Punjabi', text: 'ਮੈਂ ਤੈਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ' },
    { lang: 'Urdu', text: 'میں تم سے پیار کرتا ہوں' },
    { lang: 'Khmer', text: 'ខ្ញុំស្រឡាញ់អ្នក' },
    { lang: 'Lao', text: 'ຂ້ອຍຮັກເຈົ້າ' },
    { lang: 'Myanmar', text: 'ငါချစ်တယ်' },
    { lang: 'Amharic', text: 'እወድሻለሁ' },
    { lang: 'Assamese', text: 'মই তোমাক ভাল পাওঁ' },
    { lang: 'Basque', text: 'Maite zaitut' },
    { lang: 'Belarusian', text: 'Я цябе кахаю' },
    { lang: 'Bhojpuri', text: 'हम तोहरा से प्यार करी' },
    { lang: 'Burmese', text: 'ချစ်တယ်' },
    { lang: 'Catalan', text: 'T\'estimo' },
    { lang: 'Cebuano', text: 'Gihigugma tika' },
    { lang: 'Chichewa', text: 'Ndimakukonda' },
    { lang: 'Corsican', text: 'Ti amu' },
    { lang: 'Dhivehi', text: 'އަހަރެން ދެކެ ލޯބިވޭ' },
    { lang: 'Esperanto', text: 'Mi amas vin' },
    { lang: 'Frisian', text: 'Ik hâld fan dy' },
    { lang: 'Galician', text: 'Quérote' },
    { lang: 'Guarani', text: 'Rohayhu' },
    { lang: 'Haitian Creole', text: 'Mwen renmen ou' },
    { lang: 'Hausa', text: 'Ina sonki' },
    { lang: 'Hawaiian', text: 'Aloha au iā ʻoe' },
    { lang: 'Hmong', text: 'Kuv hlub koj' },
    { lang: 'Igbo', text: 'Ahụrụ m gị n\'anya' },
    { lang: 'Ilocano', text: 'Ay-ayaten ka' },
    { lang: 'Irish', text: 'Tá grá agam duit' },
    { lang: 'Javanese', text: 'Aku tresna sampeyan' },
    { lang: 'Kannada', text: 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ' },
    { lang: 'Kazakh', text: 'Мен сені сүйемін' },
    { lang: 'Kinyarwanda', text: 'Ndagukunda' },
    { lang: 'Kirundi', text: 'Ndagukunda' },
    { lang: 'Kurdish Sorani', text: 'من تۆم خۆش دەوێت' },
    { lang: 'Kyrgyz', text: 'Мен сени сүйөм' },
    { lang: 'Luxembourgish', text: 'Ech hunn dech gär' },
    { lang: 'Malagasy', text: 'Tiako ianao' },
    { lang: 'Maori', text: 'Kei te aroha au ki a koe' },
    { lang: 'Marathi', text: 'मी तुझ्यावर प्रेम करतो' },
    { lang: 'Oriya', text: 'ମୁଁ ତୁମକୁ ଭଲ ପାଏ' },
    { lang: 'Pashto', text: 'زه تا سره مينه کوم' },
    { lang: 'Quechua', text: 'Munakuyki' },
    { lang: 'Samoan', text: 'Ou te alofa ia te oe' },
    { lang: 'Scots Gaelic', text: 'Tha gaol agam ort' },
    { lang: 'Sesotho', text: 'Kea o rata' },
    { lang: 'Shona', text: 'Ndinokuda' },
    { lang: 'Sindhi', text: 'مان توسان پيار ڪريان ٿو' },
    { lang: 'Sinhala', text: 'මම ඔයාට ආදරෙයි' },
    { lang: 'Somali', text: 'Waan ku jeclahay' },
    { lang: 'Sundanese', text: 'Abdi bogoh ka anjeun' },
    { lang: 'Tajik', text: 'Ман туро дӯст медорам' },
    { lang: 'Tatar', text: 'Мин сине яратам' },
    { lang: 'Telugu', text: 'నేను నిన్ను ప్రేమిస్తున్నాను' },
    { lang: 'Turkmen', text: 'Men seni söýyärin' },
    { lang: 'Yoruba', text: 'Mo nífẹ̀ẹ́ rẹ' },
    { lang: 'Zulu', text: 'Ngiyakuthanda' }
];

function initializeLoveLanguages() {
    const container = document.querySelector('.love-languages-scroll');
    // Répéter la liste deux fois pour un défilement continu
    const content = [...loveLanguages, ...loveLanguages].map(item => 
        `<span class="love-language" title="${item.lang}">${item.text}</span>`
    ).join('');
    
    container.innerHTML = content;
}

document.addEventListener('DOMContentLoaded', initializeLoveLanguages);