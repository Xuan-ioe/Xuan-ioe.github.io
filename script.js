// script.js - 主页面功能
$(document).ready(function() {
    // 导航栏功能
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    
    hamburger.on('click', function() {
        hamburger.toggleClass('active');
        navMenu.toggleClass('active');
    });
    
    // 点击导航链接后关闭移动菜单
    $('.nav-link').on('click', function() {
        hamburger.removeClass('active');
        navMenu.removeClass('active');
    });
    
    // 退出登录功能
    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        if (confirm('确定要退出登录吗？')) {
            alert('已退出登录');
            window.location.href = 'login.html';
        }
    });
    
    // 轮播图功能
    let currentSlide = 0;
    const slides = $('.carousel-item');
    const indicators = $('.indicator');
    const totalSlides = slides.length;
    
    // 初始化轮播图
    function initCarousel() {
        updateCarousel();
        
        // 自动轮播
        setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // 更新轮播图显示
    function updateCarousel() {
        $('.carousel-inner').css('transform', `translateX(-${currentSlide * 20}%)`);
        
        // 更新指示器
        indicators.removeClass('active');
        indicators.eq(currentSlide).addClass('active');
    }
    
    // 添加事件监听器
    $('.carousel-control.next').on('click', nextSlide);
    $('.carousel-control.prev').on('click', prevSlide);
    
    // 指示器点击事件
    indicators.on('click', function() {
        currentSlide = $(this).data('slide-to');
        updateCarousel();
    });
    
    // 初始化轮播图
    initCarousel();
    
    // 手风琴功能
    $('.accordion-button').on('click', function() {
        const isActive = $(this).hasClass('active');
        
        // 关闭所有手风琴项
        $('.accordion-button').removeClass('active');
        $('.accordion-content').css('max-height', '0');
        
        // 如果当前项未激活，则激活它
        if (!isActive) {
            $(this).addClass('active');
            const content = $(this).next('.accordion-content');
            content.css('max-height', content[0].scrollHeight + 'px');
        }
    });
    
    // 平滑滚动
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        const targetElement = $(targetId);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 70
            }, 800);
        }
    });
    
    // 导航栏滚动效果
    $(window).on('scroll', function() {
        const navbar = $('.navbar');
        if ($(window).scrollTop() > 50) {
            navbar.css({
                'backgroundColor': 'rgba(255, 255, 255, 0.8)',
                'boxShadow': '0 4px 12px rgba(0, 0, 0, 0.1)'
            });
        } else {
            navbar.css({
                'backgroundColor': 'rgba(255, 255, 255, 0.5)',
                'boxShadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
            });
        }
    });
    
    // 喜欢按钮点击事件
    $('.btn-like').on('click', function() {
        const $this = $(this);
        $this.toggleClass('liked');
        if ($this.hasClass('liked')) {
            $this.html('❤️ 已喜欢');
            alert('感谢您的喜欢！');
        } else {
            $this.html('❤️ 喜欢');
        }
    });
    
    // 排序下拉框变化事件
    $('#sortSelect').on('change', function() {
        const sortValue = $(this).val();
        alert(`已${$(this).find('option:selected').text()}重新排列作品`);
        // 这里可以添加实际排序逻辑
    });
    
    // 表单提交事件
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        alert('消息已发送！我们会尽快回复您。');
        $(this).trigger('reset');
    });
    
    // 输入框焦点事件
    $('input, textarea').on('focus', function() {
        $(this).css('border-color', 'var(--primary-color)');
    }).on('blur', function() {
        if ($(this).val().trim() === '') {
            $(this).css('border-color', '#e74c3c');
        } else {
            $(this).css('border-color', '#ddd');
        }
    });
    
    // 页面加载完成事件
    $(window).on('load', function() {
        console.log('页面加载成功');
    });
    
    // 页面卸载事件
    $(window).on('beforeunload', function() {
        return '确定要离开吗？';
    });
});