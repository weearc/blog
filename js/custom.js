'use strict';
function homeInfoScroll() {
    let card = document.getElementById('home-info-master');
    let listLayout = document.getElementById('list-layout');
    if (window.location.pathname === '/') {
        card.style.margin = '0 20vw 15vh auto';
        listLayout.style.marginTop = '73vh';
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
        listLayout.classList.remove('beforeScrollMaster')
    }
}
homeInfoScroll()
