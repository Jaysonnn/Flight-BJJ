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

});