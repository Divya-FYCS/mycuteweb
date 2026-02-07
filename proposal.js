(function () {
    var yesBtn = document.getElementById('yesBtn');
    var noBtn = document.getElementById('noBtn');
    var frame = document.getElementById('buttonsFrame');

    if (!noBtn || !yesBtn) return;

    // Adaptive distance based on screen size
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var MOVE_DISTANCE_CM = isMobile ? 5 : 10;
    var MOVE_DISTANCE_PX = MOVE_DISTANCE_CM * 37.8;

    function moveNoAway(clientX, clientY) {
        var noRect = noBtn.getBoundingClientRect();
        var noCenterX = noRect.left + noRect.width / 2;
        var noCenterY = noRect.top + noRect.height / 2;

        var dx = clientX - noCenterX;
        var dy = clientY - noCenterY;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1) return;

        // Move away from cursor, in the direction away from cursor
        var angle = Math.atan2(dy, dx);
        var newCenterX = noCenterX + Math.cos(angle) * MOVE_DISTANCE_PX;
        var newCenterY = noCenterY + Math.sin(angle) * MOVE_DISTANCE_PX;

        // Keep button within viewport
        var margin = 20;
        var minX = noRect.width / 2 + margin;
        var maxX = window.innerWidth - noRect.width / 2 - margin;
        var minY = noRect.height / 2 + margin;
        var maxY = window.innerHeight - noRect.height / 2 - margin;

        newCenterX = Math.max(minX, Math.min(maxX, newCenterX));
        newCenterY = Math.max(minY, Math.min(maxY, newCenterY));

        // position: fixed uses viewport coordinates (top-left of button)
        noBtn.style.transform = 'none';
        noBtn.style.left = (newCenterX - noRect.width / 2) + 'px';
        noBtn.style.top = (newCenterY - noRect.height / 2) + 'px';
    }

    var CURSOR_NEAR_PX = isMobile ? 80 : 120;

    function onMouseMove(e) {
        var noRect = noBtn.getBoundingClientRect();
        var mx = e.clientX;
        var my = e.clientY;
        var centerX = noRect.left + noRect.width / 2;
        var centerY = noRect.top + noRect.height / 2;
        var dist = Math.sqrt((mx - centerX) * (mx - centerX) + (my - centerY) * (my - centerY));

        if (dist < CURSOR_NEAR_PX) {
            moveNoAway(mx, my);
        }
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            var touch = e.touches[0];
            var noRect = noBtn.getBoundingClientRect();
            var centerX = noRect.left + noRect.width / 2;
            var centerY = noRect.top + noRect.height / 2;
            var dist = Math.sqrt((touch.clientX - centerX) * (touch.clientX - centerX) + (touch.clientY - centerY) * (touch.clientY - centerY));

            if (dist < CURSOR_NEAR_PX) {
                e.preventDefault();
                moveNoAway(touch.clientX, touch.clientY);
            }
        }
    }

    function onTouchStart(e) {
        if (e.touches.length > 0) {
            var touch = e.touches[0];
            moveNoAway(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    }

    // No button can move anywhere on the page (fixed positioning)
    noBtn.style.position = 'fixed';
    noBtn.style.left = '50%';
    noBtn.style.top = '50%';
    noBtn.style.transform = 'translate(-50%, -50%)';
    noBtn.style.transition = isMobile ? 'left 0.3s ease-out, top 0.3s ease-out' : 'left 0.5s ease-out, top 0.5s ease-out';
    noBtn.style.pointerEvents = 'auto';
    noBtn.style.zIndex = 10;
    noBtn.style.touchAction = 'none';

    // Desktop mouse events
    document.addEventListener('mousemove', onMouseMove);

    // Mobile touch events
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchstart', onTouchStart, { passive: false });

    noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        moveNoAway(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
        return false;
    });

    noBtn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    noBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // Add smooth page transition effect
    function transitionToPage(url) {
        document.body.style.transition = 'opacity 0.4s ease-out';
        document.body.style.opacity = '0';
        setTimeout(function() {
            window.location.href = url;
        }, 400);
    }

    yesBtn.addEventListener('click', function () {
        var overlay = document.getElementById('confirmOverlay');
        if (overlay) {
            overlay.classList.add('confirm-overlay-visible');
            overlay.setAttribute('aria-hidden', 'false');
        }
    });

    var confirmYesBtn = document.getElementById('confirmYesBtn');
    var confirmNoBtn = document.getElementById('confirmNoBtn');
    var confirmOverlay = document.getElementById('confirmOverlay');

    if (confirmYesBtn) {
        confirmYesBtn.addEventListener('click', function () {
            transitionToPage('success.html');
        });
    }
    if (confirmNoBtn) {
        confirmNoBtn.addEventListener('click', function () {
            transitionToPage('crying.html');
        });
    }
})();
