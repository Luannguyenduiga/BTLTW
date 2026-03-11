document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const slides = document.querySelector('.slider');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = document.querySelectorAll('.slide').length;

    // Function to move slides
    window.moveSlide = function(step) { 
        currentIndex = (currentIndex + step + totalSlides) % totalSlides; // Vòng lặp để đảm bảo chỉ số hợp lệ
        updateSlider(); // Cập nhật slider sau khi thay đổi chỉ số
    }

    window.currentSlide = function(index) {
        currentIndex = index;
        updateSlider();
    }

    // Function to update slider position and active dot
    function updateSlider() {
        if(!slides) return; // Phòng lỗi nếu không tìm thấy slider
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    setInterval(() => moveSlide(1), 3000);
    updateSlider();
});