// ===== مقداردهی اولیه AOS =====
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ===== تغییر استایل نوبار هنگام اسکرول =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== اسکرول نرم به بخش‌ها =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // بستن منوی موبایل بعد از کلیک
            const navCollapse = document.getElementById('mainNav');
            if (navCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===== سیستم تغییر زبان (سه زبانه) =====
let currentLang = 'fa';

const langData = {
    fa: { flag: '🇮🇷', name: 'فارسی' },
    en: { flag: '🇬🇧', name: 'English' },
    fr: { flag: '🇫🇷', name: 'Français' }
};

function setLanguage(lang) {
    currentLang = lang;
    
    // آپدیت دکمه dropdown
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
        langBtn.innerHTML = `${langData[lang].flag} ${langData[lang].name}`;
    }
    
    // تغییر جهت و زبان HTML
    const htmlRoot = document.getElementById('htmlRoot');
    
    if (lang === 'fa') {
        htmlRoot.lang = 'fa';
        htmlRoot.dir = 'rtl';
        const bsLink = document.querySelector('link[href*="bootstrap.min.css"]');
        if (bsLink) {
            bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
        }
    } else {
        htmlRoot.lang = lang;
        htmlRoot.dir = 'ltr';
        const bsLink = document.querySelector('link[href*="bootstrap.rtl"]');
        if (bsLink) {
            bsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
        }
    }
    
    // تغییر تمام متن‌ها
    document.querySelectorAll('[data-fa][data-en][data-fr]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (!text) return;
        
        if (el.tagName === 'OPTION') {
            el.textContent = text;
        } else if (el.tagName === 'OPTGROUP') {
            el.textContent = text;
            el.label = text;
        } else {
            el.innerHTML = text;
        }
    });
    
    // تغییر placeholder اینپوت‌ها
    document.querySelectorAll('[data-fa-placeholder]').forEach(el => {
        const placeholder = el.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) el.placeholder = placeholder;
    });
    
    // ذخیره زبان
    localStorage.setItem('lingua-lang', lang);
}

// ===== مدیریت فرم تماس =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();
            const agree = document.getElementById('contactAgree').checked;
            
            // اعتبارسنجی
            if (!name) {
                alert('لطفاً نام و نام خانوادگی را وارد کنید.');
                return;
            }
            
            if (!email && !phone) {
                alert('لطفاً ایمیل یا شماره تماس را وارد کنید.');
                return;
            }
            
            if (!subject) {
                alert('لطفاً موضوع پیام را انتخاب کنید.');
                return;
            }
            
            if (!message) {
                alert('لطفاً پیام خود را بنویسید.');
                return;
            }
            
            if (!agree) {
                alert('لطفاً با قوانین حریم خصوصی موافقت کنید.');
                return;
            }
            
            // شبیه‌سازی ارسال
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>در حال ارسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('✅ پیام شما با موفقیت ارسال شد!\n\nهمکاران ما در اسرع وقت با شما تماس خواهند گرفت.');
                contactForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});


// ===== مدیریت فرم همکاری =====
document.addEventListener('DOMContentLoaded', function() {
    const careerForm = document.getElementById('careerForm');
    
    if (careerForm) {
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('careerName').value.trim();
            const email = document.getElementById('careerEmail').value.trim();
            const phone = document.getElementById('careerPhone').value.trim();
            const position = document.getElementById('careerPosition').value;
            const resume = document.getElementById('careerResume').files[0];
            const message = document.getElementById('careerMessage').value.trim();
            const agree = document.getElementById('careerAgree').checked;
            
            // اعتبارسنجی
            if (!name) {
                alert('لطفاً نام و نام خانوادگی را وارد کنید.');
                return;
            }
            
            if (!email && !phone) {
                alert('لطفاً ایمیل یا شماره تماس را وارد کنید.');
                return;
            }
            
            if (!position) {
                alert('لطفاً موقعیت مورد نظر را انتخاب کنید.');
                return;
            }
            
            if (!resume) {
                alert('لطفاً رزومه خود را آپلود کنید.');
                return;
            }
            
            if (resume.size > 5 * 1024 * 1024) {
                alert('حجم فایل نباید بیشتر از ۵ مگابایت باشد.');
                return;
            }
            
            if (!agree) {
                alert('لطفاً با قوانین حریم خصوصی موافقت کنید.');
                return;
            }
            
            // شبیه‌سازی ارسال
            const submitBtn = careerForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>در حال ارسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('✅ درخواست شما با موفقیت ارسال شد!\n\nتیم منابع انسانی ما در اسرع وقت با شما تماس خواهد گرفت.');
                careerForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});