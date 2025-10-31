/* ===== PENJELASAN FUNGSI =====
1.  showMenu: Menampilkan/menyembunyikan menu mobile saat ikon hamburger diklik.
2.  navLinkClick: Menutup menu mobile saat salah satu link navigasi diklik.
3.  scrollActive: Menandai link navigasi yang aktif (active-link) berdasarkan bagian (section) mana yang sedang terlihat di layar.
4.  scrollFadeIn: Menerapkan animasi fade-in pada elemen saat di-scroll ke dalam pandangan.
*/

/* ===== 1. TAMPILKAN MENU MOBILE ===== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.querySelectorAll('.nav__link'); // Menggunakan semua link sebagai penutup

if (navToggle) {
    navToggle.addEventListener('click', () => {
        // Tambah/hapus class 'show-menu' pada nav__menu
        navMenu.classList.toggle('show-menu');
    });
}

/* ===== 2. TUTUP MENU SAAT LINK DIKLIK ===== */
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navClose.forEach(n => n.addEventListener('click', linkAction));


/* ===== 3. ACTIVE LINK SAAT SCROLL ===== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px = offset sedikit di atas section
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                navLink.classList.add('active-link');
            }
        } else {
            if (navLink) {
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* ===== 4. ANIMASI FADE-IN SAAT SCROLL (Intersection Observer) ===== */
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1, // Muncul saat 10% elemen terlihat
    rootMargin: "0px 0px -50px 0px" // Sedikit offset
};

const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('visible'); // Tambah class 'visible'
            appearOnScroll.unobserve(entry.target); // Hentikan observasi setelah animasi
        }
    });
},
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});