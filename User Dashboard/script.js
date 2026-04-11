/* ============================================================
   ASA Lost & Found — script.js
   Sections:
   1.  Page Navigation
   2.  Notification Panel
   3.  Profile Dropdown
   4.  Mobile Navigation
   5.  Pickup Location Dropdown
   6.  Report Form — Image Title Preview
   7.  Submit Popup
   8.  Settings — Username Update
   9.  Global Click — Close Dropdowns
============================================================ */


/* ── 1. Page Navigation ───────────────────────────────────── */
let currentPage = 'dashboard';

function showPage(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Remove active state from all nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.mobile-nav a').forEach(a => a.classList.remove('active'));

  // Show selected page
  const el = document.getElementById('page-' + page);
  if (el) {
    el.classList.add('active');
    currentPage = page;
  }

  // Highlight matching nav link
  const navMap = {
    dashboard: 'nav-dashboard',
    lost:      'nav-lost',
    found:     'nav-found',
    post:      'nav-post',
  };
  const mnavMap = {
    dashboard: 'mnav-dashboard',
    lost:      'mnav-lost',
    found:     'mnav-found',
    post:      'mnav-post',
  };

  if (navMap[page])  document.getElementById(navMap[page])?.classList.add('active');
  if (mnavMap[page]) document.getElementById(mnavMap[page])?.classList.add('active');

  closeDropdowns();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ── 2. Notification Panel ────────────────────────────────── */
function toggleNotif(e) {
  e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  const prof  = document.getElementById('profileDropdown');
  prof.classList.remove('open');
  panel.classList.toggle('open');
}

function markAllRead() {
  document.getElementById('notifBadge').style.display = 'none';
  document.querySelectorAll('.notif-item.unread').forEach(i => i.classList.remove('unread'));
  document.querySelectorAll('.notif-dot').forEach(d => d.remove());
}


/* ── 3. Profile Dropdown ──────────────────────────────────── */
function toggleProfile(e) {
  e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  const prof  = document.getElementById('profileDropdown');
  panel.classList.remove('open');
  prof.classList.toggle('open');
}


/* ── 4. Mobile Navigation ─────────────────────────────────── */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}


/* ── 5. Pickup Location Dropdown ──────────────────────────── */
function togglePickup(e) {
  e.stopPropagation();
  const dd      = document.getElementById('pickupDropdown');
  const trigger = document.getElementById('pickupTrigger');
  dd.classList.toggle('open');
  trigger.classList.toggle('open');
}

function selectPickup(el, name, emoji) {
  // Remove active from all options
  document.querySelectorAll('.pickup-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');

  // Update trigger label
  document.getElementById('pickupText').textContent = name;
  document.getElementById('pickupTrigger').classList.add('selected');

  // Close dropdown
  document.getElementById('pickupDropdown').classList.remove('open');
  document.getElementById('pickupTrigger').classList.remove('open');

  // Show location preview
  document.getElementById('locPrevTitle').textContent  = '📍 ' + name;
  document.getElementById('locBuildingEmoji').textContent = emoji;
  document.getElementById('locationPreview').classList.add('show');
}


/* ── 6. Report Form — Image Title Preview ─────────────────── */
function updatePreviewTitle(inputId, previewId) {
  const val = document.getElementById(inputId).value;
  document.getElementById(previewId).textContent = val || 'Item Title';
}


/* ── 7. Submit Popup ──────────────────────────────────────── */
function showPopup(type) {
  const overlay = document.getElementById('popupOverlay');
  const icon    = document.getElementById('popupIcon');
  const title   = document.getElementById('popupTitle');
  const msg     = document.getElementById('popupMessage');

  if (type === 'lost') {
    icon.textContent  = '✓';
    title.textContent = 'Report Lost Item Submitted';
    msg.textContent   = 'Your lost item report has been successfully submitted. The community will help keep an eye out for it!';
  } else {
    icon.textContent  = '✓';
    title.textContent = 'Report Found Item Submitted';
    msg.textContent   = 'Thank you for your kindness! Your found item report has been submitted and the owner will be notified.';
  }

  overlay.classList.add('show');
}

function closePopup(e) {
  if (e.target === document.getElementById('popupOverlay')) closePopupDirect();
}

function closePopupDirect() {
  document.getElementById('popupOverlay').classList.remove('show');
  showPage('dashboard');
}


/* ── 8. Settings — Username Update ───────────────────────── */
function updateUsername(name) {
  const display = name.trim() || 'UserName';
  document.getElementById('navUsername').textContent     = display;
  document.getElementById('welcomeUsername').textContent = display;
  document.getElementById('dropdownName').textContent    = display;
}

function switchSettingsTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.settings-section-tab').forEach(tab => tab.classList.remove('active'));
  // Deactivate all buttons
  document.querySelectorAll('.s-nav-btn').forEach(btn => btn.classList.remove('active'));
  
  // Show selected
  document.getElementById('set-' + tabName).classList.add('active');
  // Highlight clicked button
  event.currentTarget.classList.add('active');
}




/* ── 9. Global Click — Close Dropdowns ───────────────────── */
function closeDropdowns() {
  document.getElementById('notifPanel').classList.remove('open');
  document.getElementById('profileDropdown').classList.remove('open');

  const pd = document.getElementById('pickupDropdown');
  const pt = document.getElementById('pickupTrigger');
  if (pd) pd.classList.remove('open');
  if (pt) pt.classList.remove('open');
}

/* ── Item Details Modal Logic ── */
function openItemDetails(type, title, desc, date, loc, img) {
    const modal = document.getElementById('itemModal');
    const badge = document.getElementById('modalTypeBadge');
    
    // Set content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent  = desc;
    document.getElementById('modalDate').textContent  = date;
    document.getElementById('modalLoc').textContent   = loc;
    document.getElementById('modalImg').src           = img;
    
    // UI logic based on Lost vs Found
    if (type === 'found') {
        badge.textContent = 'FOUND';
        badge.className = 'badge badge-found';
        document.getElementById('pickupInfoSection').style.display = 'block';
        document.getElementById('claimBtn').style.display = 'block';
    } else {
        badge.textContent = 'LOST';
        badge.className = 'badge badge-lost';
        document.getElementById('pickupInfoSection').style.display = 'none';
        document.getElementById('claimBtn').style.display = 'none'; // Only found items can be claimed
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeItemModal() {
    document.getElementById('itemModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

/* ── Claim Form Logic ── */
function openClaimForm() {
    document.getElementById('claimFormPopup').classList.add('show');
}

function closeClaimForm() {
    document.getElementById('claimFormPopup').classList.remove('show');
}

function submitClaim() {
    const evidence = document.getElementById('claimEvidence').value;
    if(!evidence) {
        alert("Please provide some evidence of ownership.");
        return;
    }
    
    // Close form and show success
    closeClaimForm();
    closeItemModal();
    
    // Use your existing popup logic for success
    const overlay = document.getElementById('popupOverlay');
    document.getElementById('popupTitle').textContent = 'Claim Request Sent!';
    document.getElementById('popupMessage').textContent = 'Your Submitted successfully. Kindly wait for further updates from the admin.';
    overlay.classList.add('show');
}

document.addEventListener('click', closeDropdowns);


