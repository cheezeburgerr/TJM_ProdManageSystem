-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2024 at 03:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tjm_pms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Joseph', 'josephmislang@gmail.com', '$2y$12$qUTQBEcJuMRAzP6YbOPpbe8q30lA1J7uUR2Y0IEAMHjw8yVWrly4K', '2024-04-15 03:35:33', '2024-04-24 19:49:24');

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `attribute_name` varchar(255) NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `attribute_name`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 'Jersey Cut', 13, '2024-04-13 12:31:24', '2024-04-13 12:31:24'),
(2, 'Neck Type', 13, '2024-04-13 12:31:45', '2024-04-13 12:31:45'),
(3, 'Short Type', NULL, '2024-04-13 12:32:06', '2024-04-13 12:32:06'),
(4, 'Polo Type', NULL, '2024-04-13 12:32:29', '2024-04-13 12:32:29'),
(5, 'Collar', NULL, '2024-04-13 12:32:48', '2024-04-13 12:32:48'),
(6, 'Fabric', NULL, '2024-04-13 12:33:04', '2024-04-13 12:33:04');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_options`
--

CREATE TABLE `attribute_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `option_name` varchar(255) NOT NULL,
  `option_price` varchar(255) NOT NULL,
  `attributes_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attribute_options`
--

INSERT INTO `attribute_options` (`id`, `option_name`, `option_price`, `attributes_id`, `created_at`, `updated_at`) VALUES
(1, 'Normal Cut', '0', 1, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(2, 'NBA Cut', '50', 1, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(3, 'Round Neck', '0', 2, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(4, 'V Neck', '0', 2, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(5, 'Geena', '0', 3, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(6, 'With Waistband', '50', 3, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(7, 'Button', '0', 4, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(8, 'Zipper', '0', 4, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(9, 'Normal Collar', '0', 5, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(10, 'Chinese Collar', '50', 5, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(11, 'Polydex', '0', 6, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(12, 'Hexagon', '50', 6, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(13, 'Honeycomb', '50', 6, '2024-04-13 06:35:56', '2024-04-13 06:35:56'),
(14, 'Botack', '50', 6, '2024-04-13 06:35:56', '2024-04-13 06:35:56');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('a17961fa74e9275d529f489537f179c05d50c2f3', 'i:2;', 1712964477),
('a17961fa74e9275d529f489537f179c05d50c2f3:timer', 'i:1712964477;', 1712964477),
('iansoriano@gmail.com|127.0.0.1', 'i:1;', 1715595658),
('iansoriano@gmail.com|127.0.0.1:timer', 'i:1715595658;', 1715595658);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `department_name`, `created_at`, `updated_at`) VALUES
(1, 'Artist', '2024-04-06 16:03:32', '2024-04-06 16:03:32'),
(2, 'Customer Service Representative', '2024-04-08 04:14:06', '2024-04-08 04:14:06'),
(3, 'Heat Press', '2024-04-09 19:36:22', '2024-04-09 19:36:22'),
(4, 'Printing', '2024-04-09 19:36:22', '2024-04-09 19:36:22'),
(5, 'Quality Control', '2024-04-09 19:36:22', '2024-04-09 19:36:22'),
(6, 'Sewing', '2024-04-09 19:36:22', '2024-04-09 19:36:22');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `emp_id` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `is_supervisor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`emp_id`, `user_id`, `department_id`, `is_supervisor`) VALUES
('TJM_00001', 5, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `equipment_name` varchar(255) NOT NULL,
  `equipment_type` varchar(255) NOT NULL,
  `equipment_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `equipment_name`, `equipment_type`, `equipment_status`, `created_at`, `updated_at`) VALUES
(1, 'ATEXCO', 'Printer', 'Working', '2024-04-09 19:30:22', '2024-04-23 18:14:51'),
(2, 'Tecjet Printer 1', 'Printer', 'Working', '2024-04-09 19:30:22', '2024-05-01 01:27:32'),
(3, 'Tecject Printer 2', 'Printer', 'Working', '2024-04-09 19:30:22', '2024-04-09 19:30:22'),
(4, 'EPSON', 'Printer', 'Under Maintenance', '2024-04-09 19:30:22', '2024-05-07 21:24:17');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `failed_jobs`
--

INSERT INTO `failed_jobs` (`id`, `uuid`, `connection`, `queue`, `payload`, `exception`, `failed_at`) VALUES
(1, '55898fba-c6f0-4853-b381-1958be9c3bf8', 'database', 'default', '{\"uuid\":\"55898fba-c6f0-4853-b381-1958be9c3bf8\",\"displayName\":\"App\\\\Jobs\\\\SendMessage\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendMessage\",\"command\":\"O:20:\\\"App\\\\Jobs\\\\SendMessage\\\":1:{s:7:\\\"message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:19:\\\"App\\\\Models\\\\Messages\\\";s:2:\\\"id\\\";i:1;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Messages]. in D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:628\nStack trace:\n#0 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(109): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(62): App\\Jobs\\SendMessage->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): App\\Jobs\\SendMessage->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: App\\Jobs\\SendMessage->__unserialize(Array)\n#4 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(98): unserialize(\'O:20:\"App\\\\Jobs\\\\...\')\n#5 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(61): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(439): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(389): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(333): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(139): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(122): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(662): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(212): Illuminate\\Container\\Container->call(Array)\n#18 D:\\TJM_PMS\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(181): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(1049): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(318): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(169): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(196): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1183): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 D:\\TJM_PMS\\artisan(13): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2024-05-03 16:15:39'),
(2, '8d7f9873-8fbd-4195-9250-6bca68288bd6', 'database', 'default', '{\"uuid\":\"8d7f9873-8fbd-4195-9250-6bca68288bd6\",\"displayName\":\"App\\\\Jobs\\\\SendMessage\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendMessage\",\"command\":\"O:20:\\\"App\\\\Jobs\\\\SendMessage\\\":1:{s:7:\\\"message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:19:\\\"App\\\\Models\\\\Messages\\\";s:2:\\\"id\\\";i:2;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Messages]. in D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:628\nStack trace:\n#0 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(109): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(62): App\\Jobs\\SendMessage->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): App\\Jobs\\SendMessage->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: App\\Jobs\\SendMessage->__unserialize(Array)\n#4 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(98): unserialize(\'O:20:\"App\\\\Jobs\\\\...\')\n#5 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(61): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(439): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(389): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(333): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(139): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(122): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(662): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(212): Illuminate\\Container\\Container->call(Array)\n#18 D:\\TJM_PMS\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(181): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(1049): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(318): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(169): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(196): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1183): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 D:\\TJM_PMS\\artisan(13): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2024-05-03 16:15:40'),
(3, '89d185f3-adb1-418a-b647-6fa7cf888a79', 'database', 'default', '{\"uuid\":\"89d185f3-adb1-418a-b647-6fa7cf888a79\",\"displayName\":\"App\\\\Jobs\\\\SendMessage\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\SendMessage\",\"command\":\"O:20:\\\"App\\\\Jobs\\\\SendMessage\\\":1:{s:7:\\\"message\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:19:\\\"App\\\\Models\\\\Messages\\\";s:2:\\\"id\\\";i:3;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Messages]. in D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:628\nStack trace:\n#0 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(109): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(62): App\\Jobs\\SendMessage->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): App\\Jobs\\SendMessage->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: App\\Jobs\\SendMessage->__unserialize(Array)\n#4 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(98): unserialize(\'O:20:\"App\\\\Jobs\\\\...\')\n#5 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(61): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(439): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(389): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(333): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(139): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(122): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(662): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(212): Illuminate\\Container\\Container->call(Array)\n#18 D:\\TJM_PMS\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(181): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(1049): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(318): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(169): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(196): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1183): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 D:\\TJM_PMS\\artisan(13): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2024-05-03 16:15:41'),
(4, '87c7f72f-5bc0-4fd2-ad71-1b7421a50457', 'database', 'default', '{\"uuid\":\"87c7f72f-5bc0-4fd2-ad71-1b7421a50457\",\"displayName\":\"App\\\\Events\\\\GotMessage\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\",\"command\":\"O:38:\\\"Illuminate\\\\Broadcasting\\\\BroadcastEvent\\\":14:{s:5:\\\"event\\\";O:21:\\\"App\\\\Events\\\\GotMessage\\\":1:{s:6:\\\"roomId\\\";a:4:{s:2:\\\"id\\\";i:20;s:7:\\\"user_id\\\";i:3;s:7:\\\"message\\\";s:5:\\\"Hello\\\";s:4:\\\"time\\\";s:21:\\\"04 May 2024, 02:28:13\\\";}}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:7:\\\"backoff\\\";N;s:13:\\\"maxExceptions\\\";N;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;}\"}}', 'ErrorException: Array to string conversion in D:\\TJM_PMS\\app\\Events\\GotMessage.php:34\nStack trace:\n#0 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Bootstrap\\HandleExceptions.php(256): Illuminate\\Foundation\\Bootstrap\\HandleExceptions->handleError(2, \'Array to string...\', \'D:\\\\TJM_PMS\\\\app\\\\...\', 34)\n#1 D:\\TJM_PMS\\app\\Events\\GotMessage.php(34): Illuminate\\Foundation\\Bootstrap\\HandleExceptions->Illuminate\\Foundation\\Bootstrap\\{closure}(2, \'Array to string...\', \'D:\\\\TJM_PMS\\\\app\\\\...\', 34)\n#2 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Broadcasting\\BroadcastEvent.php(79): App\\Events\\GotMessage->broadcastOn()\n#3 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Broadcasting\\BroadcastEvent->handle(Object(Illuminate\\Broadcasting\\BroadcastManager))\n#4 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#5 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#6 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#7 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(662): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#8 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(128): Illuminate\\Container\\Container->call(Array)\n#9 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(144): Illuminate\\Bus\\Dispatcher->Illuminate\\Bus\\{closure}(Object(Illuminate\\Broadcasting\\BroadcastEvent))\n#10 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(119): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Broadcasting\\BroadcastEvent))\n#11 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Bus\\Dispatcher.php(132): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#12 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(124): Illuminate\\Bus\\Dispatcher->dispatchNow(Object(Illuminate\\Broadcasting\\BroadcastEvent), false)\n#13 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(144): Illuminate\\Queue\\CallQueuedHandler->Illuminate\\Queue\\{closure}(Object(Illuminate\\Broadcasting\\BroadcastEvent))\n#14 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Pipeline\\Pipeline.php(119): Illuminate\\Pipeline\\Pipeline->Illuminate\\Pipeline\\{closure}(Object(Illuminate\\Broadcasting\\BroadcastEvent))\n#15 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(123): Illuminate\\Pipeline\\Pipeline->then(Object(Closure))\n#16 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(71): Illuminate\\Queue\\CallQueuedHandler->dispatchThroughMiddleware(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Broadcasting\\BroadcastEvent))\n#17 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#18 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(439): Illuminate\\Queue\\Jobs\\Job->fire()\n#19 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(389): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#20 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(333): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#21 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(139): Illuminate\\Queue\\Worker->runNextJob(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#22 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(122): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#23 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#24 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(41): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#25 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(93): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#26 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#27 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(662): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#28 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(212): Illuminate\\Container\\Container->call(Array)\n#29 D:\\TJM_PMS\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#30 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(181): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#31 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(1049): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#32 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(318): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#33 D:\\TJM_PMS\\vendor\\symfony\\console\\Application.php(169): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#34 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(196): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#35 D:\\TJM_PMS\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1183): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#36 D:\\TJM_PMS\\artisan(13): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#37 {main}', '2024-05-03 18:28:22');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `name`, `image`, `description`, `product_id`, `created_at`, `updated_at`) VALUES
(2, 'Orange Purple Pheonix Suns Fullset Jersey Design', '1714722864.jpg', 'Orange Purple Pheonix Suns Fullset Jersey Design', 13, '2024-05-02 23:54:24', '2024-05-02 23:54:24'),
(3, 'Black Orange Purple Pheonix Suns Fullset Jersey Design', '1714722900.jpg', 'Black Orange Purple Pheonix Suns Fullset Jersey Design. Based on NBA Pheonix Suns', 13, '2024-05-02 23:55:00', '2024-05-02 23:55:00'),
(4, 'White Floral Elegant Fullset Jersey Design', '1714722990.jpg', 'White Floral Design with Rose on sides.', 13, '2024-05-02 23:56:30', '2024-05-02 23:56:30'),
(5, 'Sky Blue Sports Basketball Fullset Jersey', '1714723039.jpg', 'Sky Blue Sports Basketball Fullset Jersey', 13, '2024-05-02 23:57:19', '2024-05-02 23:57:19'),
(6, 'Blue and White Formal Polo Shirt', '1714752426.jpg', 'Blue and White Formal Polo Shirt for Funerals, or even in other occassions.', 17, '2024-05-03 08:07:06', '2024-05-03 08:07:06'),
(7, 'Dark Blue and Black Badminton Shirt', '1714752572.jpg', 'Dark Blue and Black Badminton Shirt with Yonex Logo', 16, '2024-05-03 08:09:32', '2024-05-03 08:09:32'),
(8, 'Black and Yellow Viper Basketball Fullset Jersey', '1714752857.jpg', 'Black and Yellow Viper Basketball Fullset Jersey with Snake Scale pattern', 13, '2024-05-03 08:14:17', '2024-05-03 08:14:17'),
(9, 'Pink Hornets Fullset Basketball Jersey', '1714752953.jpg', 'Pink Hornets Fullset Basketball Jersey with Black and White Pattern', 13, '2024-05-03 08:15:53', '2024-05-03 08:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lineups`
--

CREATE TABLE `lineups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `player_name` varchar(255) NOT NULL,
  `player_details` varchar(255) NOT NULL,
  `classification` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `upper_size` varchar(255) DEFAULT NULL,
  `short_size` varchar(255) DEFAULT NULL,
  `short_name` varchar(255) DEFAULT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `progress` double(8,2) DEFAULT NULL,
  `lineup_price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lineups`
--

INSERT INTO `lineups` (`id`, `player_name`, `player_details`, `classification`, `gender`, `upper_size`, `short_size`, `short_name`, `order_id`, `created_at`, `updated_at`, `status`, `note`, `progress`, `lineup_price`) VALUES
(40, 'Killua', '23', 'Adult', 'Male', 'M', 'M', 'Key', 68, '2024-05-05 02:23:15', '2024-05-05 04:43:06', 'Printed', NULL, NULL, 550),
(41, 'Frias', '11', 'Adult', 'Male', 'L', 'L', 'Erick', 68, '2024-05-05 02:23:15', '2024-05-05 03:40:30', 'Finished', NULL, NULL, 550),
(42, 'Hona', '3', 'Adult', 'Male', 'S', 'S', 'J', 68, '2024-05-05 02:23:15', '2024-05-05 03:36:15', 'Finished', NULL, NULL, 550),
(43, 'Standhardinger', '34', 'Adult', 'Male', 'XL', 'XL', 'Chris', 63, '2024-05-07 02:45:57', '2024-05-07 02:45:57', NULL, NULL, NULL, 950),
(44, 'Soriano', '21', 'Adult', 'Male', 'M', 'M', 'Ian', 69, '2024-05-07 20:51:20', '2024-05-07 20:51:20', NULL, NULL, NULL, 950),
(45, 'Aquino', '12', 'Adult', 'Male', 'M', 'L', 'Ren', 69, '2024-05-07 20:51:20', '2024-05-07 20:51:20', NULL, NULL, NULL, 950),
(46, 'Arenas', '12', 'Adult', 'Female', 'L', 'L', 'Mil', 72, '2024-05-13 04:34:52', '2024-05-13 04:40:17', 'Finished', NULL, NULL, 900);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `emp_id` bigint(20) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `emp_id`, `group_id`, `message`, `created_at`, `updated_at`) VALUES
(33, 7, NULL, NULL, 'Hello There!', '2024-05-13 05:15:49', '2024-05-13 05:15:49'),
(34, 6, NULL, NULL, 'Hi', '2024-05-13 05:16:08', '2024-05-13 05:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_04_06_023347_create_department_table', 2),
(5, '2024_04_06_023122_create_employees_table', 3),
(6, '2024_04_12_141514_create_orders_table', 4),
(7, '2024_04_13_123000_create_product_attributes_table', 5),
(8, '2024_04_13_131530_create_table', 6),
(9, '2024_04_13_142338_create_attribute_options_table', 7),
(10, '2024_04_15_111738_create_admin_table', 8),
(11, '2024_05_03_055707_create_gallery_table', 9),
(12, '2024_05_03_162214_add_columns_to_orders', 10),
(13, '2024_05_03_231838_create_messages_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `team_name` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `design` varchar(255) DEFAULT NULL,
  `production_details_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `order_price` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `downpayment_proof` varchar(255) DEFAULT NULL,
  `downpayment` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `team_name`, `due_date`, `design`, `production_details_id`, `created_at`, `updated_at`, `customer_id`, `product_id`, `order_price`, `total_price`, `downpayment_proof`, `downpayment`) VALUES
(72, 'Bulldogs', '2024-05-17', '1714723039.jpg', NULL, '2024-05-13 02:55:30', '2024-05-13 04:34:52', 6, 13, 900, 900, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_attributes_options`
--

CREATE TABLE `order_attributes_options` (
  `attributes_option_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `option_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_attributes_options`
--

INSERT INTO `order_attributes_options` (`attributes_option_id`, `order_id`, `option_id`, `created_at`, `updated_at`) VALUES
(43, 48, 1, '2024-04-21 18:51:23', '2024-04-21 18:51:23'),
(44, 48, 3, '2024-04-21 18:51:23', '2024-04-21 18:51:23'),
(45, 48, 5, '2024-04-21 18:51:23', '2024-04-21 18:51:23'),
(46, 48, 12, '2024-04-21 18:51:23', '2024-04-21 18:51:23'),
(47, 49, 1, '2024-04-22 18:44:03', '2024-04-22 18:44:03'),
(48, 49, 4, '2024-04-22 18:44:03', '2024-04-22 18:44:03'),
(49, 49, 6, '2024-04-22 18:44:03', '2024-04-22 18:44:03'),
(50, 49, 12, '2024-04-22 18:44:03', '2024-04-22 18:44:03'),
(51, 50, 2, '2024-04-23 21:33:31', '2024-04-23 21:33:31'),
(52, 50, 4, '2024-04-23 21:33:31', '2024-04-23 21:33:31'),
(53, 50, 12, '2024-04-23 21:33:31', '2024-04-23 21:33:31'),
(54, 51, 1, '2024-04-28 17:39:28', '2024-04-28 17:39:28'),
(55, 51, 4, '2024-04-28 17:39:28', '2024-04-28 17:39:28'),
(56, 51, 5, '2024-04-28 17:39:28', '2024-04-28 17:39:28'),
(57, 51, 12, '2024-04-28 17:39:28', '2024-04-28 17:39:28'),
(58, 52, 1, '2024-04-28 17:39:40', '2024-04-28 17:39:40'),
(59, 52, 4, '2024-04-28 17:39:40', '2024-04-28 17:39:40'),
(60, 52, 5, '2024-04-28 17:39:40', '2024-04-28 17:39:40'),
(61, 52, 12, '2024-04-28 17:39:40', '2024-04-28 17:39:40'),
(62, 53, 1, '2024-04-30 18:08:55', '2024-04-30 18:08:55'),
(63, 53, 4, '2024-04-30 18:08:55', '2024-04-30 18:08:55'),
(64, 53, 5, '2024-04-30 18:08:55', '2024-04-30 18:08:55'),
(65, 53, 12, '2024-04-30 18:08:55', '2024-04-30 18:08:55'),
(66, 54, 1, '2024-04-30 18:10:37', '2024-04-30 18:10:37'),
(67, 54, 4, '2024-04-30 18:10:37', '2024-04-30 18:10:37'),
(68, 54, 5, '2024-04-30 18:10:37', '2024-04-30 18:10:37'),
(69, 54, 12, '2024-04-30 18:10:37', '2024-04-30 18:10:37'),
(70, 55, 1, '2024-04-30 18:13:19', '2024-04-30 18:13:19'),
(71, 55, 4, '2024-04-30 18:13:19', '2024-04-30 18:13:19'),
(72, 55, 5, '2024-04-30 18:13:19', '2024-04-30 18:13:19'),
(73, 55, 12, '2024-04-30 18:13:19', '2024-04-30 18:13:19'),
(74, 56, 2, '2024-04-30 18:14:15', '2024-04-30 18:14:15'),
(75, 56, 4, '2024-04-30 18:14:15', '2024-04-30 18:14:15'),
(76, 56, 5, '2024-04-30 18:14:15', '2024-04-30 18:14:15'),
(77, 56, 12, '2024-04-30 18:14:15', '2024-04-30 18:14:15'),
(90, 60, 1, '2024-04-30 18:22:13', '2024-04-30 18:22:13'),
(91, 60, 3, '2024-04-30 18:22:13', '2024-04-30 18:22:13'),
(92, 60, 6, '2024-04-30 18:22:13', '2024-04-30 18:22:13'),
(93, 60, 12, '2024-04-30 18:22:13', '2024-04-30 18:22:13'),
(114, 63, 1, '2024-05-02 03:05:10', '2024-05-02 03:05:10'),
(115, 63, 4, '2024-05-02 03:05:10', '2024-05-02 03:05:10'),
(116, 63, 6, '2024-05-02 03:05:10', '2024-05-02 03:05:10'),
(117, 63, 12, '2024-05-02 03:05:10', '2024-05-02 03:05:10'),
(118, 64, 7, '2024-05-02 21:42:46', '2024-05-02 21:42:46'),
(119, 64, 10, '2024-05-02 21:42:46', '2024-05-02 21:42:46'),
(120, 64, 12, '2024-05-02 21:42:46', '2024-05-02 21:42:46'),
(121, 65, 1, '2024-05-03 07:31:06', '2024-05-03 07:31:06'),
(122, 65, 3, '2024-05-03 07:31:06', '2024-05-03 07:31:06'),
(123, 65, 5, '2024-05-03 07:31:06', '2024-05-03 07:31:06'),
(124, 65, 12, '2024-05-03 07:31:06', '2024-05-03 07:31:06'),
(125, 66, 2, '2024-05-03 07:41:08', '2024-05-03 07:41:08'),
(126, 66, 4, '2024-05-03 07:41:08', '2024-05-03 07:41:08'),
(127, 66, 5, '2024-05-03 07:41:08', '2024-05-03 07:41:08'),
(128, 66, 12, '2024-05-03 07:41:08', '2024-05-03 07:41:08'),
(129, 67, 1, '2024-05-03 07:42:23', '2024-05-03 07:42:23'),
(130, 67, 4, '2024-05-03 07:42:23', '2024-05-03 07:42:23'),
(131, 67, 5, '2024-05-03 07:42:23', '2024-05-03 07:42:23'),
(132, 67, 12, '2024-05-03 07:42:23', '2024-05-03 07:42:23'),
(133, 68, 3, '2024-05-05 01:17:50', '2024-05-05 01:17:50'),
(134, 68, 12, '2024-05-05 01:17:50', '2024-05-05 01:17:50'),
(135, 69, 1, '2024-05-07 20:46:41', '2024-05-07 20:46:41'),
(136, 69, 4, '2024-05-07 20:46:41', '2024-05-07 20:46:41'),
(137, 69, 6, '2024-05-07 20:46:41', '2024-05-07 20:46:41'),
(138, 69, 12, '2024-05-07 20:46:41', '2024-05-07 20:46:41'),
(139, 70, 1, '2024-05-07 20:46:53', '2024-05-07 20:46:53'),
(140, 70, 4, '2024-05-07 20:46:53', '2024-05-07 20:46:53'),
(141, 70, 6, '2024-05-07 20:46:53', '2024-05-07 20:46:53'),
(142, 70, 12, '2024-05-07 20:46:53', '2024-05-07 20:46:53'),
(143, 71, 1, '2024-05-13 02:42:52', '2024-05-13 02:42:52'),
(144, 71, 3, '2024-05-13 02:42:52', '2024-05-13 02:42:52'),
(145, 71, 5, '2024-05-13 02:42:52', '2024-05-13 02:42:52'),
(146, 71, 12, '2024-05-13 02:42:52', '2024-05-13 02:42:52'),
(147, 72, 1, '2024-05-13 02:55:30', '2024-05-13 02:55:30'),
(148, 72, 3, '2024-05-13 02:55:30', '2024-05-13 02:55:30'),
(149, 72, 5, '2024-05-13 02:55:30', '2024-05-13 02:55:30'),
(150, 72, 12, '2024-05-13 02:55:30', '2024-05-13 02:55:30');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `apparel` varchar(255) NOT NULL,
  `jersey_cut` varchar(255) DEFAULT NULL,
  `neck_type` varchar(255) DEFAULT NULL,
  `short_type` varchar(255) DEFAULT NULL,
  `polo_type` varchar(255) DEFAULT NULL,
  `polo_collar` varchar(255) DEFAULT NULL,
  `fabric` varchar(255) DEFAULT NULL,
  `design_image` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `production_details`
--

CREATE TABLE `production_details` (
  `production_details_id` bigint(20) UNSIGNED NOT NULL,
  `artist_id` varchar(255) DEFAULT NULL,
  `printer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `progress` double(8,2) DEFAULT 0.00,
  `order_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `production_details`
--

INSERT INTO `production_details` (`production_details_id`, `artist_id`, `printer_id`, `status`, `note`, `created_at`, `updated_at`, `progress`, `order_id`) VALUES
(52, 'TJM_00003', 2, 'Received', NULL, '2024-05-13 02:55:30', '2024-05-13 04:41:20', 100.00, 72);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` float NOT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_price`, `product_image`, `created_at`, `updated_at`) VALUES
(13, 'Fullset Jersey', 850, 'fullset.png', '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(14, 'Upper Jersey', 450, 'upper-jersey.jpg', '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(15, 'Short', 400, 'shorts.jpg', '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(16, 'T-Shirt', 500, 'tshirt.jpeg', '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(17, 'Polo Shirt', 600, 'polo.jpg', '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(18, 'Long Sleeve', 700, 'longsleeve.jpg', '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(20, 'Jacket', 850, '1714615911.jpg', '2024-05-01 18:11:51', '2024-05-01 18:11:51');

-- --------------------------------------------------------

--
-- Table structure for table `products_options`
--

CREATE TABLE `products_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `attributes_id` bigint(20) UNSIGNED DEFAULT NULL,
  `option_name` varchar(255) NOT NULL,
  `option_price` float NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products_options`
--

INSERT INTO `products_options` (`id`, `attributes_id`, `option_name`, `option_price`, `created_at`, `updated_at`) VALUES
(9, 0, 'Normal Cut', 0, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(10, 0, 'NBA Cut', 50, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(11, 0, 'Round Neck', 0, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(12, 0, 'V Neck', 0, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(13, 0, 'Geena', 0, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(14, 0, 'With Waistband', 50, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(15, 0, 'Button', 0, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(16, 0, 'Zipper', 50, '2024-04-05 19:58:54', '2024-04-05 19:58:54'),
(17, 0, 'Normal Collar', 0, '2024-04-06 04:05:37', '2024-04-06 04:05:37'),
(18, 0, 'Chinese Collar', 50, '2024-04-06 04:05:37', '2024-04-06 04:05:37'),
(19, 0, 'Polydex', 0, '2024-04-06 10:58:53', '2024-04-06 10:58:53'),
(20, 0, 'Hexagon', 50, '2024-04-06 10:59:11', '2024-04-06 10:59:11'),
(21, 0, 'Honeycomb', 50, '2024-04-06 10:59:38', '2024-04-06 10:59:38'),
(22, 0, 'Botack', 50, '2024-04-06 11:00:01', '2024-04-06 11:00:01');

-- --------------------------------------------------------

--
-- Table structure for table `products_options_join`
--

CREATE TABLE `products_options_join` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `products_id` bigint(20) UNSIGNED NOT NULL,
  `product_option_id` bigint(20) UNSIGNED NOT NULL,
  `product_option_type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products_options_join`
--

INSERT INTO `products_options_join` (`id`, `products_id`, `product_option_id`, `product_option_type`, `created_at`, `updated_at`) VALUES
(1, 13, 9, 'Cut', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(2, 13, 10, 'Cut', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(3, 13, 11, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(4, 13, 12, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(5, 13, 13, 'Short', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(6, 13, 14, 'Short', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(7, 14, 9, 'Cut', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(8, 14, 10, 'Cut', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(9, 14, 11, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(10, 14, 12, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(11, 15, 13, 'Short', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(12, 15, 14, 'Short', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(13, 16, 11, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(14, 16, 12, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(15, 17, 15, 'Polo Type', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(16, 17, 16, 'Polo Type', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(17, 17, 17, 'Collar', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(18, 17, 18, 'Collar', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(19, 18, 11, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(20, 18, 12, 'Neck', '2024-04-05 20:10:26', '2024-04-05 20:10:26'),
(21, 13, 19, 'Fabric', '2024-04-06 11:00:20', '2024-04-06 11:00:20'),
(22, 13, 20, 'Fabric', '2024-04-06 11:00:41', '2024-04-06 11:00:41'),
(23, 13, 22, 'Fabric', '2024-04-06 11:01:05', '2024-04-06 11:01:05'),
(24, 14, 19, 'Fabric', '2024-04-06 03:06:03', '2024-04-06 03:06:03'),
(25, 14, 20, 'Fabric', '2024-04-06 03:06:03', '2024-04-06 03:06:03'),
(26, 14, 22, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(27, 15, 19, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(28, 15, 20, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(29, 15, 22, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(30, 16, 19, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(31, 16, 20, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(32, 17, 19, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(33, 17, 20, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(34, 17, 21, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(35, 18, 19, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04'),
(36, 18, 20, 'Fabric', '2024-04-06 03:06:04', '2024-04-06 03:06:04');

-- --------------------------------------------------------

--
-- Table structure for table `product_attributes`
--

CREATE TABLE `product_attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `attributes_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_attributes`
--

INSERT INTO `product_attributes` (`id`, `product_id`, `attributes_id`, `created_at`, `updated_at`) VALUES
(1, 13, 1, NULL, NULL),
(2, 13, 2, NULL, NULL),
(3, 13, 3, NULL, NULL),
(4, 14, 1, NULL, NULL),
(5, 14, 2, NULL, NULL),
(6, 15, 3, NULL, NULL),
(7, 16, 2, NULL, NULL),
(8, 17, 4, NULL, NULL),
(9, 17, 5, NULL, NULL),
(10, 18, 2, NULL, NULL),
(11, 13, 6, NULL, NULL),
(12, 14, 6, NULL, NULL),
(13, 15, 6, NULL, NULL),
(14, 16, 6, NULL, NULL),
(15, 17, 6, NULL, NULL),
(16, 18, 6, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('c9oaS8ARMsR9rZpjtUuLhyEE38lWADQ8GcwWkgKD', 6, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'YTo4OntzOjY6Il90b2tlbiI7czo0MDoiVlFDRjNPYjZYUlRWWGl4RGF6TVhFWkpHVjZZRmVLT2FVakQ1d3ExUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9lbXBsb3llZS9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YTowOnt9czo1MjoibG9naW5fYWRtaW5fNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6NToiYWRtaW4iO086MTY6IkFwcFxNb2RlbHNcQWRtaW4iOjMyOntzOjEzOiIAKgBjb25uZWN0aW9uIjtzOjU6Im15c3FsIjtzOjg6IgAqAHRhYmxlIjtzOjU6ImFkbWluIjtzOjEzOiIAKgBwcmltYXJ5S2V5IjtzOjI6ImlkIjtzOjEwOiIAKgBrZXlUeXBlIjtzOjM6ImludCI7czoxMjoiaW5jcmVtZW50aW5nIjtiOjE7czo3OiIAKgB3aXRoIjthOjA6e31zOjEyOiIAKgB3aXRoQ291bnQiO2E6MDp7fXM6MTk6InByZXZlbnRzTGF6eUxvYWRpbmciO2I6MDtzOjEwOiIAKgBwZXJQYWdlIjtpOjE1O3M6NjoiZXhpc3RzIjtiOjE7czoxODoid2FzUmVjZW50bHlDcmVhdGVkIjtiOjA7czoyODoiACoAZXNjYXBlV2hlbkNhc3RpbmdUb1N0cmluZyI7YjowO3M6MTM6IgAqAGF0dHJpYnV0ZXMiO2E6Njp7czoyOiJpZCI7aToxO3M6NDoibmFtZSI7czo2OiJKb3NlcGgiO3M6NToiZW1haWwiO3M6MjM6Impvc2VwaG1pc2xhbmdAZ21haWwuY29tIjtzOjg6InBhc3N3b3JkIjtzOjYwOiIkMnkkMTIkcVVUUUJFY0p1TVJBelA2WWJPUHBiZThxMzBsQTFKN3VVUjJZMElFQU1Ianc4eVZXcmx5NEsiO3M6MTA6ImNyZWF0ZWRfYXQiO3M6MTk6IjIwMjQtMDQtMTUgMTE6MzU6MzMiO3M6MTA6InVwZGF0ZWRfYXQiO3M6MTk6IjIwMjQtMDQtMjUgMDM6NDk6MjQiO31zOjExOiIAKgBvcmlnaW5hbCI7YTo2OntzOjI6ImlkIjtpOjE7czo0OiJuYW1lIjtzOjY6Ikpvc2VwaCI7czo1OiJlbWFpbCI7czoyMzoiam9zZXBobWlzbGFuZ0BnbWFpbC5jb20iO3M6ODoicGFzc3dvcmQiO3M6NjA6IiQyeSQxMiRxVVRRQkVjSnVNUkF6UDZZYk9QcGJlOHEzMGxBMUo3dVVSMlkwSUVBTUhqdzh5VldybHk0SyI7czoxMDoiY3JlYXRlZF9hdCI7czoxOToiMjAyNC0wNC0xNSAxMTozNTozMyI7czoxMDoidXBkYXRlZF9hdCI7czoxOToiMjAyNC0wNC0yNSAwMzo0OToyNCI7fXM6MTA6IgAqAGNoYW5nZXMiO2E6MDp7fXM6ODoiACoAY2FzdHMiO2E6MDp7fXM6MTc6IgAqAGNsYXNzQ2FzdENhY2hlIjthOjA6e31zOjIxOiIAKgBhdHRyaWJ1dGVDYXN0Q2FjaGUiO2E6MDp7fXM6MTM6IgAqAGRhdGVGb3JtYXQiO047czoxMDoiACoAYXBwZW5kcyI7YTowOnt9czoxOToiACoAZGlzcGF0Y2hlc0V2ZW50cyI7YTowOnt9czoxNDoiACoAb2JzZXJ2YWJsZXMiO2E6MDp7fXM6MTI6IgAqAHJlbGF0aW9ucyI7YTowOnt9czoxMDoiACoAdG91Y2hlcyI7YTowOnt9czoxMDoidGltZXN0YW1wcyI7YjoxO3M6MTM6InVzZXNVbmlxdWVJZHMiO2I6MDtzOjk6IgAqAGhpZGRlbiI7YTowOnt9czoxMDoiACoAdmlzaWJsZSI7YTowOnt9czoxMToiACoAZmlsbGFibGUiO2E6MDp7fXM6MTA6IgAqAGd1YXJkZWQiO2E6MTp7aTowO3M6MToiKiI7fXM6MTk6IgAqAGF1dGhQYXNzd29yZE5hbWUiO3M6ODoicGFzc3dvcmQiO3M6MjA6IgAqAHJlbWVtYmVyVG9rZW5OYW1lIjtzOjE0OiJyZW1lbWJlcl90b2tlbiI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjY7czo1NToibG9naW5fZW1wbG95ZWVfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo3O30=', 1715609759);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `is_supervisor` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `address`, `contact_number`, `user_type`, `department_id`, `is_supervisor`) VALUES
(5, 'TJM_00001', 'Erjian Soriano', 'iansoriano05@gmail.com', NULL, '$2y$12$fXbCBwbQddxgD8R763NfluJGF6fP5LPZ234e0/YvrFPrR11V2JeWe', NULL, '2024-05-13 02:19:50', '2024-05-13 02:19:50', 'Urbiz', '0927428236', 'Employee', 1, 0),
(6, '', 'Mildred Arenas', 'mildred@gmail.com', NULL, '$2y$12$FvK6DDxGw7TNlTZQsDqQDuLmRaSetykDxFpqh7wW/eyC/NSiySL2K', NULL, '2024-05-13 02:31:18', '2024-05-13 02:31:18', 'Urbiz', '09254643456', 'Customer', NULL, 0),
(7, 'TJM_00002', 'Cherry Rose Coralles', 'cherryrose@gmail.com', NULL, '$2y$12$wy7c7EadpoA2h3nYTZB2WeQ/APJ5hIJfnV04NGNUwd4B.ynQp/Uc2', NULL, '2024-05-13 03:20:49', '2024-05-13 03:20:49', 'Mabini St., Poblacion Urbiztondo, Pangasinan Philippines', '09053310265', 'Employee', 2, 0),
(8, 'TJM_00003', 'Floyd De Vera', 'floyddevera@gmail.com', NULL, '$2y$12$erbWq1FfqNXhYerOA6DQC.qis2/TMIo92VPPTQTtBlpYTfrNKTSIO', NULL, '2024-05-13 03:43:48', '2024-05-13 03:43:48', 'Binmaley', '09443483473', 'Employee', 1, 1),
(9, 'TJM_00004', 'Deither Ramos', 'deitherramos@gmail.com', NULL, '$2y$12$5eh5dLrSBMlTzw9VXag4euXXpjaR8Mg/tY.3xL.C30AlYa6vkKmcG', NULL, '2024-05-13 04:30:41', '2024-05-13 04:30:41', 'San Carlos', '09343354568', 'Employee', 4, 0),
(10, 'TJM_00005', 'Christopher Cadiao', 'chriscadiao@gmail.com', NULL, '$2y$12$RslEIRZzPeAB/1.5kcH5A.kSAW5X3yGm/WwUxKVSk5LckxGmmh4Zm', NULL, '2024-05-13 04:36:41', '2024-05-13 04:36:41', 'San Carlos', '09883343478', 'Employee', 5, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id_foreign` (`product_id`);

--
-- Indexes for table `attribute_options`
--
ALTER TABLE `attribute_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attribute_options_attributes_id_foreign` (`attributes_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gallery_product_id_foreign` (`product_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lineups`
--
ALTER TABLE `lineups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lineups_order_id_foreign` (`order_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_production_details_foreign` (`production_details_id`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order_attributes_options`
--
ALTER TABLE `order_attributes_options`
  ADD PRIMARY KEY (`attributes_option_id`),
  ADD KEY `order_options_order_id_foreign` (`order_id`),
  ADD KEY `order_options_options_id_foreign` (`option_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `production_details`
--
ALTER TABLE `production_details`
  ADD PRIMARY KEY (`production_details_id`),
  ADD KEY `production_details_printer_id_foreign` (`printer_id`) USING BTREE;

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_options`
--
ALTER TABLE `products_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attributes_id_foreign` (`attributes_id`);

--
-- Indexes for table `products_options_join`
--
ALTER TABLE `products_options_join`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_options_join_product_id_foreign` (`products_id`),
  ADD KEY `products_options_join_option_id_foreign` (`product_option_id`);

--
-- Indexes for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_attributes_attributes_id_foreign` (`attributes_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `attribute_options`
--
ALTER TABLE `attribute_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `lineups`
--
ALTER TABLE `lineups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `order_attributes_options`
--
ALTER TABLE `order_attributes_options`
  MODIFY `attributes_option_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `production_details`
--
ALTER TABLE `production_details`
  MODIFY `production_details_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attribute_options`
--
ALTER TABLE `attribute_options`
  ADD CONSTRAINT `attribute_options_attributes_id_foreign` FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `gallery`
--
ALTER TABLE `gallery`
  ADD CONSTRAINT `gallery_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD CONSTRAINT `product_attributes_attributes_id_foreign` FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
