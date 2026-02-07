(function () {
    var openLetterBtn = document.querySelector('.open-letter-btn');
    
    if (openLetterBtn) {
        // Add smooth page transition
        openLetterBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.style.transition = 'opacity 0.4s ease-out';
            document.body.style.opacity = '0';
            setTimeout(function() {
                window.location.href = 'proposal.html';
            }, 400);
        });
    }

    // Add entrance animation
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease-in';
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    });

    var CURSOR_NEAR_PX = 120;
    var isMoving = false;

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

    function onMouseDown(e) {
        var noRect = noBtn.getBoundingClientRect();
        var mx = e.clientX;
        var my = e.clientY;
        var centerX = noRect.left + noRect.width / 2;
        var centerY = noRect.top + noRect.height / 2;
        var dist = Math.sqrt((mx - centerX) * (mx - centerX) + (my - centerY) * (my - centerY));
        
        // If clicking near the No button, move it away aggressively
        if (dist < 150) {
            e.preventDefault();
            e.stopPropagation();
            moveNoAway(mx, my);
            // Move it again after a short delay to make it harder to catch
            setTimeout(function() {
                moveNoAway(mx + (Math.random() - 0.5) * 50, my + (Math.random() - 0.5) * 50);
            }, 100);
            return false;
        }
    }

    noBtn.style.position = 'absolute';
    noBtn.style.left = '50%';
    noBtn.style.top = '50%';
    noBtn.style.transform = 'translate(-50%, -50%)';
    noBtn.style.transition = 'left 0.8s ease-out, top 0.8s ease-out';
    noBtn.style.pointerEvents = 'auto';

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);

    noBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var noRect = noBtn.getBoundingClientRect();
        moveNoAway(noRect.left + noRect.width / 2, noRect.top + noRect.height / 2);
        return false;
    });

    noBtn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    yesBtn.addEventListener('click', function () {
        window.location.href = 'success.html';
    });
})();
