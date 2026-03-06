/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. INITIALIZE LUCIDE ICONS ---
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- 2. BECOME A MEMBER FORM LOGIC ---
  const programSelect = document.getElementById('program');
  
  if (programSelect) {
    const ratesContainer = document.getElementById('dynamic-rates-container');
    const ratesAdults = document.getElementById('rates-adults');
    const ratesKids = document.getElementById('rates-kids');
    const ratesNdis = document.getElementById('rates-ndis');

    programSelect.addEventListener('change', function() {
      ratesContainer.classList.remove('hidden');
      
      ratesAdults.classList.add('hidden');
      ratesKids.classList.add('hidden');
      ratesNdis.classList.add('hidden');

      if (this.value === 'adults') {
        ratesAdults.classList.remove('hidden');
      } else if (this.value === 'kids') {
        ratesKids.classList.remove('hidden');
      } else if (this.value === 'ndis') {
        ratesNdis.classList.remove('hidden');
      }
    });
  }

  // --- 3. TRIAL CLASS FORM LOGIC ---
  const residentRadios = document.querySelectorAll('.resident-radio');
  
  if (residentRadios.length > 0) {
    const warningMessage = document.getElementById('non-resident-warning');
    const extendedForm = document.getElementById('extended-form');
    const formInputs = extendedForm.querySelectorAll('input, select, button');
    
    formInputs.forEach(input => input.disabled = true);

    residentRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'yes') {
          warningMessage.classList.add('hidden');
          extendedForm.classList.remove('hidden');
          formInputs.forEach(input => input.disabled = false);
        } else {
          warningMessage.classList.remove('hidden');
          extendedForm.classList.add('hidden');
          formInputs.forEach(input => input.disabled = true);
        }
      });
    });
  }

  // --- 4. SCHEDULE TOGGLE LOGIC ---
  const btnList = document.getElementById('btn-list-view');
  const btnGrid = document.getElementById('btn-grid-view');
  const viewList = document.getElementById('view-list');
  const viewGrid = document.getElementById('view-grid');

  if (btnList && btnGrid && viewList && viewGrid) {
    function setActiveButton(activeBtn, inactiveBtn) {
      activeBtn.classList.add('bg-black', 'text-white', 'shadow');
      activeBtn.classList.remove('text-gray-500', 'hover:text-black');
      
      inactiveBtn.classList.remove('bg-black', 'text-white', 'shadow');
      inactiveBtn.classList.add('text-gray-500', 'hover:text-black');
    }

    btnList.addEventListener('click', () => {
      viewList.classList.remove('hidden');
      viewList.classList.add('block');
      viewGrid.classList.remove('block');
      viewGrid.classList.add('hidden');
      setActiveButton(btnList, btnGrid);
    });

    btnGrid.addEventListener('click', () => {
      viewGrid.classList.remove('hidden');
      viewGrid.classList.add('block');
      viewList.classList.remove('block');
      viewList.classList.add('hidden');
      setActiveButton(btnGrid, btnList);
    });
  }

  // --- 5. LAZY LOAD & PAUSE VIDEOS ---
  const lazyVideos = document.querySelectorAll('.lazy-video');

  if (lazyVideos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
          // Check if we need to swap the data-src to src
          const source = video.querySelector('source');
          if (source && source.hasAttribute('data-src')) {
            source.src = source.getAttribute('data-src');
            source.removeAttribute('data-src');
            video.load(); 
          }
          
          // Play safely to avoid browser console errors
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Autoplay prevented by browser power settings.");
            });
          }
        } else {
          // Pause when scrolled out of view
          video.pause();
        }
      });
    }, {
      threshold: 0.01 // Triggers as soon as 1% of the video is visible
    });

    lazyVideos.forEach(video => {
      videoObserver.observe(video);
    });
  }

});