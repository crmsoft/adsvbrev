<?php $__env->startSection('content'); ?>
<div class="login-register">
    <div class="d-flex">
        <div class="flex-fill brand d-flex align-items-center">
            <img src="/img/logo/logo.png" alt="">
        </div>
        <div class="flex-fill form-holder">
            <div id="login-register"></div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.auth', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>