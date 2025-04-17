//js script for home page
function showSecurity() {
    document.getElementById('security-call').style.display = 'block';
  }
  
  window.onload = function () {
    document.getElementById("confirm-yes").onclick = function () {
      window.location.href = 'tel:+12072080847';
    };
    document.getElementById("confirm-no").onclick = function () {
      document.getElementById('security-call').style.display = 'none';
    };
  };