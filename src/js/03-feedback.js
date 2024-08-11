import throttle from 'lodash.throttle';

// Selectăm formularul și câmpurile de input din DOM
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Cheia folosită pentru stocarea datelor în localStorage
const STORAGE_KEY = 'feedback-form-state';

// Funcție pentru a încărca datele salvate din localStorage
const loadFormData = () => {
    // Obținem datele salvate, dacă există
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        // Parsăm datele din format JSON
        const parsedData = JSON.parse(savedData);
        // Completăm câmpurile formularului cu datele salvate
        emailInput.value = parsedData.email || '';
        messageInput.value = parsedData.message || '';
    }
};

// Funcție pentru a salva datele formularului în localStorage
const saveFormData = throttle(() => {
    // Creăm un obiect cu datele curente din formular
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    // Salvăm datele în localStorage în format JSON
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500); // Folosim throttle pentru a salva datele la fiecare 500ms

// Funcție pentru a gestiona trimiterea formularului
const handleSubmit = (event) => {
    // Prevenim comportamentul default al formularului (reîncărcarea paginii)
    event.preventDefault();

    // Creăm un obiect cu datele curente din formular și îl afișăm în consolă
    const formData = {
        email: emailInput.value,
        message: messageInput.value,
    };
    console.log('Formular trimis:', formData);

    // Ștergem datele din localStorage și resetăm câmpurile formularului
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
};

// Adăugăm listeneri pentru evenimentele de input și submit
form.addEventListener('input', saveFormData); // Salvează datele când utilizatorul scrie ceva
form.addEventListener('submit', handleSubmit); // Gestionează trimiterea formularului

// La încărcarea paginii, completăm formularul cu datele salvate, dacă există
loadFormData();
