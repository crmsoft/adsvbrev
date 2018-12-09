<!DOCTYPE html>
<html lang="en">
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
    <link href="/front/styles.f4e41cb8.css" rel="stylesheet">
    <script type="text/javascript">
        var gg = {
            wsc: function(){
                return '<?php echo e(session()->get('user_communication_id')); ?>';
            }
        }
    </script>
    <?php echo $__env->yieldPushContent('scripts'); ?>
</head>
<body>

    <main>
        <?php echo $__env->make('layouts/header', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
        <?php echo $__env->yieldContent('content'); ?>
    </main>


    <script src="/front/src.7ed060e2.js"></script>
    
</body>
</html>
