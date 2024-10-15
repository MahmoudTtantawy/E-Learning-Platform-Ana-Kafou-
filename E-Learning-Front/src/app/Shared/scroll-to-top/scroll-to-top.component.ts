import { Component, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css'],
})
export class ScrollToTopComponent implements AfterViewInit {
  ngAfterViewInit() {
    const scrollTopBtn = document.querySelector<HTMLElement>('.js-scroll-top');
    
    if (scrollTopBtn) {
      scrollTopBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const progressPath = document.querySelector<SVGPathElement>('.scroll-top path');
      
      if (progressPath) {
        const pathLength = progressPath.getTotalLength();
        progressPath.style.transition = 'none';
        progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
        progressPath.style.strokeDashoffset = pathLength.toString();

        const updateProgress = () => {
          const scroll = window.scrollY || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress.toString();
        };

        updateProgress();
        const offset = 100;

        window.addEventListener('scroll', () => {
          updateProgress();

          const scrollPos = window.scrollY || document.documentElement.scrollTop;
          if (scrollPos > offset) {
            scrollTopBtn.classList.add('is-active');
          } else {
            scrollTopBtn.classList.remove('is-active');
          }
        });
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
