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
      // Show the main container
      ratesContainer.classList.remove('hidden');
      
      // Hide all individual rate sections first
      ratesAdults.classList.add('hidden');
      ratesKids.classList.add('hidden');
      ratesNdis.classList.add('hidden');

      // Show the specific rate section based on selection
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
  
  // Safety check: Only run if the radio buttons exist on the page
  if (residentRadios.length > 0) {
    const warningMessage = document.getElementById('non-resident-warning');
    const extendedForm = document.getElementById('extended-form');
    const formInputs = extendedForm.querySelectorAll('input, select, button');
    
    // Disable form inputs by default until residency is confirmed
    formInputs.forEach(input => input.disabled = true);

    residentRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'yes') {
          // They are a resident: Show form, hide warning, enable inputs
          warningMessage.classList.add('hidden');
          extendedForm.classList.remove('hidden');
          formInputs.forEach(input => input.disabled = false);
        } else {
          // They are NOT a resident: Show warning, hide form, disable inputs
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

  // Safety check: Only run if the schedule elements exist on the page
  if (btnList && btnGrid && viewList && viewGrid) {
    function setActiveButton(activeBtn, inactiveBtn) {
      // Style active button
      activeBtn.classList.add('bg-black', 'text-white', 'shadow');
      activeBtn.classList.remove('text-gray-500', 'hover:text-black');
      
      // Style inactive button
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

});
