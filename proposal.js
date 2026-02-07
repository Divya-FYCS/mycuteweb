(function () {
    var yesBtn = document.getElementById('yesBtn');
    var noBtn = document.getElementById('noBtn');
    var frame = document.getElementById('buttonsFrame');

    if (!noBtn || !yesBtn) return;

    // 10cm away from cursor (1cm ≈ 37.8px at 96dpi)
    var MOVE_DISTANCE_CM = 10;
    var MOVE_DISTANCE_PX = MOVE_DISTANCE_CM * 37.8;

    function moveNoAway(clientX, clientY) {
        var noRect = noBtn.getBoundingClientRect();
        var noCenterX = noRect.left + noRect.width / 2;
        var noCenterY = noRect.top + noRect.height / 2;

        var dx = clientX - noCenterX;
        var dy = clientY - noCenterY;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1) return;

        // Move exactly 10cm away from cursor, in the direction away from cursor
        var angle = Math.atan2(dy, dx);
        var newCenterX = noCenterX + Math.cos(angle) * MOVE_DISTANCE_PX;
        var newCenterY = noCenterY + Math.sin(angle) * MOVE_DISTANCE_PX;

        // Keep button within viewport (whole page)
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

    var CURSOR_NEAR_PX = 120;

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

    // No button can move anywhere on the page (fixed positioning)
    noBtn.style.position = 'fixed';
    noBtn.style.left = '50%';
    noBtn.style.top = '50%';
    noBtn.style.transform = 'translate(-50%, -50%)';
    noBtn.style.transition = 'left 0.5s ease-out, top 0.5s ease-out';
    noBtn.style.pointerEvents = 'auto';
    noBtn.style.zIndex = 10;

    document.addEventListener('mousemove', onMouseMove);

    noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        moveNoAway(e.clientX, e.clientY);
        return false;
    });

    noBtn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

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
            window.location.href = 'success.html';
        });
    }
    if (confirmNoBtn) {
        confirmNoBtn.addEventListener('click', function () {
            window.location.href = 'crying.html';
        });
    }
})();
