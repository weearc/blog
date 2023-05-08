'use strict';
function homeInfoScroll() {
    let card = document.getElementById('home-info-master');
    let listLayout = document.getElementById('list-layout');
    if (window.location.pathname === '/' && window.innerWidth > 721) {
        card.style.margin = '0 20vw 15vh auto';
        listLayout.style.marginTop = '80vh';
        listLayout.style.overflow = 'visible';
        window.addEventListener('scroll' ,() => {
            const scroll_y = window.scrollY || window.pageYOffset;
            const threshold = window.innerHeight * 0.15;
            if (scroll_y > threshold) {
                card.classList.remove('beforeScroll')
                listLayout.classList.remove('beforeScrollMaster')
                card.style.margin = 'var(--gap)0 calc(var(--gap) * 2)';
            } else {
                card.classList.add('beforeScroll')
                listLayout.classList.add('beforeScrollMaster')
                card.style.margin = '0 20vw 15vh auto';
            }
        })
    }
    else {
        listLayout.style.transition = 'none'
        listLayout.style.marginTop = '20vh'
        listLayout.classList.remove('beforeScrollMaster')
        card.classList.remove('beforeScroll')
    }
}
function navBackground() {
    const nav = document.getElementById('navBar')
    window.addEventListener('scroll', () => {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPercentage < 0.2) {
            nav.style.backgroundColor = 'rgb(255,255,255,0)';
            nav.style['backdrop-filter'] = 'none'
            nav.style['border-shadow'] = 'none'
        } else {
            nav.style.backgroundColor = 'rgba(255,255,255,0.5)';
            nav.style['backdrop-filter'] = 'blur(25px) saturate(200%)'
            nav.style['border-shadow'] = '0 0 5px rgba(0, 0, 0, 0.5)'
        }
    });
}
navBackground()
homeInfoScroll()
