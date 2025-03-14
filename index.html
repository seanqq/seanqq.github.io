<?php
session_start();
include 'db.php';
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Учет рабочего времени</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .topper {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
            font-size: 24px;
        }
        nav {
            background-color: #444;
            color: #fff;
            padding: 10px;
            text-align: center;
        }
        nav a {
            color: #fff;
            margin: 0 10px;
            text-decoration: none;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .animated-btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .animated-btn:hover {
            background-color: #45a049;
        }
        .blur-bg {
            backdrop-filter: blur(10px);
        }
        input[type="text"] {
            width: calc(100% - 22px);
            padding: 10px;
            margin: 10px 0;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="topper">Система учета рабочего времени</div>
    <nav>
        <a href="index.php">Рабочее время</a> | 
        <a href="vacations.php">Отпуска</a> | 
        <a href="schedules.php">Графики</a> | 
        <?php if ($_SESSION['role'] === 'admin'): ?>
            <a href="admin.php">Админка</a> | 
        <?php endif; ?>
        <a href="logout.php">Выход</a>
    </nav>
    
    <div class="container blur-bg">
        <?php if ($_SESSION['role'] === 'admin'): ?>
        <h2>Добавить сотрудника</h2>
        <form method="POST" action="process.php" class="admin-form">
            <input type="text" name="employee_name" placeholder="Имя сотрудника" required>
            <button type="submit" name="action" value="add_employee" class="animated-btn">Добавить</button>
        </form>
        <?php endif; ?>

        <h2>Рабочее время (сегодня)</h2>
        <table>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Чек-ин</th>
                    <th>Чек-аут</th>
                    <th>Отработано</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $query = "SELECT e.id, e.name, t.check_in, t.check_out 
                          FROM employees e 
                          LEFT JOIN time_logs t ON e.id = t.employee_id 
                          AND DATE(t.check_in) = CURDATE()";
                if ($_SESSION['role'] === 'employee') {
                    $query .= " WHERE e.id = ?";
                    $stmt = $pdo->prepare($query);
                    $stmt->execute([$_SESSION['employee_id']]);
                } else {
                    $stmt = $pdo->query($query);
                }
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    echo "<tr>";
                    echo "<td>{$row['name']}</td>";
                    echo "<td>" . ($row['check_in'] ? $row['check_in'] : '-') . "</td>";
                    echo "<td>" . ($row['check_out'] ? $row['check_out'] : '-') . "</td>";
                    $hours = $row['check_in'] && $row['check_out'] ? 
                        round((strtotime($row['check_out']) - strtotime($row['check_in'])) / 3600, 1) : '-';
                    echo "<td>{$hours}</td>";
                    echo "<td>";
                    if (!$row['check_in']) {
                        echo "<button onclick=\"checkIn({$row['id']})\" class=\"animated-btn\">Чек-ин</button>";
                    } elseif (!$row['check_out']) {
                        echo "<button onclick=\"checkOut({$row['id']})\" class=\"animated-btn\">Чек-аут</button>";
                    } else {
                        echo "Завершено";
                    }
                    echo "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
    <script src="script.js"></script>
</body>
</html>
