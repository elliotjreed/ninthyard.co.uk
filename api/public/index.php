<?php

declare(strict_types=1);

use ElliotJReed\Exception\Form;
use ElliotJReed\ProcessForm;
use PHPMailer\PHPMailer\PHPMailer;
use Symfony\Component\Dotenv\Dotenv;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    \header("Location: https://www.ninthyard.co.uk");
    exit();
}

\header('Content-Type: application/json');

require __DIR__ . '/../vendor/autoload.php';

(new Dotenv())->load(__DIR__ . '/../.env');

try {
    echo \json_encode((new ProcessForm(new PHPMailer()))->process($_POST));
} catch (Form $exception) {
    echo \json_encode($exception->getMessage());
} catch (Exception $exception) {
    echo \json_encode('There was a problem sending your email. Please email us at info@ninthyard.co.uk');
}
