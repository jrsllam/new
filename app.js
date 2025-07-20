// لعبة الأفلام - التطبيق الرئيسي
class MovieGame {
    constructor() {
        this.films = ["العزيمة","الأرض","المومياء","باب الحديد","الحرام","شباب امرأة","بداية ونهاية","سواق الأتوبيس","غزل البنات","الفتوة","الناصر صلاح الدين","البوسطجي","رد قلبي","دعاء الكروان","اللص والكلاب","الزوجة الثانية","أم العروسة","القاهرة 30","شيء من الخوف","الطوق والإسورة","أريد حلاً","لاشين","في بيتنا رجل","الكيت كات","صراع في الوادي","جعلوني مجرماً","ريا وسكينة","البريء","ميرامار","حياة أو موت","الكرنك","زائر الفجر","النائب العام","درب المهابيل","ليل وقضبان","إحنا التلامذة","العصفور","على من نطلق الرصاص","لك يوم يا ظالم","ثرثرة فوق النيل","صراع الأبطال","أين عمري","رجوع الابن الضال","المهاجر","الاختيار","جميلة","ليه يا بنفسج","العار","خرج ولم يعد","بين السماء والأرض","غروب وشروق","للحب قصة أخيرة","أمير الانتقام","المستحيل","قنديل أم هاشم","المذنبون","رصاصة في القلب","أغنية على الممر","المراهقات","الحب فوق هضبة الهرم","يوميات نائب في الأرياف","الوحش","سوبر ماركت","امرأة في الطريق","بين الأطلال","أولاد الصمت","الصعود إلى الهاوية","سلامة في خير","الأيدي الناعمة","المتمردون","خلي بالك من زوزو","الأفوكاتو","سي عمر","ابن النيل","أيامنا الحلوة","حدوتة مصرية","زينب","صراع في النيل","وا إسلاماه","أبي فوق الشجرة","إمبراطورية ميم","اللعب مع الكبار","غرام وانتقام","البيت رقم 13","الخطايا","السمان والخريف","بين القصرين","أنا حرة","الرجل الذي فقد ظله","دنانير","الزوجة 13","إسماعيلية رايح جاي","صعيدي في الجامعة الأمريكية","همام في أمستردام","جاءنا البيان التالي","عسكر في المعسكر","الناظر","جعلتني مجرماً","كده رضا","عسل إسود","ألف مبروك","مطب صناعي","ظرف طارق","ميدو مشاكل","زكي شان","بلية ودماغه العالية","الفيل الأزرق","الفيل الأزرق 2","الجزيرة","الجزيرة 2","الكنز","الكنز 2","الفرح","ولاد رزق","ولاد رزق 2","هروب اضطراري","إبراهيم الأبيض","تراب الماس","حرب كرموز","وقفة رجالة","طير إنت","سمير وشهير وبهير","قلب جريء","الإرهاب والكباب","السفارة في العمارة","طيور الظلام","عصابة حمادة وتوتو","شمس الزناتي","عريس من جهة أمنية","مرجان أحمد مرجان","أمير البحار","رمضان مبروك أبو العلمين حمودة","عمر وسلمى","عمر وسلمى 2","عمر وسلمى 3","النمر والأنثى","حب في الزنزانة","الهروب","إشاعة حب","حنفي الأبهة","الباشا تلميذ","حريم كريم","حاحا وتفاحة","عندليب الدقي","يا أنا يا خالتي","تيتة رهيبة","ريش","ستاشر","سيكو سيكو","أحمد وأحمد","ريستارت","الحريفة","الهنا اللي أنا فيه","المشروع إكس","الدشاش","في عز الضهر","ستة أيام","200 جنيه","يوم وليلة","البعض لا يذهب للمأذون مرتين","أبو نسب","عروستي","موسى","كيره والجن","قمر 14","أصحاب ولا أعز","خطة بديلة","حسن ومرقص","التجربة الدنماركية"];
        
        this.gameState = {
            mode: 'teams',
            teams: [
                { name: '', films: [], passwordHash: null },
                { name: '', films: [], passwordHash: null }
            ],
            config: {
                roundDuration: 2,
                totalRounds: 5
            },
            currentTeam: 0,
            scores: [0, 0],
            currentRound: 1,
            isPlaying: false,
            currentFilm: '',
            usedFilms: new Set(),
            timer: null,
            timeLeft: 0
        };
        
        this.currentEditingTeam = null;
        this.init();
    }
    
    init() {
        // انتظار DOM إذا لم يحمل بعد
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }
    
    setupApplication() {
        this.initializeElements();
        this.bindEvents();
        this.loadTeamFromStorage(0);
        this.loadTeamFromStorage(1);
        this.updateTeamNamesDisplay();
        this.showScreen('start-screen');
    }
    
    initializeElements() {
        this.elements = {};
        
        // البحث عن العناصر مع معالجة الأخطاء
        const elementIds = [
            'start-screen', 'mode-screen', 'team-setup-screen', 'config-screen', 'game-screen', 'result-screen',
            'btn-start', 'btn-mode-teams', 'btn-mode-random', 'team1-edit', 'team2-edit', 'to-config', 'start-match',
            'btn-start-turn', 'btn-correct', 'btn-skip', 'btn-restart', 'back-to-start-1', 'back-to-mode', 'back-to-team-setup',
            'team1-name', 'team2-name', 'round-duration', 'round-count', 'team1-score', 'team2-score',
            'current-team-label', 'film-title', 'timer-display', 'password-modal', 'film-modal',
            'password-modal-title', 'password-input', 'password-submit', 'password-cancel',
            'film-textarea', 'film-save', 'film-cancel', 'result-title', 'result-details'
        ];
        
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                this.elements[id.replace(/-/g, '_')] = element;
            } else {
                console.warn(`Element not found: ${id}`);
            }
        });
    }
    
    bindEvents() {
        this.bindMainNavigation();
        this.bindTeamActions();
        this.bindGameActions();
        this.bindModalActions();
        this.bindFormInputs();
    }
    
    bindMainNavigation() {
        // زر البداية
        if (this.elements.btn_start) {
            this.elements.btn_start.addEventListener('click', () => {
                this.showScreen('mode-screen');
            });
        }
        
        // أزرار اختيار الوضع
        if (this.elements.btn_mode_teams) {
            this.elements.btn_mode_teams.addEventListener('click', () => {
                this.selectMode('teams');
            });
        }
        
        if (this.elements.btn_mode_random) {
            this.elements.btn_mode_random.addEventListener('click', () => {
                this.selectMode('random');
            });
        }
        
        // أزرار الرجوع
        if (this.elements.back_to_start_1) {
            this.elements.back_to_start_1.addEventListener('click', () => {
                this.showScreen('start-screen');
            });
        }
        
        if (this.elements.back_to_mode) {
            this.elements.back_to_mode.addEventListener('click', () => {
                this.showScreen('mode-screen');
            });
        }
        
        if (this.elements.back_to_team_setup) {
            this.elements.back_to_team_setup.addEventListener('click', () => {
                this.showScreen('team-setup-screen');
            });
        }
    }
    
    bindTeamActions() {
        // تحرير قوائم الأفلام
        if (this.elements.team1_edit) {
            this.elements.team1_edit.addEventListener('click', () => {
                this.editTeamFilms(0);
            });
        }
        
        if (this.elements.team2_edit) {
            this.elements.team2_edit.addEventListener('click', () => {
                this.editTeamFilms(1);
            });
        }
        
        // الانتقال للإعدادات
        if (this.elements.to_config) {
            this.elements.to_config.addEventListener('click', () => {
                this.goToConfig();
            });
        }
        
        // بدء المباراة
        if (this.elements.start_match) {
            this.elements.start_match.addEventListener('click', () => {
                this.startMatch();
            });
        }
    }
    
    bindGameActions() {
        // أزرار اللعب
        if (this.elements.btn_start_turn) {
            this.elements.btn_start_turn.addEventListener('click', () => {
                this.startTurn();
            });
        }
        
        if (this.elements.btn_correct) {
            this.elements.btn_correct.addEventListener('click', () => {
                this.answerCorrect();
            });
        }
        
        if (this.elements.btn_skip) {
            this.elements.btn_skip.addEventListener('click', () => {
                this.skipAnswer();
            });
        }
        
        if (this.elements.btn_restart) {
            this.elements.btn_restart.addEventListener('click', () => {
                this.restart();
            });
        }
    }
    
    bindModalActions() {
        // أزرار كلمة السر
        if (this.elements.password_submit) {
            this.elements.password_submit.addEventListener('click', () => {
                this.submitPassword();
            });
        }
        
        if (this.elements.password_cancel) {
            this.elements.password_cancel.addEventListener('click', () => {
                this.closeModal('password');
            });
        }
        
        // أزرار تحرير الأفلام
        if (this.elements.film_save) {
            this.elements.film_save.addEventListener('click', () => {
                this.saveFilms();
            });
        }
        
        if (this.elements.film_cancel) {
            this.elements.film_cancel.addEventListener('click', () => {
                this.closeModal('film');
            });
        }
        
        // Enter للكلمة السر
        if (this.elements.password_input) {
            this.elements.password_input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitPassword();
                }
            });
        }
        
        // إغلاق النوافذ عند النقر خارجها
        if (this.elements.password_modal) {
            this.elements.password_modal.addEventListener('click', (e) => {
                if (e.target === this.elements.password_modal) {
                    this.closeModal('password');
                }
            });
        }
        
        if (this.elements.film_modal) {
            this.elements.film_modal.addEventListener('click', (e) => {
                if (e.target === this.elements.film_modal) {
                    this.closeModal('film');
                }
            });
        }
    }
    
    bindFormInputs() {
        // تحديث أسماء الفرق
        if (this.elements.team1_name) {
            this.elements.team1_name.addEventListener('input', (e) => {
                this.gameState.teams[0].name = e.target.value;
            });
        }
        
        if (this.elements.team2_name) {
            this.elements.team2_name.addEventListener('input', (e) => {
                this.gameState.teams[1].name = e.target.value;
            });
        }
    }
    
    showScreen(screenId) {
        // إخفاء كل الشاشات
        const screens = [
            'start_screen', 'mode_screen', 'team_setup_screen', 
            'config_screen', 'game_screen', 'result_screen'
        ];
        
        screens.forEach(screen => {
            if (this.elements[screen]) {
                this.elements[screen].classList.add('hidden');
            }
        });
        
        // إظهار الشاشة المطلوبة
        const targetScreen = screenId.replace(/-/g, '_');
        if (this.elements[targetScreen]) {
            this.elements[targetScreen].classList.remove('hidden');
        }
    }
    
    selectMode(mode) {
        this.gameState.mode = mode;
        
        if (mode === 'teams') {
            this.showScreen('team-setup-screen');
        } else {
            this.shuffleArray(this.films);
            this.showScreen('config-screen');
        }
    }
    
    updateTeamNamesDisplay() {
        if (this.elements.team1_name) {
            this.elements.team1_name.value = this.gameState.teams[0].name;
        }
        if (this.elements.team2_name) {
            this.elements.team2_name.value = this.gameState.teams[1].name;
        }
    }
    
    async editTeamFilms(teamIndex) {
        this.currentEditingTeam = teamIndex;
        const team = this.gameState.teams[teamIndex];
        
        if (team.passwordHash) {
            if (this.elements.password_modal_title) {
                this.elements.password_modal_title.textContent = 'أدخل كلمة السر';
            }
        } else {
            if (this.elements.password_modal_title) {
                this.elements.password_modal_title.textContent = 'إنشاء كلمة سر جديدة';
            }
        }
        
        if (this.elements.password_input) {
            this.elements.password_input.value = '';
        }
        
        this.showModal('password');
    }
    
    async submitPassword() {
        if (!this.elements.password_input) return;
        
        const password = this.elements.password_input.value.trim();
        if (!password) {
            alert('يرجى إدخال كلمة السر');
            return;
        }
        
        const team = this.gameState.teams[this.currentEditingTeam];
        const hashedPassword = await this.hashPassword(password);
        
        if (!team.passwordHash) {
            team.passwordHash = hashedPassword;
            this.saveTeamToStorage(this.currentEditingTeam);
            this.closeModal('password');
            this.openFilmEditor();
        } else {
            if (hashedPassword === team.passwordHash) {
                this.closeModal('password');
                this.openFilmEditor();
            } else {
                alert('كلمة السر غير صحيحة');
                this.elements.password_input.value = '';
                this.elements.password_input.focus();
            }
        }
    }
    
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    openFilmEditor() {
        const team = this.gameState.teams[this.currentEditingTeam];
        if (this.elements.film_textarea) {
            this.elements.film_textarea.value = team.films.join('\n');
            this.elements.film_textarea.placeholder = 'أدخل عناوين الأفلام، كل سطر فيلم واحد\n\nمثال:\nالأرض\nالعزيمة\nباب الحديد';
        }
        this.showModal('film');
    }
    
    saveFilms() {
        if (!this.elements.film_textarea) return;
        
        const filmsText = this.elements.film_textarea.value;
        const films = filmsText.split('\n')
            .map(film => film.trim())
            .filter(film => film.length > 0);
        
        this.gameState.teams[this.currentEditingTeam].films = films;
        this.saveTeamToStorage(this.currentEditingTeam);
        this.closeModal('film');
        
        alert(`تم حفظ ${films.length} فيلم للفريق`);
    }
    
    saveTeamToStorage(teamIndex) {
        const team = this.gameState.teams[teamIndex];
        const key = `team${teamIndex + 1}`;
        try {
            localStorage.setItem(key, JSON.stringify({
                name: team.name,
                films: team.films,
                passwordHash: team.passwordHash
            }));
        } catch (e) {
            console.warn(`Error saving team ${teamIndex + 1}:`, e);
        }
    }
    
    loadTeamFromStorage(teamIndex) {
        const key = `team${teamIndex + 1}`;
        try {
            const data = localStorage.getItem(key);
            if (data) {
                const teamData = JSON.parse(data);
                this.gameState.teams[teamIndex] = {
                    name: teamData.name || '',
                    films: teamData.films || [],
                    passwordHash: teamData.passwordHash || null
                };
            }
        } catch (e) {
            console.warn(`Error loading team ${teamIndex + 1}:`, e);
        }
    }
    
    goToConfig() {
        if (this.gameState.mode === 'teams') {
            const team1 = this.gameState.teams[0];
            const team2 = this.gameState.teams[1];
            
            if (!team1.name.trim() || !team2.name.trim()) {
                alert('يرجى إدخال أسماء الفريقين');
                return;
            }
            
            if (team1.films.length === 0 || team2.films.length === 0) {
                alert('يرجى إضافة أفلام لكلا الفريقين');
                return;
            }
        }
        
        this.showScreen('config-screen');
    }
    
    startMatch() {
        if (this.elements.round_duration) {
            this.gameState.config.roundDuration = parseInt(this.elements.round_duration.value);
        }
        if (this.elements.round_count) {
            this.gameState.config.totalRounds = parseInt(this.elements.round_count.value);
        }
        
        this.gameState.scores = [0, 0];
        this.gameState.currentRound = 1;
        this.gameState.currentTeam = 0;
        this.gameState.usedFilms.clear();
        
        if (this.gameState.mode === 'random') {
            this.shuffleArray(this.films);
        } else {
            this.gameState.teams.forEach(team => {
                this.shuffleArray(team.films);
            });
        }
        
        this.updateGameDisplay();
        this.showScreen('game-screen');
        this.getNextFilm();
    }
    
    startTurn() {
        this.gameState.isPlaying = true;
        this.gameState.timeLeft = this.gameState.config.roundDuration * 60;
        
        if (this.elements.btn_start_turn) this.elements.btn_start_turn.classList.add('hidden');
        if (this.elements.btn_correct) this.elements.btn_correct.classList.remove('hidden');
        if (this.elements.btn_skip) this.elements.btn_skip.classList.remove('hidden');
        
        this.startTimer();
    }
    
    startTimer() {
        this.updateTimerDisplay();
        
        this.gameState.timer = setInterval(() => {
            this.gameState.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.gameState.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        if (!this.elements.timer_display) return;
        
        const minutes = Math.floor(this.gameState.timeLeft / 60);
        const seconds = this.gameState.timeLeft % 60;
        this.elements.timer_display.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    answerCorrect() {
        this.gameState.scores[this.gameState.currentTeam]++;
        this.endTurn();
    }
    
    skipAnswer() {
        this.endTurn();
    }
    
    timeUp() {
        this.endTurn();
    }
    
    endTurn() {
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            this.gameState.timer = null;
        }
        
        this.gameState.isPlaying = false;
        this.gameState.currentTeam = 1 - this.gameState.currentTeam;
        
        if (this.elements.btn_start_turn) this.elements.btn_start_turn.classList.remove('hidden');
        if (this.elements.btn_correct) this.elements.btn_correct.classList.add('hidden');
        if (this.elements.btn_skip) this.elements.btn_skip.classList.add('hidden');
        
        if (this.gameState.currentTeam === 0) {
            this.gameState.currentRound++;
        }
        
        if (this.gameState.currentRound > this.gameState.config.totalRounds) {
            this.endGame();
        } else {
            this.getNextFilm();
            this.updateGameDisplay();
        }
    }
    
    getNextFilm() {
        let film = '';
        
        if (this.gameState.mode === 'random') {
            const availableFilms = this.films.filter(f => !this.gameState.usedFilms.has(f));
            if (availableFilms.length === 0) {
                this.gameState.usedFilms.clear();
                this.shuffleArray(this.films);
            }
            
            const unusedFilms = this.films.filter(f => !this.gameState.usedFilms.has(f));
            film = unusedFilms[0] || 'لا توجد أفلام متاحة';
        } else {
            const oppositeTeam = 1 - this.gameState.currentTeam;
            const teamFilms = this.gameState.teams[oppositeTeam].films;
            const availableFilms = teamFilms.filter(f => !this.gameState.usedFilms.has(f));
            
            if (availableFilms.length === 0) {
                teamFilms.forEach(f => this.gameState.usedFilms.delete(f));
                this.shuffleArray(teamFilms);
            }
            
            const unusedFilms = teamFilms.filter(f => !this.gameState.usedFilms.has(f));
            film = unusedFilms[0] || 'لا توجد أفلام متاحة';
        }
        
        this.gameState.currentFilm = film;
        this.gameState.usedFilms.add(film);
        
        if (this.elements.film_title) {
            this.elements.film_title.textContent = film;
        }
    }
    
    updateGameDisplay() {
        const team1Name = this.gameState.teams[0].name || 'الفريق الأول';
        const team2Name = this.gameState.teams[1].name || 'الفريق الثاني';
        
        if (this.elements.team1_score) {
            this.elements.team1_score.textContent = `${team1Name}: ${this.gameState.scores[0]}`;
        }
        if (this.elements.team2_score) {
            this.elements.team2_score.textContent = `${team2Name}: ${this.gameState.scores[1]}`;
        }
        
        const currentTeamName = this.gameState.teams[this.gameState.currentTeam].name || 
                               `الفريق ${this.gameState.currentTeam + 1}`;
        if (this.elements.current_team_label) {
            this.elements.current_team_label.textContent = `دور: ${currentTeamName}`;
        }
        
        if (this.elements.timer_display) {
            this.elements.timer_display.textContent = '00:00';
        }
    }
    
    endGame() {
        const team1Name = this.gameState.teams[0].name || 'الفريق الأول';
        const team2Name = this.gameState.teams[1].name || 'الفريق الثاني';
        const score1 = this.gameState.scores[0];
        const score2 = this.gameState.scores[1];
        
        let resultTitle = '';
        if (score1 > score2) {
            resultTitle = `🎉 فاز ${team1Name}!`;
        } else if (score2 > score1) {
            resultTitle = `🎉 فاز ${team2Name}!`;
        } else {
            resultTitle = '🤝 تعادل!';
        }
        
        if (this.elements.result_title) {
            this.elements.result_title.textContent = resultTitle;
        }
        if (this.elements.result_details) {
            this.elements.result_details.innerHTML = `
                <div class="status status--info">${team1Name}: ${score1} نقطة</div>
                <div class="status status--info">${team2Name}: ${score2} نقطة</div>
                <div class="status status--success">عدد الجولات: ${this.gameState.config.totalRounds}</div>
            `;
        }
        
        this.showScreen('result-screen');
    }
    
    restart() {
        this.gameState.scores = [0, 0];
        this.gameState.currentRound = 1;
        this.gameState.currentTeam = 0;
        this.gameState.isPlaying = false;
        this.gameState.usedFilms.clear();
        
        if (this.gameState.timer) {
            clearInterval(this.gameState.timer);
            this.gameState.timer = null;
        }
        
        this.loadTeamFromStorage(0);
        this.loadTeamFromStorage(1);
        this.updateTeamNamesDisplay();
        
        this.showScreen('start-screen');
    }
    
    showModal(modalName) {
        const modalMap = {
            'password': this.elements.password_modal,
            'film': this.elements.film_modal
        };
        
        const modal = modalMap[modalName];
        if (modal) {
            modal.classList.remove('hidden');
            
            setTimeout(() => {
                if (modalName === 'password' && this.elements.password_input) {
                    this.elements.password_input.focus();
                } else if (modalName === 'film' && this.elements.film_textarea) {
                    this.elements.film_textarea.focus();
                }
            }, 100);
        }
    }
    
    closeModal(modalName) {
        const modalMap = {
            'password': this.elements.password_modal,
            'film': this.elements.film_modal
        };
        
        const modal = modalMap[modalName];
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// تهيئة التطبيق
new MovieGame();