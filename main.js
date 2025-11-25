// Psychology Website Main JavaScript
// Interactive functionality for the educational psychology website

// Global variables
let currentQuestion = 1;
let personalityAnswers = [];
let glossaryData = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize personality test
    initPersonalityTest();
    
    // Initialize psychology chart
    initPsychologyChart();
    
    // Initialize glossary
    initGlossary();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Personality Test Functionality
function initPersonalityTest() {
    const startBtn = document.getElementById('start-personality-test');
    const modal = document.getElementById('personality-modal');
    const closeBtn = document.getElementById('close-personality-test');
    const restartBtn = document.getElementById('restart-test');
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            showPersonalityTest();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hidePersonalityTest();
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            restartPersonalityTest();
        });
    }
    
    // Handle answer clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('answer-btn')) {
            handleAnswerClick(e.target);
        }
    });
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hidePersonalityTest();
            }
        });
    }
}

function showPersonalityTest() {
    const modal = document.getElementById('personality-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Reset test state
        currentQuestion = 1;
        personalityAnswers = [];
        showQuestion(1);
    }
}

function hidePersonalityTest() {
    const modal = document.getElementById('personality-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

function showQuestion(questionNumber) {
    // Hide all questions
    const questions = document.querySelectorAll('.personality-question');
    questions.forEach(q => q.classList.remove('active'));
    
    // Show current question
    const currentQ = document.querySelector(`[data-question="${questionNumber}"]`);
    if (currentQ) {
        currentQ.classList.add('active');
    }
    
    // Hide results
    const results = document.getElementById('personality-results');
    if (results) {
        results.classList.add('hidden');
    }
}

function handleAnswerClick(button) {
    const value = button.getAttribute('data-value');
    const questionNumber = parseInt(button.closest('.personality-question').getAttribute('data-question'));
    
    // Store answer
    personalityAnswers[questionNumber - 1] = value;
    
    // Visual feedback
    button.style.background = 'rgba(93, 173, 226, 0.1)';
    button.style.borderColor = '#5DADE2';
    
    // Move to next question or show results
    setTimeout(() => {
        if (questionNumber < 3) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showPersonalityResults();
        }
    }, 500);
}

function showPersonalityResults() {
    // Hide all questions
    const questions = document.querySelectorAll('.personality-question');
    questions.forEach(q => q.classList.remove('active'));
    
    // Show results
    const resultsDiv = document.getElementById('personality-results');
    const typeDiv = document.getElementById('personality-type');
    const strengthsList = document.getElementById('strengths-list');
    const developmentList = document.getElementById('development-list');
    
    if (resultsDiv && typeDiv && strengthsList && developmentList) {
        // Calculate personality type based on answers
        const personalityType = calculatePersonalityType();
        
        // Display results
        typeDiv.querySelector('h5').textContent = personalityType.title;
        typeDiv.querySelector('p').textContent = personalityType.description;
        
        // Display strengths
        strengthsList.innerHTML = '';
        personalityType.strengths.forEach(strength => {
            const li = document.createElement('li');
            li.textContent = strength;
            strengthsList.appendChild(li);
        });
        
        // Display development areas
        developmentList.innerHTML = '';
        personalityType.development.forEach(area => {
            const li = document.createElement('li');
            li.textContent = area;
            developmentList.appendChild(li);
        });
        
        resultsDiv.classList.remove('hidden');
    }
}

function calculatePersonalityType() {
    // Simple personality calculation based on answers
    const answers = personalityAnswers;
    
    // Define personality types
    const personalityTypes = {
        analytical: {
            title: 'الشخصية التحليلية',
            description: 'تميل إلى التفكير المنطقي والتحليلي، تفضل العمل وفق خطط واضحة، وتبحث عن حلول مبتكرة للمشكلات.',
            strengths: ['تفكير منطقي وتحليلي', 'اتخاذ قرارات مدروسة', 'حل المشكلات المعقدة', 'التركيز على التفاصيل'],
            development: ['تحسين المهارات الاجتماعية', 'المرونة في التعامل مع التغيير', 'الاعتماد على الحدس أحيانًا']
        },
        social: {
            title: 'الشخصية الاجتماعية',
            description: 'تمتاز بالتواصل الفعال والقدرة على بناء علاقات قوية، تستمتع بالعمل الجماعي ومساعدة الآخرين.',
            strengths: ['مهارات تواصل ممتازة', 'العمل الجماعي الفعال', 'التعاطف مع الآخرين', 'القيادة الاجتماعية'],
            development: ['تطوير الاستقلالية', 'تحسين مهارات حل المشكلات الفردية', 'التركيز على التفاصيل']
        },
        creative: {
            title: 'الشخصية الإبداعية',
            description: 'تمتلك خيالًا واسعًا وتفكر خارج الصندوق، تبحث دائمًا عن طرق جديدة ومبتكرة لإنجاز المهام.',
            strengths: ['التفكير الإبداعي والمبتكر', 'المرونة والتكيف', 'القدرة على رؤية الفرص', 'الشجاعة في اتخاذ المخاطر'],
            development: ['تنظيم الأفكار والمشاريع', 'التركيز على التفاصيل', 'تحسين المهارات التنظيمية']
        },
        balanced: {
            title: 'الشخصية المتوازنة',
            description: 'تجمع بين التفكير المنطقي والعاطفي، تستطيع التكيف مع مختلف المواقف واتخاذ قرارات متوازنة.',
            strengths: ['التوازن بين المنطق والعاطفة', 'المرونة في التعامل', 'القدرة على التكيف', 'اتخاذ قرارات متوازنة'],
            development: ['تعزيز نقاط القوة الخاصة', 'التركيز على التخصص', 'تطوير المهارات القيادية']
        }
    };
    
    // Simple logic to determine personality type
    const answerString = answers.join(',');
    
    if (answers.includes('analytical') && answers.includes('structured')) {
        return personalityTypes.analytical;
    } else if (answers.includes('social') && answers.includes('collaborative')) {
        return personalityTypes.social;
    } else if (answers.includes('creative') && answers.includes('flexible')) {
        return personalityTypes.creative;
    } else {
        return personalityTypes.balanced;
    }
}

function restartPersonalityTest() {
    currentQuestion = 1;
    personalityAnswers = [];
    
    // Reset button styles
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.style.background = '';
        btn.style.borderColor = '';
    });
    
    showQuestion(1);
}

// Psychology Chart Functionality
function initPsychologyChart() {
    const chartElement = document.getElementById('psychology-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        title: {
            text: 'توزيع مجالات علم النفس',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold',
                color: '#2C3E50'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% <br/>{d}%'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: '#2C3E50'
            }
        },
        series: [
            {
                name: 'مجالات علم النفس',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 25, name: 'العلاج النفسي', itemStyle: { color: '#5DADE2' } },
                    { value: 20, name: 'الصحة النفسية', itemStyle: { color: '#58D68D' } },
                    { value: 18, name: 'علم النفس التنموي', itemStyle: { color: '#F39C12' } },
                    { value: 15, name: 'علم النفس الاجتماعي', itemStyle: { color: '#E74C3C' } },
                    { value: 12, name: 'النظريات المعرفية', itemStyle: { color: '#9B59B6' } },
                    { value: 10, name: 'البحث النفسي', itemStyle: { color: '#34495E' } }
                ]
            }
        ]
    };
    
    chart.setOption(option);
    
    // Make chart responsive
    window.addEventListener('resize', function() {
        chart.resize();
    });
}

// Glossary Functionality
function initGlossary() {
    const searchInput = document.getElementById('glossary-search');
    const resultsDiv = document.getElementById('glossary-results');
    
    // Glossary data
    glossaryData = [
        {
            term: 'الذكاء',
            definition: 'القدرة على التعلم، الفهم، وحل المشكلات بطريقة فعالة',
            category: 'معرفي'
        },
        {
            term: 'الشخصية',
            definition: 'النمط المستقر من السلوك، المشاعر، والأفكار الذي يميز الفرد',
            category: 'فردي'
        },
        {
            term: 'الاكتئاب',
            definition: 'اضطراب مزاجي يتميز بالحزن المستمر وفقدان الاهتمام بالأنشطة',
            category: 'اضطرابات'
        },
        {
            term: 'القلق',
            definition: 'استجابة عاطفية للتهديد أو الضغط، قد يكون طبيعيًا أو مرضيًا',
            category: 'اضطرابات'
        },
        {
            term: 'السلوك',
            definition: 'الأفعال والتصرفات التي يقوم بها الفرد في مواقف مختلفة',
            category: 'سلوكي'
        },
        {
            term: 'الدوافع',
            definition: 'القوى الداخلية التي تحفز السلوك وتوجهه نحو أهداف معينة',
            category: 'سلوكي'
        },
        {
            term: 'الإدراك',
            definition: 'عملية تفسير وتنظيم المعلومات الحسية لفهم العالم المحيط',
            category: 'معرفي'
        },
        {
            term: 'الذاكرة',
            definition: 'القدرة على تخزين المعلومات واسترجاعها عند الحاجة',
            category: 'معرفي'
        },
        {
            term: 'التعلم',
            definition: 'عملية الحصول على معرفة أو مهارات جديدة من خلال الخبرة أو التعليم',
            category: 'معرفي'
        },
        {
            term: 'العلاج النفسي',
            definition: 'معالجة المشكلات النفسية من خلال التحدث والتفاعل مع معالج محترف',
            category: 'علاج'
        },
        {
            term: 'النمو',
            definition: 'التغيرات التدريجية التي تحدث في الفرد عبر مراحل الحياة',
            category: 'تنموي'
        },
        {
            term: 'اللاشعور',
            definition: 'العمليات العقلية التي تحدث خارج الوعي المباشر للفرد',
            category: 'نفسي عميق'
        },
        {
            term: 'الهوية',
            definition: 'الصورة الذاتية للفرد وإحساسه بمن هو وما يمثله',
            category: 'فردي'
        },
        {
            term: 'الضغط النفسي',
            definition: 'استجابة الجسم والعقل للتحديات أو المطالب الخارجية',
            category: 'صحة نفسية'
        },
        {
            term: 'الرفاهية النفسية',
            definition: 'حالة من الصحة النفسية الجيدة والرضا عن الحياة',
            category: 'صحة نفسية'
        }
    ];
    
    if (searchInput && resultsDiv) {
        // Display all terms initially
        displayGlossaryResults(glossaryData);
        
        // Handle search
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query === '') {
                displayGlossaryResults(glossaryData);
            } else {
                const filtered = glossaryData.filter(item => 
                    item.term.toLowerCase().includes(query) || 
                    item.definition.toLowerCase().includes(query)
                );
                displayGlossaryResults(filtered);
            }
        });
    }
}

function displayGlossaryResults(data) {
    const resultsDiv = document.getElementById('glossary-results');
    if (!resultsDiv) return;
    
    resultsDiv.innerHTML = '';
    
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-item p-4 bg-white rounded-lg border border-gray-200 cursor-pointer';
        
        const categoryColor = {
            'معرفي': 'bg-blue-100 text-blue-800',
            'فردي': 'bg-green-100 text-green-800',
            'اضطرابات': 'bg-red-100 text-red-800',
            'سلوكي': 'bg-yellow-100 text-yellow-800',
            'علاج': 'bg-purple-100 text-purple-800',
            'تنموي': 'bg-indigo-100 text-indigo-800',
            'نفسي عميق': 'bg-gray-100 text-gray-800',
            'صحة نفسية': 'bg-pink-100 text-pink-800'
        };
        
        card.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold text-primary-dark">${item.term}</h4>
                <span class="px-2 py-1 rounded-full text-xs ${categoryColor[item.category] || 'bg-gray-100 text-gray-800'}">
                    ${item.category}
                </span>
            </div>
            <p class="text-gray-600 text-sm">${item.definition}</p>
        `;
        
        // Add click event for more details
        card.addEventListener('click', function() {
            showGlossaryDetails(item);
        });
        
        resultsDiv.appendChild(card);
    });
}

function showGlossaryDetails(item) {
    // Create a simple modal or tooltip for detailed information
    alert(`${item.term}\n\n${item.definition}\n\nالتصنيف: ${item.category}`);
}

// Animations
function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe interactive cards
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('bg-white/95');
            }
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Page loaded successfully');
});