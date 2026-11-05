<?php

// 1. Prepare writable directories in /tmp for Vercel Serverless read-only filesystem
$tmpDirs = [
    '/tmp/views',
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/cache',
    '/tmp/storage/app/public',
    '/tmp/storage/logs',
];

foreach ($tmpDirs as $dir) {
    if (! is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// 2. Initialize sqlite database in /tmp if not present
$tmpDb = '/tmp/database.sqlite';
$demoDb = __DIR__.'/../database/demo.sqlite';

if (! file_exists($tmpDb)) {
    if (file_exists($demoDb)) {
        copy($demoDb, $tmpDb);
    } else {
        touch($tmpDb);
    }
}

// 3. Delegate to public/index.php
require __DIR__.'/../public/index.php';
