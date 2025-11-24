// auth.js - 注册和登录表单验证
$(document).ready(function() {
    // 注册表单验证
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        if (validateRegisterForm()) {
            alert('注册成功！即将跳转至登录页');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    });

    // 登录表单验证
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        if (validateLoginForm()) {
            alert('登录成功！即将跳转至首页');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    });

    // 实时验证
    $('#username').on('blur', validateUsername);
    $('#password').on('blur', validatePassword);
    $('#confirmPassword').on('blur', validateConfirmPassword);
    $('#phone').on('blur', validatePhone);
});

// 注册表单验证函数
function validateRegisterForm() {
    const isValidUsername = validateUsername();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();
    const isValidPhone = validatePhone();

    return isValidUsername && isValidPassword && isValidConfirmPassword && isValidPhone;
}

// 登录表单验证函数
function validateLoginForm() {
    const username = $('#loginUsername').val().trim();
    const password = $('#loginPassword').val().trim();
    let isValid = true;

    // 验证用户名
    if (!username) {
        showError('loginUsernameError', '用户名不能为空，请输入');
        $('#loginUsername').focus();
        isValid = false;
    } else if (!isValidUsernameFormat(username)) {
        showError('loginUsernameError', '用户名格式错误，需为 4-16 位字母 / 数字 / 下划线');
        $('#loginUsername').focus();
        isValid = false;
    } else {
        hideError('loginUsernameError');
    }

    // 验证密码
    if (!password) {
        showError('loginPasswordError', '密码不能为空，请输入');
        if (isValid) $('#loginPassword').focus();
        isValid = false;
    } else if (!isValidPasswordFormat(password)) {
        showError('loginPasswordError', '密码格式错误，需为 8 位且包含大小写字母和数字');
        if (isValid) $('#loginPassword').focus();
        isValid = false;
    } else {
        hideError('loginPasswordError');
    }

    return isValid;
}

// 用户名验证
function validateUsername() {
    const username = $('#username').val().trim();
    
    if (!username) {
        showError('usernameError', '用户名不能为空，请输入');
        return false;
    }
    
    if (!isValidUsernameFormat(username)) {
        showError('usernameError', '用户名格式错误，需为 4-16 位字母 / 数字 / 下划线');
        return false;
    }
    
    hideError('usernameError');
    return true;
}

// 密码验证
function validatePassword() {
    const password = $('#password').val().trim();
    
    if (!password) {
        showError('passwordError', '密码不能为空，请输入');
        return false;
    }
    
    if (!isValidPasswordFormat(password)) {
        showError('passwordError', '密码格式错误，需为 8 位且包含大小写字母和数字');
        return false;
    }
    
    hideError('passwordError');
    return true;
}

// 确认密码验证
function validateConfirmPassword() {
    const password = $('#password').val().trim();
    const confirmPassword = $('#confirmPassword').val().trim();
    
    if (!confirmPassword) {
        showError('confirmPasswordError', '确认密码不能为空，请输入');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPasswordError', '两次密码输入不一致，请重新输入');
        return false;
    }
    
    hideError('confirmPasswordError');
    return true;
}

// 手机号验证
function validatePhone() {
    const phone = $('#phone').val().trim();
    
    if (!phone) {
        showError('phoneError', '手机号不能为空，请输入');
        return false;
    }
    
    if (!isValidPhoneFormat(phone)) {
        showError('phoneError', '手机号格式错误，请输入正确手机号');
        return false;
    }
    
    hideError('phoneError');
    return true;
}

// 用户名格式验证：4-16位，仅包含字母、数字或下划线
function isValidUsernameFormat(username) {
    const regex = /^[a-zA-Z0-9_]{4,16}$/;
    return regex.test(username);
}

// 密码格式验证：8位，包含至少1个大写字母、1个小写字母和1个数字
function isValidPasswordFormat(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/;
    return regex.test(password);
}

// 手机号格式验证：11位数字
function isValidPhoneFormat(phone) {
    const regex = /^1[3-9]\d{9}$/;
    return regex.test(phone);
}

// 显示错误信息
function showError(elementId, message) {
    $('#' + elementId).text(message).show();
    $('#' + elementId.replace('Error', '')).addClass('error');
}

// 隐藏错误信息
function hideError(elementId) {
    $('#' + elementId).hide();
    $('#' + elementId.replace('Error', '')).removeClass('error');
}