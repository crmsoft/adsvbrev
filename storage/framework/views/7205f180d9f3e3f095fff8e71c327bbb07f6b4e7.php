<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo e(config('app.name', 'Laravel')); ?></title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">

    <!-- Styles -->
    <link href="<?php echo e(asset('css/auth.css')); ?>" rel="stylesheet">
</head>
<body>

    <main>
        <?php echo $__env->yieldContent('content'); ?>
    </main>


    <script src="<?php echo e(asset('/js/manifest.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/vendor.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/auth.js')); ?>"></script>
</body>
</html>
